import styled from "styled-components";

export const Dot = styled("div")<{ i: number }>`
  --degrees: ${(props) => (props.i * 360) / 8}deg;
  transform: translate(
    calc(cos(var(--degrees)) * 25px),
    calc(sin(var(--degrees)) * 25px)
  );

  --size: 1em;
  aspect-ratio: 1;
  position: absolute;
  border-radius: 100%;
  width: var(--size);
  background-color: rgb(1, 180, 228);
  opacity: 0;
  top: calc(var(--size) / 2);
  left: calc(var(--size) / 2);
  animation: animate-in 900ms ease-in-out ${(props) => props.i * 100}ms infinite
    alternate;
`;

export const LoadingWrapper = styled.div`
  width: 100%;
  height: calc(100vh);
  background-color: #fff;
  aspect-ratio: 1;
  position: fixed;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;

  .container {
    width: 2em;
    border-radius: 50%;
    aspect-ratio: 1;
    position: relative;
  }

  .dot-spinner {
    display: grid;
    place-items: center;
    position: relative;
    width: 4.25em;
    height: 4.25em;
  }

  .spinner-block {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  @keyframes animate-in {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
`;
