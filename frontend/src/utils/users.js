// Users

export const cadastro = async (nome, email, senha) => {
  try {
    const response = await fetch('https://wrave.onrender.com/cadastro', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, email, senha }),
      credentials: 'include'
    });

    if (!response.ok) {
      throw new Error('Erro ao cadastrar!');
    }

    const responseJSON = await response.json();
    return responseJSON;
  } catch(error) {
    console.error(error);
    return;
  }
};

export const login = async (email, senha) => {
  try {
    const response = await fetch('https://wrave.onrender.com/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, senha }),
      credentials: 'include'
    });

    if (!response.ok) {
      throw new Error('Erro ao fazer o login!');
    }

    const responseJSON = await response.json();
    return responseJSON;
  } catch(error) {
    console.error(error);
    return;
  }
}

// GET dados user
export const dadosUser = async () => {
  try {
    const response = await fetch('https://wrave.onrender.com/dados', {
      method: 'GET',
      credentials: 'include'
    });

    if (!response.ok) {
      throw new Error('Erro ao fazer a requisição dos dados')
    }

    const responseJSON = await response.json();
    return responseJSON;
  } catch(error) {
    console.error(error);
    return;
  }
};

export const getStatusTarefas = async (user) => {
   try {
    const response = await fetch('https://wrave.onrender.com/get-status-tarefas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user: user.id })
    });

    if (!response.ok) {
      throw new Error('Erro ao fazer a requisição dos dados')
    }

    const responseJSON = await response.json();
    return responseJSON;
  } catch(error) {
    console.error(error);
    return [];
  }
};

export const logoutApp = async () => {
  try {
    const response = await fetch('https://wrave.onrender.com/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });

    if (!response.ok) {
      throw new Error('Erro ao fazer o logout');
    }

    const responseJSON = await response.json();
    return responseJSON;
  } catch(error) {
    console.error(error);
    return null;
  }
};