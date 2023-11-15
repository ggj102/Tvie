import styled from "styled-components";

export const CompanyListWrapper = styled.ul`
  li {
    border-top: 1px solid #000;

    a {
      display: flex;
      align-items: center;
      gap: 6px;
      height: 40px;
    }

    &:last-of-type {
      border-bottom: 1px solid #000;
    }

    .logo_image {
      position: static !important;
      height: 30px !important;
      /* width: auto; */
    }

    .companyName {
      font-size: 20px;
    }

    .nation {
      display: inline-flex;
      align-items: center;
      align-content: center;
      font-size: 14px;
      line-height: 1em;
      font-weight: 400;
      padding: 2px 6px;
      background-color: rgba(0, 0, 0, 0.2);
      color: #fff;
      border-radius: 4px;
    }
  }
`;
