import { useEffect, useState } from "react";
import { MenuContainer } from "./styles";
import CreateNewTask from "../CreateNewTask";
import { getContainers } from "../../utils/containers_tarefas";
import { dadosUser, logoutApp } from "../../utils/users";
import { Link,useNavigate } from "react-router-dom";
import { getTarefas } from "../../utils/tarefas";
import PropTypes from "prop-types";

const Menu = () => {
  // State criar tarefa
  const [create, setCreate] = useState(false);
  const handleClickButton = () => setCreate(!create);
  const [containers, setContainers] = useState([]);
  const [criouContainer, setCriouContainer] = useState(false);
  const [user, setUser] = useState({});
  const [tarefasCount, setTarefasCount] = useState({});
  const [width, setWidth] = useState(window.innerWidth);
  const navigate = useNavigate();

  // Buscar containers e dados do usuário
  const getDadosUser = async () => {
    const response = await dadosUser();
    if (response.ok) {
      setUser(response.response);
      getContainersUser(response.response.id);
    }
  };

  const getContainersUser = async (id) => {
    const response = await getContainers(id);
    if (response.ok) {
      setContainers(response.response);
    }
  };

  // Buscar número de tarefas por container
  const getTarefasUser = async (containerId, userId) => {
    const response = await getTarefas(containerId, userId);
    if (response.ok) {
      return response.response.length;
    }
    return 0;
  };

  useEffect(() => {
    getDadosUser();
  }, []);

  useEffect(() => {
    if (criouContainer) {
      getDadosUser();
      setCriouContainer(false);
      setCreate(false);
    }
  }, [criouContainer]);

  // Efeito para buscar a quantidade de tarefas por container
  const loadTarefasCount = async () => {
    const counts = {};
    for (const container of containers) {
      const count = await getTarefasUser(container._id, user.id);
      counts[container._id] = count;
    }
    setTarefasCount(counts);
  };

  useEffect(() => {
    if (containers.length > 0) {
      loadTarefasCount();
    }
  }, [containers, user.id]);

  useEffect(() => {
    const getNewWidth = () => {
      setWidth(window.innerWidth);
    }

    window.addEventListener('load', getNewWidth);
    window.addEventListener('resize', getNewWidth);

    return () => {
      window.removeEventListener('load', getNewWidth);
      window.removeEventListener('resize', getNewWidth);
    }
  }, []);

   // Sair da conta
   const logout = async () => {
    const response = await logoutApp();

    if (response.ok) {
      navigate('/cadastro');
    } else {
      console.error(response);
    }
  };

  return (
    <MenuContainer>
      {
        width <= 570 &&
        (
          <div className="conta">
            <strong>{user.nome}</strong>
            <button onClick={logout}>Sair da conta</button>
          </div>
        )
      }

      <button className="new-list" onClick={handleClickButton}>
        {create ? (
          <>
            Fechar <span className="material-symbols-outlined">arrow_downward_alt</span>
          </>
        ) : (
          <>
            <span className="material-symbols-outlined">add</span> Nova Lista
          </>
        )}
      </button>
      {create && <CreateNewTask onSetCriouContainer={setCriouContainer} />}
      <ul>
        {containers.length > 0 && (
          containers.map((container, index) => (
            <li key={index}>
              <Link to={`/${user.nome}/${container._id}`}>
                {container.nomeContainer} <strong>{tarefasCount[container._id] || ''}</strong>
              </Link>
            </li>
          ))
        )}
      </ul>
    </MenuContainer>
  );
};

export default Menu;
