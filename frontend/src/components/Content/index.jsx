import { ContainerContent } from "./styles";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { checkTarefa, createTarefa, deleteAllTarefas, deleteTarefa, getTarefas, updateAllTarefas } from "../../utils/tarefas";
import { transformDataContainer, transformDataTarefa } from "../../utils/functions";
import { dadosUser, getStatusTarefas, logoutApp } from '../../utils/users';
import { excluirContainerById } from "../../utils/containers_tarefas";

const Options = ({ containerId, tarefas, user, onSetRefresh, onSetOptions }) => {
  const [ message, setMessage ] = useState(false);
  const navigate = useNavigate();

  const excluirContainer = async () => {
    const response = await excluirContainerById(containerId);

    if (response.ok) {
      console.log(response);
      navigate(`/${user.nome}`);
    }
  };

  const excluirTodasTarefas = async () => {
    const response = await deleteAllTarefas(user.id, containerId);

    if (response.ok) {
      console.log('a', response);
      onSetRefresh(true);
      onSetOptions(false);
    }
  };

  const updateTodasTarefas = async () => {
    const response = await updateAllTarefas(user.id, containerId);

    if (response.ok) {
      console.log('a', response);
      onSetRefresh(true);
      onSetOptions(false);
    }
  };

  return (
    <div className="container-options">
      {
        message &&
        (
          <div className="message">
            <p>Tem certeza que deseja excluir o container?</p>
            <div className="buttons">
              <button onClick={excluirContainer}>Sim</button>
              <button onClick={() => {
                onSetRefresh(false);
                onSetOptions(false);
                setMessage(false);
              }}>Não</button>
            </div>
          </div>
        )
      }
      <button onClick={() => setMessage(true)}>Excluir container</button>
      <button onClick={excluirTodasTarefas}>Deletar todas as tarefas</button>
      <button onClick={updateTodasTarefas}>Concluir todas as tarefas</button>
    </div>
  );
};

