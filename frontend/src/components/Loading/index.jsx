import { LoadingContainer } from "./styles";

const Loading = () => {
  return (
    <LoadingContainer>
      <l-ring
        size="40"
        stroke="5"
        bg-opacity="0"
        speed="2"
        color="black"
      ></l-ring>
      <p>Carregando...</p>
    </LoadingContainer>
  );
};

export default Loading;