import styled from "styled-components";

export const IndexWrapper = styled.div`
  .content {
    padding-top: 30px;
  }

  .titleBar {
    display: flex;
    gap: 20px;
    padding: 0 40px;

    h2 {
      margin: 0;
    }

    .homeFilterBar {
      display: flex;

      align-items: center;
      height: 33px;
      border-radius: 30px;
      box-sizing: border-box;
      border: 1px solid #032541;
      overflow: hidden;

      button {
        display: flex;
        justify-content: center;
        align-items: center;
        border: none;
        color: #032541;
        height: 33px;
        padding: 4px 20px;
        border-radius: 30px;
        box-sizing: border-box;
        background-color: transparent;

        font-weight: bold;
        cursor: pointer;
      }

      .currentTab {
        background-color: #032541;

        & > div {
          background: linear-gradient(
            to right,
            rgba(28, 211, 174, 1) 0%,
            rgba(2, 182, 225, 1) 100%
          );
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      }
    }
  }

  ul {
    display: flex;
    height: auto;
    gap: 20px;
    list-style: none;
    padding: 20px 40px;
    margin: 0;
    box-sizing: border-box;
    overflow-x: auto;

    &::-webkit-scrollbar {
      height: 10px;
    }

    &::-webkit-scrollbar-thumb {
      background: rgb(219, 219, 219);
      border-radius: 10px;
    }
  }

  li {
    position: relative;

    .contentImg {
      border-radius: 10px;
      position: relative;
      width: 150px;
      height: 225px;
      overflow: hidden;
    }

    .score {
      display: flex;
      justify-content: center;
      align-items: center;

      position: absolute;
      top: 208px;
      left: 8px;
      width: 34px;
      height: 34px;
      border-radius: 100%;
      background-color: #000;
      font-weight: bold;
      font-size: 0.6em;
      color: #fff;
    }

    .titleRelease {
      padding: 26px 10px 0;

      .title {
        font-weight: bold;
      }
      .release {
        margin-top: 4px;
        font-size: 14px;
        color: rgba(0, 0, 0, 0.6);
      }
    }
  }
`;
