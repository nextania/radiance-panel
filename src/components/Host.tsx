import { FiActivity, FiGlobe, FiMonitor, FiMoreVertical, FiShield } from "solid-icons/fi";
import { styled } from "solid-styled-components";
import { useTranslate } from "../i18n";

const HostContainer = styled.div`
    display: flex;
    padding: 0.5rem;
    border: 1px solid var(--border-color, #555);
    border-radius: 8px;
    background: rgba(0,0,0,0.5);
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
`;

const HostDetails = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
    flex: 1;
`;
const HostIcon = styled.div`
    width: 40px;
    height: 40px;
    background-color: oklch(.558 .288 302.321);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
`;
const HostName = styled.div`

    font-size: 1rem;
    font-weight: 500;
    color: white;
`;
const HostBadge = styled.div<{ type: "enabled" | "disabled" | "tls" }>`
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    font-size: 0.875rem;
    font-weight: 500;
    background-color: ${(props) =>
        props.type === "enabled" ? "var(--success-dark, #072a1a)" :
        props.type === "disabled" ? "var(--error-dark, #4d0e14)" :
        "var(--info-dark, #0a234e)"};
    
    border: 1px solid ${(props) =>
        props.type === "enabled" ? "var(--success-color, #2ebd6c)" :
        props.type === "disabled" ? "var(--error-color, #ff5263)" :
        "var(--info-color, #57a2fe)"};
    color: ${(props) =>
        props.type === "enabled" ? "var(--success-color, #2ebd6c)" :
        props.type === "disabled" ? "var(--error-color, #ff5263)" :
        "var(--info-color, #57a2fe)"};
    display: flex;
    align-items: center;
    gap: 0.25rem;
`;
const HostActions = styled.div`
    display: flex;
    gap: 0.5rem;
`;
const ActionButton = styled.button`
    background: none;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.25rem;
    border-radius: 4px;
    color: var(--text-color, #ccc);
    transition: background-color 0.2s ease;
    &:hover {
        background-color: var(--hover-bg, #00000077);
    }
    font-size: 1.25rem;
`;

interface HostProps {
    enabled: boolean;
    hostname: string;
    tls: boolean;
}

const Host = (props: HostProps) => {
    const t = useTranslate();
    return (
        <HostContainer>
            <HostDetails>
                <HostIcon> <FiGlobe /> </HostIcon>
                <HostName>{props.hostname}</HostName>
                <HostBadge type={props.enabled ? "enabled" : "disabled"}> <FiActivity /> {props.enabled ? t("hosts.enabled") : t("hosts.disabled")}</HostBadge>
                {props.tls && <HostBadge type="tls"> <FiShield /> TLS</HostBadge>}
            </HostDetails>
            <HostActions>
                {/* <ActionButton>Edit</ActionButton>
                <ActionButton>Delete</ActionButton> */}
                <ActionButton> <FiMoreVertical /></ActionButton>
            </HostActions>
        </HostContainer>
    )
};

export default Host;