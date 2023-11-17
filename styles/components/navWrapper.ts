import styled from "styled-components";

export const NavWrapper = styled.div`
  width: 100%;
  height: 64px;
  z-index: 2000;
  background-color: #032541;
  display: flex;
  justify-content: center;
  align-items: center;

  position: fixed;

  color: #fff;

  font-weight: bold;

  & > div {
    display: flex;
    justify-content: space-between;

    width: 1300px;
    height: 40px;
    padding: 0 40px;
  }

  .logo {
    position: relative;
    width: 100px;
    height: 40px;
  }

  .navBar {
    font-size: 16px;
  }

  .flex {
    display: flex;
    align-items: center;
    gap: 30px;
  }
`;
