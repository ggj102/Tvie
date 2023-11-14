import styled from "styled-components";

export const PersonDetailWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 30px;

  & > div {
    width: calc(100vw - 80px);
    max-width: 1300px;
    display: flex;
    gap: 30px;
    align-items: flex-start;
  }

  .personInfo {
    min-width: 300px;
    width: 300px;

    .personImg {
      position: relative;
      width: 100%;
      height: 450px;
      border-radius: 8px;
      overflow: hidden;
      margin-bottom: 30px;
    }

    .info {
      margin-top: 30px;

      & > div:first-of-type {
        font-weight: 600;
        font-size: 1.3em;
        margin-bottom: 8px;
      }

      .intro {
        display: flex;
        flex-direction: column;
        gap: 20px;

        p {
          all: unset;
          font-weight: 600;
          font-size: 16px;
        }

        ul {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
      }
    }
  }

  .detailInfo {
    max-width: 970px;
    width: calc(100vw - 400px);

    display: flex;
    flex-direction: column;
    gap: 30px;

    .detailInfoTitle {
      font-weight: 600;
      font-size: 1.3em;
      margin-bottom: 8px;
    }

    .personName {
      width: 100%;
      font-size: 2.2rem;
      font-weight: 600;
    }

    .history {
      position: relative;

      .historyText {
        display: flex;
        flex-direction: column;
        gap: 22px;
        max-height: 222px;
        line-height: 1.4em;
        overflow: hidden;

        &::after {
          content: "";
          width: 100%;
          height: 22px;
          position: absolute;
          bottom: 0;
          right: 0;
          background-image: linear-gradient(
            to right,
            rgba(255, 255, 255, 0) 0,
            #fff 85%
          );
          pointer-events: none;
        }
      }
    }

    .famousList {
      position: relative;

      ul {
        display: flex;
        gap: 12px;
        min-height: 221px;
        -webkit-overflow-scrolling: touch;
        overflow: scroll;
        flex-wrap: nowrap;
        justify-content: flex-start;
        width: auto;
        padding-bottom: 10px;

        &::-webkit-scrollbar {
          height: 10px;
        }

        &::-webkit-scrollbar-thumb {
          background: rgb(219, 219, 219);
          border-radius: 8px;
        }

        li {
          position: relative;

          .famousImg {
            position: relative;
            width: 130px;
            height: 195px;
            border-radius: 8px;
            margin-bottom: 4px;
            overflow: hidden;
          }

          .famousTitle {
            width: 100%;
            display: inline-block;
            text-align: center;
            color: #000;
            font-size: 0.9em;

            a:hover {
              color: rgb(1, 180, 228);
            }
          }
        }
      }

      &::after {
        content: "";
        width: 60px;
        height: 100%;
        position: absolute;
        top: 0;
        right: 0;
        background-image: linear-gradient(
          to right,
          rgba(255, 255, 255, 0) 0,
          #fff 100%
        );
        will-change: opacity;
        pointer-events: none;
      }
    }

    .careerList {
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      border: 1px solid rgba(227, 227, 227, 1);
      background-color: #fff;
      padding: 10px 0;

      .topLine {
        border-top: 1px solid #dedede;
        margin-top: 10px;
        padding-top: 18px;
      }

      .bottomLine {
        border-bottom: 1px solid #dedede;
        margin-bottom: 10px;
        padding-bottom: 18px;
      }

      li {
        padding: 8px 16px;
        gap: 16px;
        display: flex;
      }

      .careerYear {
        width: 44px;
        font-weight: 400;
        text-align: center;
      }

      .dot {
        padding-top: 6px;
        & > div {
          color: #ccc;
          width: 10px;
          height: 10px;

          background-color: #000;
          border-radius: 100%;
        }
      }

      .casting {
        width: 100%;
        & > div:first-of-type {
          font-weight: 600;
        }

        a:hover {
          color: rgb(1, 180, 228);
        }

        .castingInfo {
          padding-left: 14px;

          display: flex;
          gap: 1px;
          color: rgba(0, 0, 0, 0.5);
          font-weight: 400;
        }
      }
    }
  }
`;
