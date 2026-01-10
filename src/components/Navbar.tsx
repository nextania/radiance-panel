import type { IconTypes } from "solid-icons";
import { FiGlobe, FiLock, FiLogOut, FiSettings, FiMenu, FiX, FiServer } from "solid-icons/fi";
import { styled } from "solid-styled-components"
import Logo from "../assets/radiance.svg";
import { useNavigate, useLocation } from "@solidjs/router";
import { createSignal, For } from "solid-js";
import { useTranslate } from "../i18n";

const NavbarBase = styled.nav`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 1rem;
    background-color: var(--bg-navbar);
    box-shadow: var(--shadow-sm);
    gap: 1rem;
    box-sizing: border-box;
    border-radius: 12px;
    border: 1px solid var(--border-color);
`;

const LogoBase = styled.img`
    height: 40px;
    transition: opacity 0.2s ease;
    
    &:hover {
        opacity: 0.8;
    }
`;

const NavElementsDesktop = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    
    @media (max-width: 825px) {
        display: none;
    }
`;

const NavbarItem = styled.div<{ isActive?: boolean }>`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    user-select: none;
    border-radius: 6px;
    transition: background-color 0.2s ease, color 0.2s ease;
    color: ${(props) => props.isActive ? "var(--primary-text)" : "var(--text-primary)"};
    background-color: ${(props) => props.isActive ? "var(--bg-navbar-item)" : "transparent"};
    font-weight: ${(props) => props.isActive ? "600" : "400"};
    
    &:hover {
        background-color: ${(props) => props.isActive ? "var(--bg-navbar-item-hover)" : "var(--bg-hover)"};
        color: ${(props) => props.isActive ? "var(--primary-text)" : "var(--text-secondary)"};
    }
`;

const RightActions = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex: 1;
    justify-content: flex-end;
`;

const ActionButton = styled.button`
    background: none;
    border: none;
    user-select: none;
    display: flex;
    align-items: center;
    padding: 0.5rem;
    border-radius: 6px;
    transition: background-color 0.2s ease, color 0.2s ease;
    color: var(--text-primary);
    
    &:hover {
        background-color: var(--bg-hover);
        color: var(--text-secondary);
    }
    
    &:focus-visible {
        outline: none;
        box-shadow: 0 0 0 2px var(--focus-ring);
    }
`;

const MobileMenuButton = styled(ActionButton)`
    display: none;
    
    @media (max-width: 825px) {
        display: flex;
    }
`;

const DrawerOverlay = styled.div<{ isOpen: boolean }>`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--bg-overlay);
    display: none;
    z-index: 99;
    opacity: ${(props) => props.isOpen ? "1" : "0"};
    pointer-events: ${(props) => props.isOpen ? "auto" : "none"};
    transition: opacity 0.3s ease;
    
    @media (max-width: 825px) {
        display: block;
    }
`;

const DrawerMenu = styled.div<{ isOpen: boolean }>`
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    width: 250px;
    background-color: var(--bg-navbar-dark);
    box-shadow: var(--shadow-drawer);
    z-index: 100;
    transform: translateX(${(props) => props.isOpen ? "0" : "-100%"});
    transition: transform 0.3s ease;
    overflow-y: auto;
    padding-top: 1rem;
    
    @media (min-width: 826px) {
        display: none;
    }
`;

const DrawerHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 1rem 1rem 1rem;
    border-bottom: 1px solid var(--border-color-light);
`;

const DrawerLogoStyle = styled.img`
    height: 32px;
    transition: opacity 0.2s ease;
    
    &:hover {
        opacity: 0.8;
    }
`;

const DrawerNav = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 1rem;
`;

