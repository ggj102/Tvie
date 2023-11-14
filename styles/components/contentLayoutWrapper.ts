import styled from "styled-components";

export const ContentLayoutWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;

  & > div {
    width: 1300px;
    height: auto;

    & > div {
      display: flex;
      flex-direction: column;

      gap: 20px;
    }
  }

  .categoryTitle {
    margin-top: 30px;
    font-size: 1.6em;
    font-weight: bold;
  }

  .contentArea {
    display: flex;

    gap: 30px;
    height: auto;

    .contentList {
      display: flex;
      flex-direction: column;
      gap: 30px;

      ul {
        display: grid;
        grid-template-columns: repeat(5, 180px);

        gap: 30px;

        li {
          position: relative;
          overflow: hidden;
          border-radius: 8px;

          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          border: 1px solid rgba(227, 227, 227, 1);
          box-sizing: border-box;

          .contentImg {
            position: relative;

            height: 273px;
            overflow: hidden;
          }

          .score {
            display: flex;
            justify-content: center;
            align-items: center;

            position: absolute;
            top: 256px;
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
            padding: 26px 10px 12px;

            .title {
              font-weight: bold;

              &:hover {
                color: rgb(1, 180, 228);
              }
            }
            .release {
              margin-top: 4px;
              font-size: 14px;
              color: rgba(0, 0, 0, 0.6);
            }
          }
        }
      }

      button {
        display: flex;
        align-items: center;
        width: 100%;
        background-color: rgb(1, 180, 228);
        height: 50px;
        justify-content: center;
        border-radius: 8px;
        padding: 0;
        border: none;

        cursor: pointer;

        color: #fff;
        font-size: 1.5em;
        font-weight: bold;

        &:hover {
          color: #000;
        }
      }
    }
  }

  .personList {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 30px;

    .personCard {
      overflow: hidden;
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;

      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      border: 1px solid rgba(227, 227, 227, 1);

      .personImg {
        position: relative;

        width: 100%;
        height: calc(100vw / 4);
        max-height: calc((1300px - 140px) / 4);
        margin: 0;
      }

      .personInfo {
        padding: 8px 10px;
        width: 100%;
        box-sizing: border-box;

        .name {
          width: 100%;
          line-height: 1.2em;
          font-weight: bold;
        }
        .sub {
          font-size: 0.9em;
          font-weight: 400;
          color: rgba(0, 0, 0, 0.6);
          display: block;
          margin-top: 0;
        }
      }
    }
  }

  .pagination {
    width: 100%;
    padding-top: 10px;
    display: flex;
    justify-content: center;
  }
`;
