import { Container, Form } from "./styles";
import { useState, useEffect } from "react";
import { login } from "../../utils/users";
import Popup from "../../components/Popup";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";

const Login = () => {
  const [ email, setEmail ] = useState('');
  const [ senha, setSenha ] = useState('');
  const [ loading, setLoading ] = useState(false);

  // Mensagem de noificação
  const [ mensagem, setMensagem ] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !senha) {
      setMensagem(true);
      return;
    }

    setLoading(true);
    const response = await login(email, senha);

    if (response) {
      if (response.ok) {
        setLoading(false);
        navigate(`/${response.response.nome}`);
      } else {
        console.error('Erro ao fazer login! Verifique o email e senha');
        alert('Erro ao fazer login! Verifique o email e senha')
        setLoading(false);
      }
    }
  };

  // Janela Popup
  useEffect(() => {
    if (mensagem == true) {
      setTimeout(() => {
        setMensagem(false);
      }, 4000);
    }
  }, [mensagem]);

  return (
    <Container>
      {
        mensagem ? (<Popup/>) : null
      }
      {
        loading &&
        (<Loading/>)
      }
      <Form onSubmit={handleSubmit}>
        <h1>Wrave</h1>
        <h3>Bem-vindo de volta</h3>
        <input type="email" placeholder="Email..." value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Senha..." value={senha} onChange={(e) => setSenha(e.target.value)} />
        <button type="submit">Confimar</button>
        <p>Não tem uma conta? <Link to="/cadastro">Fazer cadastro</Link></p>
      </Form>
    </Container>
  );
};

export default Login;