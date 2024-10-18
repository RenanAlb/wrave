// Tarefas

export const createTarefa = async (idContainerTarefas, idUserTarefas, descricaoTarefas) => {
  try {
    const response = await fetch('https://wrave.onrender.com/criar-tarefa', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idContainerTarefas, idUserTarefas, descricaoTarefas })
    });

    if (!response.ok) {
      throw new Error('Erro ao criar a nova tarefa');
    }

    const responseJSON = await response.json();
    return responseJSON;
  } catch(error) {
    console.error(error);
    return null;
  }
};

export const getTarefas = async (idContainerTarefas, idUserTarefas) => {
  try {
    const response = await fetch(`https://wrave.onrender.com/get-tarefas-user/${idContainerTarefas}/${idUserTarefas}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Erro ao buscar as tarefas');
    }

    const responseJSON = await response.json();
    return responseJSON;
  } catch(error) {
    console.error(error);
    return [];
  }
};

export const deleteTarefa = async (idUserTarefas) => {
  try {
    const response = await fetch(`https://wrave.onrender.com/delete-tarefa/${idUserTarefas}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Erro ao deletar a tarefa');
    }

    const responseJSON = await response.json();
    return responseJSON;
  } catch(error) {
    console.error(error);
    return [];
  }
};

export const checkTarefa = async (idUserTarefas) => {
  try {
    const response = await fetch(`https://wrave.onrender.com/check-tarefa/${idUserTarefas}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Erro ao atualizar a tarefa');
    }

    const responseJSON = await response.json();
    return responseJSON;
  } catch(error) {
    console.error(error);
    return [];
  }
};

export const deleteAllTarefas = async (idUserTarefas, idContainerTarefas) => {
  try {
    const response = await fetch(`https://wrave.onrender.com/delete-all-tarefas/${idUserTarefas}/${idContainerTarefas}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Erro ao deletar as tarefas');
    }

    const responseJSON = await response.json();
    return responseJSON;
  } catch(error) {
    console.error(error);
    return [];
  }
};

export const updateAllTarefas = async (idUserTarefas, idContainerTarefas) => {
  try {
    const response = await fetch(`https://wrave.onrender.com/update-all-tarefas/${idUserTarefas}/${idContainerTarefas}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Erro ao concluir as tarefas');
    }

    const responseJSON = await response.json();
    return responseJSON;
  } catch(error) {
    console.error(error);
    return [];
  }
};