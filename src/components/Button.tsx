import { type Component } from "solid-js";
import { styled } from "solid-styled-components";

const ButtonBase = styled.button`
  background-color: var(--primary-color);
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: var(--primary-hover);
  }
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const Button = ({ Icon, text, onClick }: { Icon?: Component, text?: string | (() => string); onClick?: () => void }) => {
  return (
    <ButtonBase onClick={onClick}>
      {Icon && <Icon />}
      {typeof text === "function" ? text() : text}
    </ButtonBase>
  )
};