const Content = ({ user, title, dataContainer }) => {
  const [ options, setOptions ] = useState(false);
  const [ novaTarefa, setNovaTarefa ] = useState('');
  const [ tarefas, setTarefas ] = useState([]);
  const [ dadosUserGET, setDadosUserGET ] = useState({});
  const [ status, setStatus ] = useState([]);
  const [ refresh, setRefresh ] = useState(false);

  const { containerId, nomeUser } = useParams();
  const navigate = useNavigate();

  // Buscar tarefas
  const getTarefasUser = async (containerId, userId) => {
    const response = await getTarefas(containerId, userId);
    if (response.ok) {
      console.log(response)
      setTarefas(response.response);
    }
  };

  // Click nova tarefa
  const handleClickNewTarefa = async (e) => {
    if (e.key === 'Enter') {
      if (novaTarefa === '') {
        return;
      }

      if (containerId && novaTarefa !== '' && user.id) {
        const response = await createTarefa(containerId, user.id, novaTarefa);

        if (response.ok) {
          getTarefasUser(containerId, user.id);
          setNovaTarefa('');
          // setTarefas(response.response);
        }
      }

    } else {
      return;
    }
  };

  // Buscar tarefa se existir as variáveis
  useEffect(() => {
    if (containerId && user.id) {
      getTarefasUser(containerId, user.id);
    }
  }, [containerId, user.id]);

  // Deletar tarefa
  const deleteTarefaUser = async (tarefa) => {
    console.log(tarefa)
    try {
      const response = await deleteTarefa(tarefa._id);

      if (response.ok) {
        console.log('ok', response)
        getTarefasUser(containerId, user.id);
      }
    } catch(error) {
      console.error(error);
    }
  };

  // Concluir tarefa do usuário
  const checkTarefaUser = async (tarefa) => {
    try {
      const response = await checkTarefa(tarefa._id);

      if (response.ok) {
        getTarefasUser(containerId, user.id);
      }
    } catch(error) {
      console.error(error);
    }
  };

  // Buscar dados do usuário
  const getDadosUser = async () => {
    const response = await dadosUser();

    if (response.ok) {
      setDadosUserGET(response.response);
    }
  };

  useEffect(() => {
    if (Object.keys(user).length === 0) {
      getDadosUser();
    }
  }, [user]);

  // Buscar status dos containers e tarefas
  const getStatus = async (dadosUserGET) => {
    const response = await getStatusTarefas(dadosUserGET);

    if (response.ok) {
      setStatus(response.response);
    }
  };

  useEffect(() => {
    if (dadosUserGET.id) {
      getStatus(dadosUserGET);
    }
  }, [dadosUserGET]);

  // Sair da conta
  const logout = async () => {
    const response = await logoutApp();

    if (response.ok) {
      navigate('/cadastro');
    } else {
      console.error(response);
    }
  };

  useEffect(() => {
    if (containerId && user.id) {
      setRefresh(false);
      getTarefasUser(containerId, user.id);
    }
  }, [refresh]);

  return (
    <ContainerContent>
      {
        user.id ?
        (
          <div className="content">
            <div className="header-content">
              {
                options &&
                (<Options containerId={containerId} tarefas={tarefas} user={user} onSetRefresh={setRefresh} onSetOptions={setOptions} />)
              }
              <div className="top">
                <h1>{title}</h1>
                <p>{transformDataContainer(dataContainer)}</p>
              </div>
              <span className="material-symbols-outlined" onClick={() => setOptions(!options)}>
                more_horiz
              </span>
            </div>
            <div className="tarefas">
              {
                tarefas.length > 0 && containerId == tarefas[0].idContainerTarefas ?
                (
                  tarefas.map((tarefa, index) => (
                    <div className="content-tarefa" key={index}>
                      <div className="header-tarefa">
                        <p className="content" style={{ textDecoration: tarefa.conclusaoTarefas ? 'line-through' : '' }}>{tarefa.descricaoTarefas}</p>
                        <p className="data">{transformDataTarefa(tarefa.dataTarefas)}</p>
                      </div>
                      <div className="actions">
                        <span title="Concluir tarefa" style={{ backgroundColor: tarefa.conclusaoTarefas ? 'green' : 'gray' }} onClick={() => checkTarefaUser(tarefa)} className="material-symbols-outlined" id="check">
                          check
                        </span>
                        <span title="Deletar tarefa" onClick={() => deleteTarefaUser(tarefa)} className="material-symbols-outlined" id="delete">
                          delete
                        </span>
                      </div>
                    </div>
                  ))
                )
                :
                (
                  <p>Lista vazia...</p>
                )
              }
            </div>
            <div className="create-tarefa">
              <input type="text" placeholder="Nova tarefa..." value={novaTarefa} onKeyDown={handleClickNewTarefa} onChange={(e) => setNovaTarefa(e.target.value)} />
            </div>
          </div>
        )
        :
        (
          <div className="apresentation-wrave" style={{  overflowY: 'scroll' }}>
            <div className="info-user">
              <strong>{nomeUser}</strong>
              <button onClick={logout}>Sair da conta</button>
            </div>
            <p>Visão geral</p>
            <div className="status">
              <div className="status-tarefa">
                {
                  status.length > 0 ?
                  (
                    status.map((statusNow, index) => (
                      <div className="container" key={index}>
                        <h3>{statusNow.container.nomeContainer}</h3>
                        <div className="container-status-tarefa">
                          <section className="tarefas-concluida">
                            <h4>Tarefas concluídas: {statusNow.tarefas.filter((e) => e.conclusaoTarefas === true).length}</h4>
                          </section>
                          <section className="tarefas-pendente">
                            <h4>Tarefas pendentes: {statusNow.tarefas.filter((e) => e.conclusaoTarefas === false).length}</h4>
                          </section>
                          <section className="tarefas-total">
                            <h4>Total de tarefas: {statusNow.tarefas.length}</h4>
                          </section>
                          <button className="ver-mais" onClick={() => navigate(`/${nomeUser}/${statusNow.container._id}`)}>Ver mais</button>
                        </div>
                      </div>
                    ))
                  )
                  :
                  (null)
                }
              </div>
            </div>
          </div>
        )
      }
    </ContainerContent>
  );
};

Content.propTypes = {
  user: PropTypes.object,
  title: PropTypes.string,
  dataContainer: PropTypes.string
};

export default Content;