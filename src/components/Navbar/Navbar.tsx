import type { IconTypes } from "solid-icons";
import { FiGlobe, FiLock, FiLogOut, FiMoon, FiSettings, FiMenu, FiX } from "solid-icons/fi";
import { styled } from "solid-styled-components"
import Logo from "../../assets/radiance.svg";
import { useNavigate, useLocation } from "@solidjs/router";
import { createSignal } from "solid-js";

const Navbarstyle = styled.nav`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 1rem;
    background-color: var(--navbar-bg, #ffffff);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    gap: 1rem;
    box-sizing: border-box;
    border-radius: 12px;
    margin: 0.75rem 0;
`;

const LogoStyle = styled.img`
    height: 40px;
    cursor: pointer;
    transition: opacity 0.2s ease;
    
    &:hover {
        opacity: 0.8;
    }
`;

const NavElementsDesktop = styled.div`
    display: flex;
    align-items: center;
    gap: 2rem;
    
    @media (max-width: 768px) {
        display: none;
    }
`;

const NavElementStyle = styled.div<{ isActive?: boolean }>`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    cursor: pointer;
    border-radius: 6px;
    transition: background-color 0.2s ease, color 0.2s ease;
    color: ${(props) => props.isActive ? "var(--primary-color, #0066cc)" : "var(--text-color, #333)"};
    background-color: ${(props) => props.isActive ? "var(--primary-light, #e6f0ff)" : "transparent"};
    font-weight: ${(props) => props.isActive ? "600" : "400"};
    
    &:hover {
        background-color: var(--hover-bg, #f0f0f0);
    }
`;

const RightActions = styled.div`
    display: flex;
    align-items: center;
    gap: 1.5rem;
`;

const ActionButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    padding: 0.5rem;
    border-radius: 6px;
    transition: background-color 0.2s ease;
    color: var(--text-color, #333);
    
    &:hover {
        background-color: var(--hover-bg, #f0f0f0);
    }
`;

const MobileMenuButton = styled(ActionButton)`
    display: none;
    
    @media (max-width: 768px) {
        display: flex;
    }
`;

const DrawerOverlay = styled.div<{ isOpen: boolean }>`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: none;
    z-index: 99;
    opacity: ${(props) => props.isOpen ? "1" : "0"};
    pointer-events: ${(props) => props.isOpen ? "auto" : "none"};
    transition: opacity 0.3s ease;
    
    @media (max-width: 768px) {
        display: block;
    }
`;

const DrawerMenu = styled.div<{ isOpen: boolean }>`
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    width: 250px;
    background-color: var(--navbar-bg, #ffffff);
    box-shadow: 2px 0 8px rgba(0, 0, 0, 0.15);
    z-index: 100;
    transform: translateX(${(props) => props.isOpen ? "0" : "-100%"});
    transition: transform 0.3s ease;
    overflow-y: auto;
    padding-top: 1rem;
    
    @media (min-width: 769px) {
        display: none;
    }
`;

const DrawerHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 1rem 1rem 1rem;
    border-bottom: 1px solid var(--border-color, #e0e0e0);
`;

const DrawerLogoStyle = styled.img`
    height: 32px;
    cursor: pointer;
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
    color: ${(props) => props.isActive ? "var(--primary-color, #0066cc)" : "var(--text-color, #333)"};
    background-color: ${(props) => props.isActive ? "var(--primary-light, #e6f0ff)" : "transparent"};
    font-weight: ${(props) => props.isActive ? "600" : "400"};
    
    &:hover {
        background-color: var(--hover-bg, #f0f0f0);
    }
`;

const navbarElements: NavbarProps[] = [
    {
        name: "Hosts",
        url: "/hosts",
        Icon: FiGlobe,
    },
    {
        name: "TLS Certificates",
        url: "/tls",
        Icon: FiLock,
    },
    {
        name: "Settings",
        url: "/settings",
        Icon: FiSettings,
    }
]

interface NavbarProps {
    name: string;
    url: string;
    Icon: IconTypes;
}

export const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isDrawerOpen, setIsDrawerOpen] = createSignal(false);

    const handleNavigation = (url: string) => {
        navigate(url);
        setIsDrawerOpen(false);
    };

    const isActive = (url: string) => {
        return location.pathname === url;
    };

    const toggleTheme = () => {
        const html = document.documentElement;
        const isDark = html.getAttribute("data-theme") === "dark";
        html.setAttribute("data-theme", isDark ? "light" : "dark");
        localStorage.setItem("theme", isDark ? "light" : "dark");
    };

    const handleLogout = () => {
        // Add your logout logic here
        localStorage.removeItem("authToken");
        navigate("/login");
    };

    return (
        <>
            <Navbarstyle>
                <LogoStyle 
                    src={Logo} 
                    alt="Radiance Logo"
                    onClick={() => navigate("/")}
                />
                <NavElementsDesktop>
                    {navbarElements.map(({ name, url, Icon }) => (
                        <NavElementStyle 
                            onClick={() => handleNavigation(url)}
                            isActive={isActive(url)}
                        >
                            <Icon size={20} />
                            <span>{name}</span>
                        </NavElementStyle>
                    ))}
                </NavElementsDesktop>
                <RightActions>
                    <ActionButton onClick={toggleTheme} title="Toggle theme">
                        <FiMoon size={20} />
                    </ActionButton>
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
            </Navbarstyle>
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
                            navigate("/");
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
                    {navbarElements.map(({ name, url, Icon }) => (
                        <DrawerElementStyle 
                            onClick={() => handleNavigation(url)}
                            isActive={isActive(url)}
                        >
                            <Icon size={20} />
                            <span>{name}</span>
                        </DrawerElementStyle>
                    ))}
                </DrawerNav>
            </DrawerMenu>
        </>
    )
}