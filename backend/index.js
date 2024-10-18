const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const bcriptjs = require('bcryptjs');
const cookieParser = require('cookie-parser');

const connectToDataBase = require('./database/mongodb');

// Models
const Users = require('./models/users');
const Containers = require('./models/container_tarefas');
const Tarefas = require('./models/tarefas');

// Configuração dotenv
dotenv.config();

// Cofiguração do servidor
const app = express();
const port = process.env.PORT || 8080;

// Connect MongoDB
connectToDataBase();

// Middlewares
app.use(express.json());
app.use(cors({
  origin: 'https://wrave.onrender.com',
  credentials: true
}));
app.use(cookieParser());

const verificarToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(200).json({ message: 'Token não fornecido', ok: false });
  }

  jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
    if (error) {
      return res.status(401).json({ message: 'Token inválido!', ok: false });
    }

    // Salvar informações
    req.user = decoded;
    next();
  });
};

// Rotas

// Cadastro
app.post('/cadastro', async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    const verificarUser = await Users.findOne({ email });

    if (verificarUser) {
      return res.status(200).json({ message: 'Usuário já existente', ok: false });
    }

    // Senha user
    const hash = await bcriptjs.hash(senha, 13);

    const addNewUser = await Users.create({ nome, email, senha: hash });

    const token = jwt.sign({ id: addNewUser._id, nome: addNewUser.nome, email: addNewUser.email }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.cookie('token', token, { httpOnly: true, secure: false, sameSite: 'strict', maxAge: 7 * 24 * 60 * 60 * 1000 });

    res.status(200).json({ message: 'Usuário cadastrado com sucesso!', ok: true, response: addNewUser });
  } catch(error) {
    console.error(error);
    res.status(500).json({ message: error, ok: false });
  }
});

app.post('/login', async (req, res) => {
  try {
    const { email, senha } = req.body;

    const verificarUser = await Users.findOne({ email });

    if (!verificarUser) {
      return res.status(200).json({ message: 'Usuário não encontrado', ok: false });
    }

    // Validar senha
    const validarSenha = await bcriptjs.compare(senha, verificarUser.senha);

    if (!validarSenha) {
      return res.status(500).json({ message: 'Senha incorreta', ok: false });
    }

    const token = jwt.sign({ id: verificarUser._id, nome: verificarUser.nome, email: verificarUser.email }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.cookie('token', token, { httpOnly: true, secure: false, sameSite: 'strict', maxAge: 7 * 24 * 60 * 60 * 1000 });

    res.status(200).json({ message: 'Usuário cadastrado com sucesso!', ok: true, response: verificarUser });
  } catch(error) {
    console.error(error);
    res.status(500).json({ message: error, ok: false });
  }
});

// Dados do usuário
app.get('/dados', verificarToken, (req, res) => {
  if (req.user) {
    res.status(200).json({ message: 'Dados obtidos!', ok: true, response: req.user });
  } else {
    res.status(500).json({ message: 'Erro ao buscar os dados', ok: false });
  }
});

// Criar novo container
app.post('/criar-novo-container', async (req, res) => {
  try {
    const { nomeContainer, idUserContainer } = req.body;
    const createContainer = await Containers.create({ nomeContainer, idUserContainer });
    res.status(201).json({ message: 'Container criado com sucesso!', ok: true, response: createContainer });
  } catch(error) {
    console.error(error);
    res.status(500).json({ message: error, ok: false });
  }
});

// Get containers user by id
app.get('/get-containers/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const containers = await Containers.find({ idUserContainer: id });
    res.status(200).json({ message: 'Containers buscados com sucesso!', ok: true, response: containers });
  } catch(error) {
    console.error(error);
    res.status(500).json({ message: error, ok: false });
  }
});

// Get container by id container
app.get('/get-container/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const container = await Containers.findOne({ _id: id });

    if (!container) {
      return res.status(200).json({ message: 'Container não encontrado', ok: false });
    }
    res.status(200).json({ message: 'Container buscado com sucesso!', ok: true, response: container });
  } catch(error) {
    console.error(error);
    res.status(500).json({ message: error, ok: false });
  }
});

app.post('/criar-tarefa', async (req, res) => {
  try {
    const { idContainerTarefas, idUserTarefas, descricaoTarefas } = req.body;

    const createTarefa = await Tarefas.create({ idContainerTarefas, idUserTarefas, descricaoTarefas });

    res.status(200).json({ message: 'Tarefa adicionada com sucesso!', ok: true, response: createTarefa });
  } catch(error) {
    console.error(error);
    res.status(500).json({ message: error, ok: false });
  }
});

app.get('/get-tarefas-user/:idContainerTarefas/:idUserTarefas', async (req, res) => {
  try {
    const { idContainerTarefas, idUserTarefas } = req.params;

    const getTarefas = await Tarefas.find({ idContainerTarefas, idUserTarefas });

    if (getTarefas.length == 0) {
      return res.status(200).json({ message: 'Nenhuma tarefa encontrada', ok: true, response: [] });
    }

    res.status(200).json({ message: 'Tarefas buscadas com sucesso', ok: true, response: getTarefas });
  } catch(error) {
    console.error(error);
    res.status(500).json({ message: error, ok: false });
  }
});

