import styled from "styled-components";

export const ContentLayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 30px;
  gap: 20px;

  .categoryTitle {
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
      }
    }
  }
`;
