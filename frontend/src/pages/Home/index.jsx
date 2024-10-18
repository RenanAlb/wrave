import { Container, Loading, Main } from "./styles";
import { useState, useEffect } from "react";
import { dadosUser } from "../../utils/users";
import Menu from "../../components/Menu";
import Content from "../../components/Content";
import { useNavigate, useParams } from 'react-router-dom';

const Home = () => {
  const [ renderPage, setRenderPage ] = useState(false);
  const [ loading, setLoading ] = useState(false);
  const [ user, setUser ] = useState({});
  const [ width, setWidth ] = useState(window.innerWidth);

  const { nomeUser } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const verificarLogin = async () => {
      setLoading(true);
      const response = await dadosUser();

      if (response.ok) {
        if (nomeUser === response.response.nome) {
          setLoading(false);
          setUser({
            nome: response.response.nome,
            email: response.response.email,
            id: response.response.id
          });
          setRenderPage(true);
        } else {
          setLoading(false);
          setRenderPage(false);
          navigate('/cadastro');
        }
      } else {
        console.error('Erro ao buscar os dados do usuário');
        setLoading(false);
        setRenderPage(false);
        navigate('/cadastro');
      }
    };

    verificarLogin();
  }, []);

  useEffect(() => {
    const getWidth = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener('resize', getWidth);
    window.addEventListener('load', getWidth);

    return () => {
      window.removeEventListener('resize', getWidth);
      window.removeEventListener('load', getWidth);
    }
  }, []);

  console.log(user)

  return (
    <Container>
      {
        loading ?
        (
          <Loading>
            <l-ring
              size="40"
              stroke="5"
              bg-opacity="0"
              speed="2"
              color="black"
            ></l-ring>
            <p>Carregando...</p>
          </Loading>
        )
        :
        (
          renderPage &&
          (
            <Main>

              <div className="flex">
                <Menu user={user}/>
                {
                  width <= 570 ?
                  (null)
                  :
                  (<Content user={{}} title={''}/>)
                }
              </div>
            </Main>
          )
        )
      }
    </Container>
  );
};

export default Home;