import { Container } from "./styles";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Scene from "../../components/Scene";

const First = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <div className="header">
        <p className="logo">Wrave</p>
        <div className="buttons">
          <button onClick={() => navigate('/login')}>Entrar</button>
          <button onClick={() => navigate('/cadastro')}>Cadastrar</button>
        </div>
      </div>
      <div className="main">
        <Scene/>
        <h1>Organize seus trabalhos, seu dia e projetos conosco</h1>
      </div>
    </Container>
  )
};

export default First;