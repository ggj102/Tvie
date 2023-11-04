import styled from "styled-components";

export const CategoryButtonsWrapper = styled.div`
  ul {
    li {
      display: inline-flex;

      border: 1px solid #9e9e9e;
      border-radius: 14px;

      font-size: 0.9em;
      margin-right: 6px;
      margin-top: 8px;

      cursor: pointer;

      & > div {
        padding: 4px 12px;
      }

      &:hover {
        background-color: rgb(1, 180, 228);
        color: #fff;
        border-color: rgb(1, 180, 228);
      }
    }

    .select {
      background-color: rgb(1, 180, 228);
      color: #fff;
      border-color: rgb(1, 180, 228);
    }
  }
`;
