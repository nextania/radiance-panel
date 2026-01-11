import { styled } from "solid-styled-components";

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;  
`;
export const Section = styled.div`
  display: flex;
  flex-direction: column;
`;
export const HeadingLarge = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-primary);
`;
export const SubheadingLarge = styled.div`
  font-size: 1rem;
  font-weight: 400;
  color: var(--text-secondary);
`;
export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
export const Container = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  & > * {
    width: 100%;
    max-width: 1000px;
  }
`;
