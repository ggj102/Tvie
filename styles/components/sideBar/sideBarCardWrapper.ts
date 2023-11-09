import styled from "styled-components";

export const SideBarCardWrapper = styled.div`
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
    display: flex;
    flex-direction: column;
    gap: 10px;

    padding: 14px 16px 16px;
    border-top: 1px solid rgba(227, 227, 227, 1);

    select {
      width: 100%;
      height: 34px;
    }

    .slider {
      display: flex;
      justify-content: center;

      & > div {
        width: 200px;
      }
    }
  }
`;