// Funções do container


// Criar categoria
export const createContainer = async (nomeContainer, idUserContainer) => {
  try {
    const response = await fetch('https://wrave.onrender.com/criar-novo-container', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nomeContainer, idUserContainer })
    });

    if (!response.ok) {
      throw new Error('Erro ao criar o novo container');
    }

    const responseJSON = await response.json();
    return responseJSON;
  } catch(error) {
    console.error(error);
    return null;
  }
};

// Buscar containers
export const getContainers = async (id) => {
  try {
    const response = await fetch(`https://wrave.onrender.com/get-containers/${id}`);
    if (!response.ok) {
      throw new Error('Erro ao buscar os containers');
    }

    const responseJSON = await response.json();
    return responseJSON;
  } catch(error) {
    console.error(error);
    return [];
  }
};

// Buscar container
export const getContainer = async (id) => {
  try {
    const response = await fetch(`https://wrave.onrender.com/get-container/${id}`);
    if (!response.ok) {
      throw new Error('Erro ao buscar o container');
    }

    const responseJSON = await response.json();
    return responseJSON;
  } catch(error) {
    console.error(error);
    return [];
  }
};

// Excluir container
export const excluirContainerById = async (containerId) => {
  try {
    const response = await fetch(`https://wrave.onrender.com/delete-container/${containerId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    });

    if (!response.ok) {
      throw new Error('Erro ao buscar excluir o container');
    }

    const responseJSON = await response.json();
    return responseJSON;
  } catch(error) {
    console.error(error);
    return null;
  }
};