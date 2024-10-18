export const transformDataContainer = (date) => {
  const data = new Date(date);

  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };

  const formattedDate = data.toLocaleString('pt-BR', options);

  return formattedDate || '';
};

export const transformDataTarefa = (date) => {
  const data = new Date(date);

  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };

  const formattedDate = data.toLocaleString('pt-BR', options);

  return formattedDate || '';
}