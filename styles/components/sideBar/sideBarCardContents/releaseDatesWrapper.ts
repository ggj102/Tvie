import styled from "styled-components";

export const ReleaseDatesWrapper = styled.div`
  .hideCheckbox {
    display: flex;
    flex-direction: column;
    gap: 6px;

    & > div:first-of-type {
      padding-top: 6px;
      padding-bottom: 14px;
    }
  }

  .datepickerWrapper {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-top: 6px;

    & > div {
      display: flex;
      justify-content: space-between;
      align-items: center;

      span {
        color: #a9a9a9;
      }

      .react-datepicker__tab-loop {
        position: absolute;
      }

      svg {
        top: 50%;
        transform: translateY(-50%);
        color: #a9a9a9;
        left: 0;
      }

      input {
        height: 33px;
        width: 125px;
        border: 1px solid #e4e7eb;
        margin: 0;
        border-radius: 8px;
        box-sizing: border-box;
        padding: 6px 12px;
        padding-left: 35px;
        font-size: 0.9em;

        &:focus {
          outline-color: #01b4e4;
        }
      }
    }
  }
`;
