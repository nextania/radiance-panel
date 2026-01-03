import { styled } from "solid-styled-components";

export const Button = styled.button`
  background-color: var(--button-color);
  font-size: 1.2rem;
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6rem 1.2rem;
  &:hover {
    background-color: var(--button-hover-color);
  }`;