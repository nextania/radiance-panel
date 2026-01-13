import { type JSX } from "solid-js";
import { styled } from "solid-styled-components";

const InputBase = styled.input`
  width: 100%;
  padding: 0.5rem 1rem;
  background: var(--bg-card);
  color: var(--text-primary);
  border: 1px solid var(--border-color);
  border-radius: 0.5rem;
  font-size: 1rem;
  transition: all 0.2s ease;
  
  &::placeholder {
    color: var(--text-disabled);
  }
  
  &:hover:not(:disabled) {
    border-color: var(--border-color-light);
    background: var(--bg-navbar-item-hover);
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px var(--focus-ring);
    border-color: var(--border-focus);
  }
  
  &:disabled {
    background-color: var(--disabled-bg);
    color: var(--text-disabled);
    cursor: not-allowed;
    opacity: 0.6; 
  }
`;

export const Input = (props: JSX.InputHTMLAttributes<HTMLInputElement>) => {
  return <InputBase{...props} />;
};
