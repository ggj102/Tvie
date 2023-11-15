import styled from "styled-components";

export const SearchResultsWrapper = styled.div`
  & > div:nth-child(2) {
    display: flex;
    justify-content: center;

    & > div {
      width: calc(100vw - 80px);
      max-width: 1300px;
      display: flex;
      align-items: flex-start;
      gap: 30px;
    }
  }

  .searchBar {
    width: 100%;
    display: flex;
    justify-content: center;
    border-bottom: 1px solid #acacac;
    margin-bottom: 30px;

    .searchInput {
      width: calc(100vw - 80px);
      max-width: 1300px;
      display: flex;
      align-items: center;

      input {
        margin-left: 10px;
        flex: 1;
        height: 44px;
        border: none;
        padding: 6px 0;
        box-sizing: border-box;
        font-size: 16px;
        outline: 0;

        font-style: italic;
        color: #acacac;
        text-indent: 0;

        &:focus {
          outline: none;
        }
      }
    }
  }

  .sideBar {
    display: block;
    height: auto;
    box-sizing: border-box;
    min-width: 260px;
    width: 260px;
    border: 1px solid rgba(227, 227, 227, 1);
    border-radius: 8px;
    overflow: hidden;

    & > div:first-of-type {
      display: flex;
      align-items: center;
      align-content: center;
      justify-content: space-between;
      margin: 0;
      font-weight: 600;
      padding: 20px;
      color: #fff;
      background-color: rgb(1, 180, 228);
    }

    ul {
      box-sizing: border-box;
      padding: 8px 0;

      li {
        a {
          display: inline-flex;
          justify-content: space-between;
          align-items: center;

          width: 100%;
          font-size: 1em;
          line-height: 1.4em;
          margin: 0;
        }

        .category {
          color: #000;
          width: 100%;
          height: 100%;
          padding: 10px 20px;
          display: inline-flex;
          align-items: center;
        }

        .total {
          color: #000;
          display: inline-flex;
          align-items: center;
          font-size: 0.8em;
          font-weight: 300;
          background-color: rgba(0, 0, 0, 0.08);
          padding: 0 10px;
          border-radius: 8px;
          margin-right: 20px;
          white-space: nowrap;
        }

        &:hover {
          background-color: rgba(0, 0, 0, 0.08);
          .category {
            font-weight: 600;
          }
          .total {
            background-color: #fff;
          }
        }
      }

      .currentTab {
        background-color: rgba(0, 0, 0, 0.08);
        .category {
          font-weight: 600;
        }
        .total {
          background-color: #fff;
        }
      }
    }
  }

  .searchResultsList {
    flex: 1;
    .searchResultsList {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .contentCard {
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      border: 1px solid rgba(227, 227, 227, 1);
      background-color: #fff;

      width: 100%;
      display: flex;

      border-radius: 8px;
      overflow: hidden;

      .contentImage {
        position: relative;
        min-width: 94px;
        width: 94px;
        height: 141px;
      }

      .contentInfo {
        width: 100%;
        padding: 10px 15px;
        box-sizing: border-box;
        display: flex;
        flex-wrap: wrap;
        align-content: center;
        align-items: center;

        a {
          font-weight: 600;
          font-size: 1.2em;
          line-height: 1.2em;
          margin-bottom: 0;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          text-overflow: ellipsis;
          overflow: hidden;
        }

        .contentDate {
          width: 100%;
          white-space: nowrap;
          color: #999;
        }

        .contentOverview {
          margin-top: 20px;
          font-size: 1em;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          text-overflow: ellipsis;
          overflow: hidden;
        }
      }
    }
  }

  .pagination {
    width: 100%;
    height: 26px;
    margin-top: 30px;

    display: flex;
    justify-content: center;
  }
`;
