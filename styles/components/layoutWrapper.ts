import styled from "styled-components";

export const LayoutWrapper = styled.div`
  width: 100%;
  padding-top: 64px;
  display: flex;
  flex-direction: column;

  font-family: "pretendard";

  & > div {
    width: 100%;
    display: flex;
    justify-content: center;

    & > div {
      width: 1300px;
      height: auto;
    }
  }

  footer {
    margin-top: 64px;
    width: 100%;
    height: 200px;
    background-color: #032541;
  }
`;