const DrawerElementStyle = styled.div<{ isActive?: boolean }>`
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem 1rem;
    cursor: pointer;
    border-radius: 6px;
    transition: background-color 0.2s ease, color 0.2s ease;
    color: ${(props) => props.isActive ? "var(--primary-text)" : "var(--text-primary)"};
    background-color: ${(props) => props.isActive ? "var(--bg-card)" : "transparent"};
    font-weight: ${(props) => props.isActive ? "600" : "400"};
    
    &:hover {
        background-color: ${(props) => props.isActive ? "var(--bg-navbar-item-hover)" : "var(--bg-hover)"};
        color: ${(props) => props.isActive ? "var(--primary-text)" : "var(--text-secondary)"};
    }
`;

const NavbarContainer = styled.div`
    width: 100%;
    box-sizing: border-box;
    padding: 0.5rem 1rem;
    
`;
const LogoContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex: 1;
`;


interface NavbarProps {
    name: string;
    url: string;
    Icon: IconTypes;
}

export const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isDrawerOpen, setIsDrawerOpen] = createSignal(false);
    const t = useTranslate();
    const navbarElements = (): NavbarProps[] => [
        {
            name: t("navigation.hosts")!,
            url: "/dashboard/hosts",
            Icon: FiGlobe,
        },
        {
            name: t("navigation.tls")!,
            url: "/dashboard/tls",
            Icon: FiLock,
        },
        {
            name: t("navigation.outposts")!,
            url: "/dashboard/outposts",
            Icon: FiServer,
        },
        {
            name: t("navigation.settings")!,
            url: "/dashboard/settings",
            Icon: FiSettings,
        }, 
    ];

    const handleNavigation = (url: string) => {
        navigate(url);
        setIsDrawerOpen(false);
    };

    const isActive = (url: string) => {
        return location.pathname === url;
    };

    const handleLogout = () => {
        // Add your logout logic here
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <NavbarContainer>
            <NavbarBase>
                <LogoContainer>
                    <LogoBase 
                        src={Logo} 
                        alt="Radiance Logo"
                        onClick={() => navigate("/dashboard")}
                    />
                </LogoContainer>
                <NavElementsDesktop>
                    <For each={navbarElements()}>
                    {({ name, url, Icon }) => (
                        <NavbarItem 
                            onClick={() => handleNavigation(url)}
                            isActive={isActive(url)}
                        >
                            <Icon size={20} />
                            <span>{name}</span>
                        </NavbarItem>
                    )}
                    </For>
                </NavElementsDesktop>
                <RightActions>
                    <ActionButton onClick={handleLogout} title="Logout">
                        <FiLogOut size={20} />
                    </ActionButton>

                    <MobileMenuButton 
                        onClick={() => setIsDrawerOpen(!isDrawerOpen())}
                        title="Toggle menu"
                    >
                        {isDrawerOpen() ? <FiX size={24} /> : <FiMenu size={24} />}
                    </MobileMenuButton>
                </RightActions>
            </NavbarBase>
            <DrawerOverlay 
                isOpen={isDrawerOpen()} 
                onClick={() => setIsDrawerOpen(false)}
            />
            <DrawerMenu isOpen={isDrawerOpen()}>
                <DrawerHeader>
                    <DrawerLogoStyle 
                        src={Logo} 
                        alt="Radiance Logo"
                        onClick={() => {
                            navigate("/dashboard");
                            setIsDrawerOpen(false);
                        }}
                    />
                    <ActionButton 
                        onClick={() => setIsDrawerOpen(false)}
                        title="Close menu"
                    >
                        <FiX size={24} />
                    </ActionButton>
                </DrawerHeader>
                <DrawerNav>
                    <For each={navbarElements()}>
                        {({ name, url, Icon }) => (
                        <DrawerElementStyle 
                            onClick={() => handleNavigation(url)}
                            isActive={isActive(url)}
                        >
                            <Icon size={20} />
                            <span>{name}</span>
                        </DrawerElementStyle>
                    )}
                    </For>
                </DrawerNav>
            </DrawerMenu>
        </NavbarContainer>
    )
}