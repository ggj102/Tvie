import styled from "styled-components";

export const PersonListWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 10px;

  li {
    width: 100%;
    display: flex;
    box-shadow: none;
    border: none;

    .personImage {
      position: relative;
      min-width: 70px;
      width: 70px;
      height: 70px;
      margin-right: 20px;

      img {
        border-radius: 8px;
      }
    }
    .personInfo {
      display: flex;
      align-items: center;
      width: 100%;

      & > div {
        width: 100%;
        display: flex;
        flex-direction: column;
      }

      .personName {
        font-size: 1.2em;
        font-weight: 600;
      }

      .department {
        padding-right: 20px;
        position: relative;

        &::after {
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
      }
    }
  }
`;