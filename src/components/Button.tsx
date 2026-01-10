import type { JSX } from "solid-js";
import { styled } from "solid-styled-components";

const ButtonBase = styled.button`
  background-color: oklch(.558 .288 302.321);
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: oklch(.496 .265 301.924);
  }
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const Button = ({ Icon, text }: { Icon: JSX.Element, text: string; }) => {
  return (
    <ButtonBase>
      {Icon}
      {text}
    </ButtonBase>
  )
};
