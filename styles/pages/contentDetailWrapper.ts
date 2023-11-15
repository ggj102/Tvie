import styled from "styled-components";

export const ContentDetailWrapper = styled("div")<{ bgUrl: string }>`
  .mainInfo {
    width: 100%;

    border-bottom: 1px solid rgba(31.5, 31.5, 73.5, 1);
    background-position: left calc((50vw - 170px) - 340px) top;
    background-size: cover;
    background-repeat: no-repeat;
    background-image: ${(props) =>
      props.bgUrl
        ? `url("https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/${props.bgUrl}")`
        : ""};

    & > div {
      background-image: linear-gradient(
        to right,
        rgba(31.5, 31.5, 73.5, 1) calc((50vw - 170px) - 340px),
        rgba(31.5, 31.5, 73.5, 0.84) 50%,
        rgba(31.5, 31.5, 73.5, 0.84) 100%
      );

      display: flex;
      justify-content: center;
      flex-wrap: wrap;
    }

    & > div > div {
      display: flex;
      gap: 40px;
      padding: 30px 0;
      width: 1300px;
    }

    .poster {
      overflow: hidden;
      border-radius: 8px;

      .posterImg {
        min-width: 300px;
        width: 300px;
        height: 450px;
        position: relative;
      }

      .ottOffer {
        display: flex;
        justify-content: center;
        width: 100%;
        height: 60px;
        background-color: rgb(3, 37, 65);
      }
    }

    .contentInfo {
      flex: 1;
      color: #fff;

      .titleWrapper {
        margin-bottom: 24px;
        .title {
          font-size: 2.2rem;
          & > span:first-of-type {
            font-weight: 600;
          }

          & > span:last-of-type {
            opacity: 0.8;
            font-weight: 400;
          }
        }
      }

      .age {
        border: 1px solid rgba(255, 255, 255, 0.6);
        color: rgba(255, 255, 255, 0.6);
        display: inline-flex;
        white-space: nowrap;
        align-items: center;
        align-content: center;
        padding: 0.06em 4px 0.15em !important;
        line-height: 1;
        border-radius: 2px;
        margin-right: 7px;
      }

      .release {
        padding-right: 20px;
        position: relative;
      }
      .genre {
      }
      .runtime {
      }

      .dot {
        padding-left: 20px;
        position: relative;
      }

      .release::after {
        font-size: 1.1em;
        line-height: 1;
        content: "•";
        position: absolute;
        top: 0;
        right: 7px;
        display: inline-flex;
        align-content: center;
        align-items: center;
      }

      .dot:before {
        font-size: 1.1em;
        line-height: 1;
        content: "•";
        position: absolute;
        top: 0;
        left: 7px;
        display: inline-flex;
        align-content: center;
        align-items: center;
      }

      .score {
        margin-bottom: 20px;
        display: flex;
        align-items: center;
        font-weight: bold;
        .scoreGauge {
          width: 60px;
          height: 60px;
          border-radius: 100%;
          background-color: #000;

          display: flex;
          justify-content: center;
          align-items: center;

          margin-right: 6px;
        }

        .trailBtn {
          display: flex;
          align-items: center;
          margin-left: 20px;

          .arrowImg {
            filter: invert(1);
            width: 23px;
            height: 23px;
            margin-right: 5px;
            background-image: url("https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-175-play-806cb05551791b8dedd7f8d38fd3bd806e2d397fcfeaa00a5cc9129f0819fd07.svg");
          }

          &:hover {
            opacity: 0.7;
          }
        }
      }

      .summary {
        color: #fff;
        .tagline {
          margin-bottom: 8px;
          font-size: 1.1em;
          font-weight: 400;
          font-style: italic;
          opacity: 0.7;
        }

        & > div:nth-child(2) {
          font-weight: 600;
          font-size: 1.3em;
          margin-bottom: 8px;
        }
      }

      .producer {
        margin-top: 20px;

        ul {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          row-gap: 20px;

          li {
            font-size: 0.9em;
            & > div:first-child {
              font-weight: bold;
              font-size: 16px;
            }
          }
        }
      }
    }
  }
`;

export const DetailInfoWrapper = styled.div`
  display: flex;
  justify-content: center;

  & > div {
    max-width: 1300px;
    padding: 30px 0;
    width: 100%;
    display: flex;
    align-items: flex-start;
    gap: 30px;
  }

  .infoTitle {
    font-weight: 600;
    font-size: 1.4em;
    margin-bottom: 20px;
  }

  .detailInfo {
    background-color: #fff;

    display: flex;

    .mainCast {
      .castList {
        position: relative;
        width: calc(100vw - 290px);
        max-width: calc(1300px - 290px);

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

      ul {
        display: flex;
        gap: 10px;
        -webkit-overflow-scrolling: touch;
        overflow-y: hidden;
        overflow-x: auto;
        padding-bottom: 10px;

        &::-webkit-scrollbar {
          height: 10px;
        }

        &::-webkit-scrollbar-thumb {
          background: rgb(219, 219, 219);
          border-radius: 8px;
        }
      }

      li {
        min-width: 140px;
        width: 140px;
        background-color: #fff;
        box-sizing: border-box;
        border: 1px solid rgba(227, 227, 227, 1);
        padding-bottom: 10px;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

        .castImg {
          position: relative;
          min-width: 140px;
          width: 140px;
          height: 175px;
        }

        .castName {
          .name {
            padding: 0 10px;
            padding-top: 10px;
            font-size: 1em;
            overflow: hidden;
            text-overflow: ellipsis;
            font-weight: bold;
          }
          .casting {
            padding: 0 10px;
            font-size: 0.9em;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
      }
    }
  }

  .sideInfo {
    min-width: 260px;
    width: 260px;
    display: flex;
    flex-direction: column;
    gap: 20px;

    h4 {
      font-size: 1.1em;
      margin: 0;
      margin-bottom: 10px;
    }

    ul {
      li {
        display: inline-flex;
        margin-right: 5px;
        margin-bottom: 10px;
        line-height: 24px;
        font-size: 0.9em;
        box-sizing: border-box;
        white-space: nowrap;

        background-color: rgba(0, 0, 0, 0.1);
        border: 1px solid #d7d7d7;
        color: #000;
        padding: 0 10px;
        border-radius: 4px;
      }
    }
  }
`;
