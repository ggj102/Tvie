import styled from "styled-components";

export const AvailabilitiesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;

  & > div:first-of-type {
    cursor: pointer;
  }

  .hideOption {
    display: flex;
    flex-direction: column;
    gap: 6px;

    & > div {
      cursor: pointer;
    }
  }
`;
