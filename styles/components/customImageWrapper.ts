import styled from "styled-components";

export const CustomImageWrapper = styled.div`
  & > div {
    position: relative;
  }

  .noneImg {
    img {
      background-color: #dbdbdb;
    }
  }

  .displayNone {
    display: none;
  }

  .imgLoading {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 50;
    background-color: #dbdbdb;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    color: gray;

    & > div {
      position: relative;
      width: 100%;
      height: 100%;
    }
  }
`;
