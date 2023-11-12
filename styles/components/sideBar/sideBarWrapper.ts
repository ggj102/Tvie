import styled from "styled-components";

export const SideBarWrapper = styled.div`
  form {
    width: 260px;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  select {
    cursor: pointer;
  }

  .card {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(227, 227, 227, 1);
    background-color: #fff;
    border-radius: 8px;
    .cardTitle {
      width: 100%;
      font-size: 1.1em;
      font-weight: bold;
      padding: 14px 16px;
    }

    .cardContent {
      padding: 14px 16px 16px;
      border-top: 1px solid rgba(227, 227, 227, 1);

      .keywordInput {
        transition: all 0.2s ease-in-out;
        border-color: #ced4da;
        color: #495057;
        background-color: #fff;

        border-radius: 0.25rem;
        padding: 0 calc(16px + 0.75rem) 0 0;
        width: 100%;
        border-width: 1px;
        border-style: solid;
        box-sizing: border-box;
        position: relative;
        cursor: text;
        outline: 0;
      }
    }
  }

  .submitBtn {
    width: 100%;
    margin-top: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: center;
    border-radius: 20px;
    height: 44px;
    font-weight: bold;
    font-size: 1.2em;

    background-color: rgba(228, 228, 228, 0.7);
  }
`;
