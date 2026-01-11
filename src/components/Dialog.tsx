import CorvuDialog from "corvu/dialog";
import { styled } from "solid-styled-components";
import type { JSX } from "solid-js";

const Overlay = styled(CorvuDialog.Overlay)`
    position: fixed;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 1000;
    animation: overlayFadeIn 0.2s ease-out;
    
    @keyframes overlayFadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
`;

const Content = styled(CorvuDialog.Content)`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: var(--bg-card);
    border: 1px solid var(--border-color-light);
    border-radius: 12px;
    box-shadow: 0px 0px 40px rgba(0, 0, 0, 0.8);
    padding: 1.5rem;
    z-index: 1001;
    min-width: 400px;
    max-width: 90vw;
    animation: contentFadeIn 0.2s ease-out;
    
    &:focus-visible {
        outline: none;
    }
    
    @keyframes contentFadeIn {
        from {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.96);
        }
        to {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }
    }
`;

const Title = styled(CorvuDialog.Label)`
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--text-primary);
    margin: 0 0 0.5rem 0;
`;

const Description = styled(CorvuDialog.Description)`
    font-size: 0.9375rem;
    color: var(--text-secondary);
    margin: 0 0 1.5rem 0;
    line-height: 1.5;
`;

const Actions = styled.div`
    display: flex;
    gap: 0.75rem;
    justify-content: flex-end;
`;

const Button = styled.button<{ variant?: "primary" | "destructive" | "secondary" }>`
    padding: 0.5rem 1rem;
    border-radius: 6px;
    font-size: 0.875rem;
    font-weight: 500;
    border: 1px solid;
    transition: all 0.2s ease;
    
    ${props => {
        if (props.variant === "destructive") {
            return `
                background-color: var(--error-dark);
                border-color: var(--error-border);
                color: var(--error-color);
                
                &:hover {
                    background-color: var(--error-color);
                    color: white;
                }
            `;
        } else if (props.variant === "primary") {
            return `
                background-color: var(--primary-color);
                border-color: var(--primary-color);
                color: white;
                
                &:hover {
                    opacity: 0.9;
                }
            `;
        } else {
            return `
                background-color: transparent;
                border-color: var(--border-color-light);
                color: var(--text-primary);
                
                &:hover {
                    background-color: var(--bg-hover);
                }
            `;
        }
    }}
    
    &:focus-visible {
        outline: none;
        box-shadow: 0 0 0 2px var(--focus-ring);
    }
`;

interface DialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title: string;
    description: string;
    confirmLabel?: string;
    cancelLabel?: string;
    destructive?: boolean;
    onConfirm?: () => void;
}

export const Dialog = (props: DialogProps) => {
    return (
        <CorvuDialog open={props.open} onOpenChange={props.onOpenChange}>
            <CorvuDialog.Portal>
                <Overlay />
                <Content>
                    <Title>{props.title}</Title>
                    <Description>{props.description}</Description>
                    <Actions>
                        <CorvuDialog.Close as="div">
                            <Button variant="secondary">
                                {props.cancelLabel}
                            </Button>
                        </CorvuDialog.Close>
                        <CorvuDialog.Close as="div">
                            <Button 
                                variant={props.destructive ? "destructive" : "primary"}
                                onClick={props.onConfirm}
                            >
                                {props.confirmLabel}
                            </Button>
                        </CorvuDialog.Close>
                    </Actions>
                </Content>
            </CorvuDialog.Portal>
        </CorvuDialog>
    );
};

export default Dialog;
