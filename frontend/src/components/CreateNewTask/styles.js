import styled from 'styled-components';
import { Themes } from '../../Themes';

export const ContainerCreate = styled.div`
  animation: layout 0.2s ease-in-out;

  input {
    background-color: ${Themes.color_platinum};
    width: calc(100%);
    padding: 20px 22px 20px 20px;
    border: none;
    border-bottom: 1px solid #d0d0d0;
    outline: none;
    margin-left: -20px;
  }

  @keyframes layout {
    0% {
      opacity: 0;
      transform: translateY(-100px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media screen and (max-width: 570px) {
    width: 100%;

    input {
      width: calc(100% - 40px);
      padding: 20px 22px 20px 20px;
      margin: 0;
    }
  }
`;