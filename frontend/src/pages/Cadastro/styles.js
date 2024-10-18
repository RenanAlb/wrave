import styled from 'styled-components';
import { Themes } from '../../Themes';

export const Container = styled.div`
  background: linear-gradient(to left top, ${Themes.color_electro_blue_dark}, ${Themes.color_tangerine_tango_light});
  width: 100%;
  height: 100dvh;
  justify-content: center;
  align-items: center;
  display: flex;
`;

export const Form = styled.form`
  background-color: ${Themes.color_white};
  padding: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: absolute;
  left: 50%;
  width: 500px;
  height: 520px;
  border-radius: 4px;
  box-shadow: 0px 5px 7px ${Themes.color_shadow_light};
  transform: translate(-50%);

  h1, h3 {
    font-weight: 200;
    margin-bottom: 10px;
    font-family: ${Themes.font_inter};
  }

  h1 {
    font-size: 2.5em;
    font-weight: 400;
  }

  h3 {
    font-weight: 400;
  }

  input {
    background-color: ${Themes.color_light_white};
    border-radius: 5px;
    margin: 3px 0px ;
    width: calc(100% - 43px);
    height: 70px;
    border: none;
    outline: none;
    padding: 0px 20px;
    font-family: ${Themes.font_inter};
    font-size: 1em;

    &::placeholder {
      font-size: 0.8em;
    }
  }

  button {
    background-color: ${Themes.color_electro_blue};
    width: 100%;
    height: 60px;
    padding: 0px 20px;
    margin-top: 3px;
    border-radius: 5px;
    border: none;
    color: white;
    transition: 0.3s;
    font-size: 0.95em;

    &:hover {
      background-color: ${Themes.color_electro_blue_dark};
      transition: 0.3s;
      cursor: pointer;
    }
  }

  p {
    margin-top: 10px;
    font-size: 0.9em;
  }
  p a {
    text-decoration: none;
    color: ${Themes.color_electro_blue};

    &:hover {
      border-bottom: 1px solid ${Themes.color_electro_blue_dark};
    }
  }

  @media screen and (max-width: 560px) {
    width: calc(100% - 60px);
    height: 100dvh;
    border-radius: 0;
    box-shadow: none;
  }

  @media screen and (max-width: 410px) {
    button {
      font-size: 0.8em;
    }
  }

  @media screen and (max-width: 400px) {
    input {
      height: 55px;
    }
  }
`;