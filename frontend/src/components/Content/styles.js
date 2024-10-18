import styled from "styled-components";
import { Themes } from "../../Themes";

export const ContainerContent = styled.div`
  background-color: ${Themes.color_white};
  width: calc(100% - 250px);
  height: 100%;
  border-left: 1px solid #d0d0d0;
  transition: all 0.2s;

  .content .header-content {
    background: linear-gradient(to right, ${Themes.color_platinum}, pink, ${Themes.color_electro_blue});
    height: 105.4px;
    padding: 10px;
    display: flex;
    align-items: end;
    justify-content: start;
    border-bottom: 1px solid #d0d0d0;
    position: relative;
  }
  .content .header-content .top {
    display: flex;
    flex-direction: column;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .content .header-content .top p {
    font-size: 0.8em;
  }
  .content .header-content span {
    background-color: rgba(255, 255, 255, 0.8);
    padding: 1px 5px;
    border-radius: 10px;
    right: 10px;
    position: absolute;
    transition: 0.2s;

    &:hover {
      background-color: white;
      cursor: pointer;
      transition: 0.2s;
    }
  }
  .content .header-content .top h1 {
    font-size: 2.5em;
    color: black;
  }
  .content .tarefas {
    width: 100%;
    height: calc(100dvh - 190px);
    overflow-y: scroll;
  }
  .content .tarefas > p {
    padding: 10px;
    font-weight: 600;
  }
  .content .tarefas .content-tarefa {
    width: calc(100% - 30px);
    padding: 25px 10px;
    height: auto;
    border-bottom: 1px solid #d0d0d0;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 10px;
    margin: 5px;
    box-shadow: 0px 1px 2px ${Themes.color_shadow_light};
    animation: tasks 0.3s ease-in-out;

    &:hover {
      background-color: ${Themes.color_light_white};
      cursor: pointer;
      transition: 0.2s;
    }
  }
  @keyframes tasks {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  .content .tarefas .content-tarefa .actions {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .content .tarefas .content-tarefa .actions span {
    margin: 0px 5px;
    padding: 5px;
    border-radius: 5px;
  }
  .content .tarefas .content-tarefa .actions #check {
    background-color: gray;
    color: white;

    &:hover {
      background-color: #3c3c3c;
    }
  }
  .content .tarefas .content-tarefa .actions #delete {
    background-color: red;
    color: white;

    &:hover {
      background-color: #73061B;
    }
  }
  .content .tarefas .content-tarefa .header-tarefa {
    width: 70%;
    display: flex;
    flex-direction: column;
  }
  .content .tarefas .content-tarefa .header-tarefa .content {
    font-weight: 600;
    width: 100%;
    word-wrap: break-word;
  }
  .content .tarefas .content-tarefa .header-tarefa .data {
    font-size: 0.75em;
    margin-top: 3px;
  }
  .content .create-tarefa {
    width: 100%;
    height: 62px;
    border-top: 1px solid #d0d0d0;
  }
  .content .create-tarefa input {
    background-color: ${Themes.color_platinum};
    padding: 0px 20px;
    width: calc(100% - 40px);
    height: 100%;
    border: none;
    outline: none;
    font-size: 1.15em;
    color: black;

    &::placeholder {
      color: #3c3c3c;
      font-size: 0.85em;
    }
  }

  @media screen and (max-width: 630px) {
    .content .tarefas .content-tarefa .header-tarefa {
      width: 100%;
    }
    .content .tarefas .content-tarefa {
      display: flex;
      flex-direction: column;
      align-items: start;
    }

    .content .tarefas .content-tarefa .actions {
      margin-top: 20px;
    }
  }

  .apresentation-wrave {
    background-color: ${Themes.color_white};
    width: calc(100% - 40px);
    height: calc(100% - 40px);
    padding: 20px;
  }
  .apresentation-wrave .info-user {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .apresentation-wrave .info-user strong {
    font-size: 2.2em;
    color: black;
  }
  .apresentation-wrave .info-user button {
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
  .apresentation-wrave > p {
    margin: 15px 0px 5px 0px;
  }
  .apresentation-wrave .status .status-tarefa .container {
    width: calc(100% - 24px);
    border: 2px solid ${Themes.color_platinum};
    padding: 10px 10px ;
    margin: 10px 0px ;
    border-radius: 10px;
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.23);
  }
  .apresentation-wrave .status .status-tarefa .container h3 {
    margin: 10px 0px 15px 0px;
  }
  .apresentation-wrave .status .status-tarefa .container .container-status-tarefa {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  @media screen and (max-width: 950px) {
    .apresentation-wrave .status .status-tarefa .container .container-status-tarefa {
      display: flex;
      align-items: start;
      flex-direction: column;
    }
    .apresentation-wrave .status .status-tarefa .container .container-status-tarefa section {
      width: 100%;
      margin-bottom: 10px;
      border-bottom: 1px solid ${Themes.color_shadow_light};
      padding: 5px 0px;
    }
  }
  .apresentation-wrave .status .status-tarefa .container .container-status-tarefa button {
    background-color: ${Themes.color_electro_blue};
    padding: 5px 5px;
    border: none;
    border-radius: 2px;
    font-size: 0.76em;
    color: white;
    transition: 0.3s;

    &:hover {
      background-color: ${Themes.color_electro_blue_dark};
      transition: 0.3s;
      cursor: pointer;
    }
  }
  .apresentation-wrave .status {
    width: 100%;
    height: calc(100% - 87px);
  }

  .container-options {
    background-color: ${Themes.color_white};
    position: absolute;
    display: flex;
    flex-direction: column;
    padding: 10px;
    right: 60px;
    bottom: -105px;
    border-radius: 10px;
    box-shadow: 0px 2px 6px ${Themes.color_shadow_light};
    animation: options 0.2s ease-in-out;
  }
  .container-options button {
    background-color: ${Themes.color_electro_blue};
    border: none;
    margin: 2px 0px;
    padding: 10px 5px;
    border-radius: 5px;
    color: white;
    transition: all 0.2s;
    animation: options 0.2s ease-in-out;

    &:hover {
      background-color: ${Themes.color_electro_blue_dark};
      cursor: pointer;
      transition: 0.2s;
      box-shadow: 0px 2px 6px ${Themes.color_shadow_light};
    }
  }
  .container-options .message {
    background-color: ${Themes.color_white};
    position: fixed;
    width: 100%;
    height: 100dvh;
    top: 0;
    left: 0;
    z-index: 1;
    justify-content: center;
    align-items: center;
    display: flex;
    flex-direction: column;
    animation: options 0.2s ease-in-out;
    text-align: center;
  }
  .container-options .message p {
    font-weight: 600;
    margin-bottom: 20px;
    font-size: 1.4em;
  }
  .container-options .message button {
    width: 100px;
    margin: 0px 2px;
    font-weight: 600;
  }
  @keyframes options {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @media screen and (max-width: 570px) {
    width: 100%;
    position: absolute;
    z-index: 1;
  }
`;