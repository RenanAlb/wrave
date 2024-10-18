import { ContainerCreate } from "./styles";
import { useEffect, useRef, useState } from "react";
import { createContainer } from "../../utils/containers_tarefas";
import { dadosUser } from '../../utils/users';
import PropTypes from "prop-types";

const CreateNewTask = ({ onSetCriouContainer }) => {
  const [ container, setContainer ] = useState('');
  const [ user, setUser ] = useState({});
  const inputRef = useRef(null);

  useEffect(() => {
    const getDadosUser = async () => {
      const response = await dadosUser();

      if (response.ok) {
        console.log(response.response)
        setUser(response.response);
      }
    }

    getDadosUser();

    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);


  const handleOnKeyDown = async (e) => {
    if (e.key === 'Enter') {
      if (container !== '' && user.id) {
        const response = await createContainer(container, user.id);

        if (response.ok) {
          console.log(response);
          setContainer('');
          onSetCriouContainer(true);
        }
      } else {
        console.error('Erro');
      }
    } else {
      return;
    }
  };

  return (
    <ContainerCreate>
      <input ref={inputRef} type="text" value={container} placeholder="Digite o título para as tarefas" onChange={(e) => setContainer(e.target.value)} onKeyDown={handleOnKeyDown}/>
    </ContainerCreate>
  )
};

CreateNewTask.propTypes = {
  onSetCriouContainer: PropTypes.func
};

export default CreateNewTask;