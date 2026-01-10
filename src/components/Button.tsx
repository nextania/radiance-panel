import { type Component } from "solid-js";
import { styled } from "solid-styled-components";

const ButtonBase = styled.button`
  background-color: var(--primary-color);
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  transition: background-color 0.3s ease, box-shadow 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover:not(:disabled) {
    background-color: var(--primary-hover);
  }
  
  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px var(--focus-ring);
  }
  
  &:disabled {
    background-color: var(--disabled-bg);
    color: var(--text-disabled);
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

export const Button = ({ Icon, text, onClick }: { Icon?: Component, text?: string | (() => string); onClick?: () => void }) => {
  return (
    <ButtonBase onClick={onClick}>
      {Icon && <Icon />}
      {typeof text === "function" ? text() : text}
    </ButtonBase>
  )
};
