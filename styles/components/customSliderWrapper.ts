import styled from "styled-components";

export const CustomSliderWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 50px;
  .graduation {
    position: absolute;
    width: 100%;
    display: flex;
    align-items: end;
    justify-content: space-between;

    & > div {
      width: 1px;
      height: 5px;
      background-color: #000;
    }

    .pointGraduation {
      height: 10px;
    }

    .pointNum {
      position: absolute;
      font-size: 0.92em;
      top: 30px;
      transform: translateX(-50%);
    }
  }

  .MuiSlider-track {
    height: 2px;
    color: rgb(1, 180, 228);
  }

  .MuiSlider-rail {
    height: 2px;
    color: #a9a9a9;
  }

  .MuiSlider-thumb {
    color: rgb(1, 180, 228);
    width: 16px;
    height: 16px;
  }
`;