app.delete('/delete-tarefa/:idUserTarefas', async (req, res) => {
  try {
    const { idUserTarefas } = req.params;

    const findTarefa = await Tarefas.findOne({ _id: idUserTarefas });

    if (findTarefa) {
      await Tarefas.deleteOne({ _id: idUserTarefas });
    } else {
      return res.status(500).json({ message: 'Não foi encontrada a tarefa', ok: false });
    }

    res.status(200).json({ message: 'Tarefa deletada com sucesso', ok: true });
  } catch(error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao deletar a tarefa', ok: false });
  }
});

app.put('/check-tarefa/:idUserTarefas', async (req, res) => {
  try {
    const { idUserTarefas } = req.params;


    const findTarefa = await Tarefas.findOne({ _id: idUserTarefas });

    if (!findTarefa) {
      return res.status(404).json({ message: 'Tarefa não encontrada', ok: false });
    }

    const newStatus = !findTarefa.conclusaoTarefas;

    const checkTarefa = await Tarefas.findByIdAndUpdate(
      idUserTarefas,
      { $set: { conclusaoTarefas: newStatus } },
      { new: true }
    );

    res.status(200).json({ message: 'Tarefa atualizada com sucesso', ok: true, response: checkTarefa });
  } catch(error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao checar a tarefa', ok: false });
  }
});

app.post('/get-status-tarefas', async (req, res) => {
  try {
    const { user } = req.body;

    const getContainers = await Containers.find({ idUserContainer: user });

    if (getContainers.length === 0) {
      return res.status(200).json({ message: 'Nenhum container encontrado', ok: false });
    }

    const getTarefas = await Tarefas.find({ idUserTarefas: user });

    if (getTarefas.length === 0) {
      return res.status(200).json({ message: 'Nenhuma tarefa encontrada', ok: false });
    }

    const status = [];

    for (let i = 0; i < getContainers.length; i++) {
      for (let o = 0; o < getTarefas.length; o++) {
        const filter = getTarefas.filter((e) => e.idContainerTarefas.toString() == getContainers[i]._id.toString());
        if (filter.length > 0) {
          status.push({
            container: getContainers[i],
            tarefas: filter
          });
          break;
        }
      }
    }

    res.status(200).json({ message: 'Containers e tarefas buscadas com sucesso!', ok: true, response: status });
  } catch(error) {
    res.status(500).json({ message: 'Erro ao buscar os containers e as tarefas', ok: false });
    console.log(error);
  }
});

app.post('/logout', async (req, res) => {
  res.clearCookie('token');
  res.status(200).json({ message: 'Logout feito com sucesso', ok: true, response: req.cookies });
});

app.delete('/delete-container/:containerId', async (req, res) => {
  try {
    const { containerId } = req.params;

    const verificarContainer = await Containers.findOne({ _id: containerId });

    if (verificarContainer) {
      await Containers.deleteOne({ _id: containerId });
    } else {
      return res.status(500).json({ message: 'Container não encontrado', ok: false });
    }

    res.status(200).json({ message: 'Container excluído com sucesso!', ok: true });
  } catch(error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao excluir o container', ok: false });
  }
});

app.delete('/delete-all-tarefas/:idUserTarefas/:idContainerTarefas', async (req, res) => {
  try {
    const { idUserTarefas, idContainerTarefas } = req.params;

    const verificarTarefa = await Tarefas.find({ idUserTarefas, idContainerTarefas });

    if (verificarTarefa) {
      await Tarefas.deleteMany({ idUserTarefas, idContainerTarefas });
    } else {
      return res.status(500).json({ message: 'Tarefas não encontradas', ok: false });
    }

    res.status(200).json({ message: 'Tarefa excluída com sucesso!', ok: true });
  } catch(error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao excluir a tarefa', ok: false });
  }
});

app.put('/update-all-tarefas/:idUserTarefas/:idContainerTarefas', async (req, res) => {
  try {
    const { idUserTarefas, idContainerTarefas } = req.params;

    const verificarTarefa = await Tarefas.find({ idUserTarefas, idContainerTarefas });



    if (verificarTarefa) {
      await Tarefas.updateMany(
        { idUserTarefas: idUserTarefas, idContainerTarefas: idContainerTarefas },
        { $set: { conclusaoTarefas: true } },
        { new: true }
      );
    } else {
      return res.status(500).json({ message: 'Tarefas não encontradas', ok: false });
    }
    res.status(200).json({ message: 'Tarefas concluídas com sucesso!', ok: true });
  } catch(error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao concluir as tarefas', ok: false });
  }
});

// Retornar página html
app.use(express.static(path.join(__dirname, '../frontend/dist')));
app.get('*', (req, res) => {
  const filePath = path.join(__dirname, '../frontend/dist');
  res.sendFile(path.join(filePath, 'index.html'));
});


// Iniciar servidor
app.listen(port, () => console.log('Servior ativo em: http://localhost:' + port));