import styled from 'styled-components';
import { Themes } from '../../Themes';

export const Container = styled.div`
  background-color: white;
  width: 100%;
  min-height: 100dvh;
  position: absolute;
  z-index: 2;

  .header {
    width: calc(100% - 30px);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
  }
  .header .logo {
    color: gray;
    font-size: 2em;
  }
  .header .buttons {
    display: flex;
  }
  .header .buttons button {
    background-color: white;
    padding: 6px 11px;
    border-radius: 50px;
    border: 1px solid black;
    color: black;
    font-weight: 500;
    transition: 0.2s;

    &:hover {
      background-color: #2e2e29;
      color: white;
      cursor: pointer;
      transition: 0.2s;
    }
  }

  .main {
    width: calc(100% - 20px);
    height: calc(100dvh);
    justify-content: center;
    align-items: center;
    display: flex;
    text-align: center;
    padding: 10px;
    position: absolute;
    top: 0;
    left: 0;
  }
  .main h1 {
    color: white;
    font-weight: 500;
    mix-blend-mode: difference;
  }
`;