import { styled } from "solid-styled-components";

export const CardContainer = styled.div`
    display: flex;
    padding: 0.5rem;
    border: 1px solid var(--border-color-light);
    border-radius: 8px;
    background: var(--bg-card);
    box-shadow: var(--shadow-md);
    transition: box-shadow 0.2s ease, border-color 0.2s ease;
    
    &:hover {
        border-color: var(--border-color-light);
        box-shadow: var(--shadow-lg);
    }
`;

export const CardDetails = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
    flex: 1;
`;

export const CardIcon = styled.div`
    width: 40px;
    height: 40px;
    background-color: var(--primary-color);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
`;
export const CardName = styled.div`
    font-size: 1rem;
    font-weight: 500;
    color: var(--text-primary);
`;
export const CardBadge = styled.div<{ type: "success" | "warning" | "error" | "info" }>`
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    font-size: 0.875rem;
    font-weight: 500;
    background-color: ${(props) =>
        props.type === "success" ? "var(--success-dark)" :
        props.type === "warning" ? "var(--warning-dark)" :
        props.type === "error" ? "var(--error-dark)" :
        "var(--info-dark)"};
    
    border: 1px solid ${(props) =>
        props.type === "success" ? "var(--success-border)" :
        props.type === "warning" ? "var(--warning-border)" :
        props.type === "error" ? "var(--error-border)" :
        "var(--info-border)"};
    color: ${(props) =>
        props.type === "success" ? "var(--success-color)" :
        props.type === "warning" ? "var(--warning-color)" :
        props.type === "error" ? "var(--error-color)" :
        "var(--info-color)"};
    display: flex;
    align-items: center;
    gap: 0.25rem;
`;
export const CardActions = styled.div`
    display: flex;
    gap: 0.5rem;
`;
export const ActionButton = styled.button`
    background: none;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.25rem;
    border-radius: 4px;
    color: var(--text-primary);
    transition: background-color 0.2s ease, color 0.2s ease;
    
    &:hover {
        background-color: var(--bg-hover);
        color: var(--text-secondary);
    }
    
    &:focus-visible {
        outline: none;
        box-shadow: 0 0 0 2px var(--focus-ring);
    }
    
    font-size: 1.25rem;
`;
