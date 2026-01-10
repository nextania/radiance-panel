import { FiActivity, FiGlobe, FiMoreVertical, FiShield } from "solid-icons/fi";
import { styled } from "solid-styled-components";
import { useTranslate } from "../i18n";

const HostContainer = styled.div`
    display: flex;
    padding: 0.5rem;
    border: 1px solid var(--border-color-alt);
    border-radius: 8px;
    background: var(--bg-overlay);
    box-shadow: var(--shadow-md);
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
    background-color: var(--primary-color);
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
        props.type === "enabled" ? "var(--success-dark)" :
        props.type === "disabled" ? "var(--error-dark)" :
        "var(--info-dark)"};
    
    border: 1px solid ${(props) =>
        props.type === "enabled" ? "var(--success-color)" :
        props.type === "disabled" ? "var(--error-color)" :
        "var(--info-color)"};
    color: ${(props) =>
        props.type === "enabled" ? "var(--success-color)" :
        props.type === "disabled" ? "var(--error-color)" :
        "var(--info-color)"};
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
    color: var(--text-tertiary);
    transition: background-color 0.2s ease;
    &:hover {
        background-color: var(--bg-hover-dark);
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