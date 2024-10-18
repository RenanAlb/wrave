import styled from 'styled-components';
import { Themes } from '../../Themes';

export const Container = styled.div`
  background-color: ${Themes.color_chacoal};
  width: 100%;
  min-height: 100dvh;
`;

export const Loading = styled.div`
  background-color: ${Themes.color_platinum};
  width: 100%;
  height: 100dvh;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;

  p {
    margin-top: 15px;
  }
`;

export const Main = styled.div`

  width: 100%;
  min-height: 100dvh;

  // Header
  .flex {
    width: calc(100%);
    height: calc(100dvh);
    display: flex;
  }
`;