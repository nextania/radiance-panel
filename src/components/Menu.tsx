import { createSignal, Show, onCleanup, type JSX, createEffect } from "solid-js";
import { styled } from "solid-styled-components";

const MenuContainer = styled.div`
    position: relative;
    display: flex;
    align-items: center;
`;

const MenuDropdown = styled.div`
    position: absolute;
    top: calc(100% + 0.5rem);
    right: 0;
    min-width: 160px;
    background: var(--bg-card);
    border: 1px solid var(--border-color-light);
    border-radius: 8px;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.8);
    padding: 0.5rem 0;
    z-index: 1000;
    animation: menuFadeIn 0.15s ease-out;
    transform-origin: top right;
    
    @keyframes menuFadeIn {
        from {
            opacity: 0;
            transform: scale(0.95) translateY(-0.25rem);
        }
        to {
            opacity: 1;
            transform: scale(1) translateY(0);
        }
    }
`;

const MenuItem = styled.button<{ destructive?: boolean }>`
    width: 100%;
    padding: 0.5rem 1rem;
    border: none;
    background: none;
    color: ${props => props.destructive ? "var(--error-color)" : "var(--text-primary)"};
    font-size: 0.875rem;
    text-align: left;
    transition: background-color 0.2s ease;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    
    &:hover {
        background-color: var(--bg-hover);
    }
    
    &:focus-visible {
        outline: none;
        background-color: var(--bg-hover);
    }
`;

const MenuDivider = styled.div`
    height: 1px;
    background-color: var(--border-color-light);
    margin: 0.25rem 0;
`;

interface MenuProps {
    trigger: JSX.Element;
    children: JSX.Element;
}

const Menu = (props: MenuProps) => {
    const [isOpen, setIsOpen] = createSignal(false);
    let menuRef: HTMLDivElement | undefined;

    const toggleMenu = (e: MouseEvent) => {
        e.stopPropagation();
        setIsOpen(!isOpen());
    };
    
    const handleClickOutside = (e: MouseEvent) => {
        if (menuRef && !menuRef.contains(e.target as Node)) {
            setIsOpen(false);
        }
    };
    const handleEscape = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
            setIsOpen(false);
        }
    };

    const cleanup = () => {
        document.removeEventListener("click", handleClickOutside);
        document.removeEventListener("keydown", handleEscape);
    };

    createEffect(() => {
        if (isOpen()) {
            document.addEventListener("click", handleClickOutside);
            document.addEventListener("keydown", handleEscape);
        } else {
            cleanup();
        }
    });

    onCleanup(cleanup);

    const handleMenuItemClick = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        const button = target.closest("button");
        
        if (button) {
            setIsOpen(false);
        }
    };

    return (
        <MenuContainer ref={menuRef}>
            <div onClick={toggleMenu}>
                {props.trigger}
            </div>
            <Show when={isOpen()}>
                <MenuDropdown onClick={handleMenuItemClick}>
                    {props.children}
                </MenuDropdown>
            </Show>
        </MenuContainer>
    );
};

export { Menu, MenuItem, MenuDivider };
export default Menu;
