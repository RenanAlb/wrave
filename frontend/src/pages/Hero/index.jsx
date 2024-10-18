import { Container, Loading, Main } from "./styles";
import { useState, useEffect } from "react";
import { dadosUser } from "../../utils/users";
import Menu from "../../components/Menu";
import Content from "../../components/Content";
import { useNavigate, useParams } from 'react-router-dom';
import { getContainer } from "../../utils/containers_tarefas";

const Hero = () => {
  const [ renderPage, setRenderPage ] = useState(false);
  const [ loading, setLoading ] = useState(false);
  const [ user, setUser ] = useState({});
  const [ container, setContainer ] = useState({});
  const [ refreshLength, setRefreshLenght ] = useState(false);

  const navigate = useNavigate();
  // Get dados na URL
  const { containerId, nomeUser } = useParams();

  useEffect(() => {
    const verificarLogin = async () => {
      setLoading(true);
      const response = await dadosUser();

      if (response.ok) {
        if (nomeUser === response.response.nome) {
          console.log(response.response)
          setLoading(false);
          setUser({
            nome: response.response.nome,
            email: response.response.email,
            id: response.response.id
          });
        }
        setRenderPage(true);
      } else {
        console.error('Erro ao buscar os dados do usuário');
        setLoading(false);
        setRenderPage(false);
      }
    };

    verificarLogin();
  }, []);

  useEffect(() => {
    const getContainerUser = async (containerId) => {
      setLoading(true);
      const response = await getContainer(containerId);

      if (response.ok) {
        console.log('ass', response);
        setLoading(false);
        setContainer(response.response);
        setRenderPage(true);
      } else {
        console.log(response)
        navigate(`/${nomeUser}`);
        setRenderPage(false);
      }
    };

    if (containerId) {
      getContainerUser(containerId);
    }
  }, [containerId]);

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
                <Menu user={user} onSetRefreshLength={setRefreshLenght} />
                <Content user={user} title={container.nomeContainer} dataContainer={container.dataContainer}/>
              </div>
            </Main>
          )
        )
      }
    </Container>
  );
};

export default Hero;