import styled from "styled-components";

export const LoadingContainer = styled.div`
background-color: white;
  width: 100%;
  height: 100dvh;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 2;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;

  p {
    margin-top: 10px;
  }
`;