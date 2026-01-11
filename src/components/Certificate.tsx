import { FiMoreVertical, FiShield, FiClock, FiCheckCircle, FiAlertTriangle } from "solid-icons/fi";
import { createSignal } from "solid-js";
import { useTranslate } from "../i18n";
import { Menu, MenuItem, MenuDivider } from "./Menu";
import { Dialog } from "./Dialog";
import { ActionButton, CardActions, CardBadge, CardContainer, CardDetails, CardIcon, CardName } from "./Card";

interface CertificateProps {
    domain: string;
    status: "valid" | "expiring" | "expired";
    expiresIn?: string;
}

const Certificate = (props: CertificateProps) => {
    const t = useTranslate();
    const [deleteDialogOpen, setDeleteDialogOpen] = createSignal(false);
    
    const statusIcon = () => {
        switch (props.status) {
            case "valid":
                return <FiCheckCircle />;
            case "expiring":
                return <FiClock />;
            case "expired":
                return <FiAlertTriangle />;
        }
    };
    
    const statusText = () => {
        switch (props.status) {
            case "valid":
                return t("tls.valid");
            case "expiring":
                return t("tls.expiring");
            case "expired":
                return t("tls.expired");
        }
    };
    
    return (
        <CardContainer>
            <CardDetails>
                <CardIcon> <FiShield /> </CardIcon>
                <CardName>{props.domain}</CardName>
                <CardBadge type={props.status === "valid" ? "success" : props.status === "expiring" ? "warning" : "error"}> 
                    {statusIcon()} 
                    {statusText()}
                </CardBadge>
                {props.expiresIn && <CardBadge type="success"> <FiClock /> {props.expiresIn}</CardBadge>}
            </CardDetails>
            <CardActions>
                <Menu trigger={<ActionButton> <FiMoreVertical /></ActionButton>}>
                    <MenuItem>View details</MenuItem>
                    <MenuItem>Renew</MenuItem>
                    <MenuItem>Download</MenuItem>
                    <MenuDivider />
                    <MenuItem destructive onClick={() => setDeleteDialogOpen(true)}>{t("generic.delete")}</MenuItem>
                </Menu>
            </CardActions>
            <Dialog
                open={deleteDialogOpen()}
                onOpenChange={setDeleteDialogOpen}
                title="Delete certificate"
                description={`Are you sure you want to delete the certificate for "${props.domain}"? This action cannot be undone.`}
                confirmLabel="Delete"
                cancelLabel="Cancel"
                destructive
                onConfirm={() => console.log("Deleting certificate:", props.domain)}
            />
        </CardContainer>
    )
};

export default Certificate;
