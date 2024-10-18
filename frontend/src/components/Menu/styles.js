import styled from 'styled-components';
import { Themes } from '../../Themes';

export const MenuContainer = styled.div`
  background-color: ${Themes.color_white};
  max-height: 100dvh;
  width: 250px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
  padding: 0 0 24px 0;

  .pesquisa {
    width: 100%;
  }
  .pesquisa input {
    background-color: ${Themes.color_platinum};
    width: 120%;
    height: 40px;
    border: none;
    outline: none;
    padding: 10px 10px;
  }

  ul {
    width: 100%;
    transition: 0.3s;
    list-style-type: none;
    overflow-y: auto;
    flex-grow: 1;
  }

  ul li {
    width: calc(100% - 30px);
    padding: 20px 10px 20px 20px;
    transition: 0.2s;
    position: relative;
    height: 20px;
    border-bottom: 1px solid #d0d0d0;

    &:hover {
      background-color: ${Themes.color_platinum};
      cursor: pointer;
      transition: 0.2s;
    }
  }

  ul li > a {
    text-decoration: none;
    color: black;
    font-size: 0.9em;
    width: calc(100% - 20px);
    height: calc(100% - 40px);
    position: absolute;
    padding: 20px 10px;
    top: 0;
    left: 0;
    display: flex;
    justify-content: space-between;
  }
  ul li > a strong {
    color: ${Themes.color_electro_blue};
  }

  .new-list {
    background-color: ${Themes.color_electro_blue};
    width: 100%;
    padding: 20px 10px;
    border: none;
    cursor: pointer;
    color: ${Themes.color_electro_blue};
    text-align: start;
    transition: 0.2s;
    display: flex;
    align-items: center;
    justify-content: start;
    z-index: 1;
    font-weight: 600;
    border-bottom: 1px solid ${Themes.color_platinum};
    color: white;

    &:hover {
      background-color: ${Themes.color_electro_blue_dark};
      color: white;
      transition: 0.2s;
    }
  }

  .conta {
    background: ${Themes.color_light_white};
    width: calc(100% - 40px);
    padding: 20px;
    border: none;
    font-weight: 600;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #d9d9d9;
    transition: 0.2s;
    justify-content: space-between;

    &:hover {
      cursor: pointer;
      transition: 0.2s;
    }
  }
  .conta strong {
    font-size: 1.4em;
    max-width: 45%;
    word-wrap: break-word;
  }
  .conta button {
    background-color: ${Themes.color_chacoal};
    padding: 10px 10px;
    border: none;
    border-radius: 10px;
    color: white;
    transition: 0.3s;
    box-shadow: 0px 3px 3px ${Themes.color_shadow_light};

    &:hover {
      background-color: #B0041A;
      cursor: pointer;
      transition: 0.3s;
    }
  }
  > a {
    width: 100%;
    text-decoration: none;
  }

  @media screen and (max-width: 570px) {
    width: 100%;
  }
`;
