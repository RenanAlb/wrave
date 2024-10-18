import styled from 'styled-components';
import { Themes } from '../../Themes';

export const PopupContainer = styled.div`
  background-color: ${Themes.color_electro_blue};
  width: 200px;
  position: absolute;
  bottom: 30px;
  right: 30px;
  z-index: 1;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  border-top-left-radius: 10px;
  padding: 20px;
  box-shadow: 0px 0px 20px ${Themes.color_shadow_light};
  transition: all 0.3s;
  animation: layout 0.5s ease-in-out;

  p {
    color: white;
    line-height: 1.5em;
    font-size: 0.9em;
  }

  @keyframes layout {
    0% {
      transform: translateX(500px);
      opacity: 0;
    }
    100% {
      transform: translateX(0);
      opacity: 1;
    }
  }
`;