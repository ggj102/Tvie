import styled from "styled-components";

export const SearchBarWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  min-height: 300px;
  height: calc(100vh / 2.5);

  max-height: 360px;
  background-size: cover;
  background-repeat: no-repeat;
  color: #fff;

  background-image: linear-gradient(
      to right,
      rgba(28, 211, 174, 0.1) 0%,
      rgba(2, 182, 225, 0.1) 100%
    ),
    url("https://www.themoviedb.org/t/p/w1920_and_h600_multi_faces_filter(duotone,00192f,00baff)/pQvqGK6KQDILL7SJrhMQsRvJfLB.jpg");

  & > div {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 50px;
    padding: 30px 40px;

    .introText {
      font-weight: bold;

      div:nth-child(1) {
        font-size: 3em;
      }
      div:nth-child(2) {
        font-size: 2em;
      }
    }

    .searchInput {
      background-color: #fff;
      height: 46px;
      box-sizing: border-box;
      padding: 10px 20px;

      border-radius: 30px;

      position: relative;

      input {
        box-sizing: border-box;
        font-size: 1.1em;
        color: rgba(0, 0, 0, 0.5);
        height: 26px;
        border: none;

        &:focus {
          outline: none;
          border: none;
        }
      }

      button {
        position: absolute;
        height: 46px;
        padding: 10px 26px;
        top: 0;
        right: 0;
        font-size: 1em;
        border: none;
        border-radius: 30px;
        box-sizing: border-box;
        color: #fff;
        font-weight: bold;

        background-color: yellow;
        background: linear-gradient(
          to right,
          rgba(28, 211, 174, 1) 0%,
          rgba(2, 182, 225, 1) 100%
        );
      }
    }
  }
`;
