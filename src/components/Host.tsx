import { FiActivity, FiGlobe, FiMoreVertical, FiShield } from "solid-icons/fi";
import { createSignal } from "solid-js";
import { useTranslate } from "../i18n";
import { Menu, MenuItem, MenuDivider } from "./Menu";
import { Dialog } from "./Dialog";
import { EditHostDialog } from "./EditHostDialog";
import { ActionButton, CardActions, CardBadge, CardContainer, CardDetails, CardIcon, CardName } from "./Card";

interface HostProps {
    enabled: boolean;
    hostnames: string[];
    certificate?: string;
}

const Host = (props: HostProps) => {
    const t = useTranslate();
    const [deleteDialogOpen, setDeleteDialogOpen] = createSignal(false);
    const [editDialogOpen, setEditDialogOpen] = createSignal(false);
    
    return (
        <CardContainer>
            <CardDetails>
                <CardIcon> <FiGlobe /> </CardIcon>
                <CardName>{props.hostnames[0] || "Unknown"}</CardName>
                <CardBadge type={props.enabled ? "success" : "error"}> <FiActivity /> {props.enabled ? t("generic.enabled") : t("generic.disabled")}</CardBadge>
                {props.certificate && <CardBadge type="info"> <FiShield /> TLS</CardBadge>}
            </CardDetails>
            <CardActions>
                <Menu trigger={<ActionButton> <FiMoreVertical /></ActionButton>}>
                    <MenuItem onClick={() => setEditDialogOpen(true)}>{t("generic.edit")}</MenuItem>
                    <MenuItem>{t("generic.duplicate")}</MenuItem>
                    <MenuDivider />
                    <MenuItem>{props.enabled ? t("generic.disable") : t("generic.enable")}</MenuItem>
                    <MenuItem destructive onClick={() => setDeleteDialogOpen(true)}>{t("generic.delete")}</MenuItem>
                </Menu>
            </CardActions>
            <EditHostDialog
                open={editDialogOpen()}
                onOpenChange={setEditDialogOpen}
                hostnames={props.hostnames}
                enabled={props.enabled}
                certificate={props.certificate}
                onSave={(data) => console.log("Saving host:", data)}
            />
            <Dialog
                open={deleteDialogOpen()}
                onOpenChange={setDeleteDialogOpen}
                title="Delete host"
                description={`Are you sure you want to delete "${props.hostnames[0] || "Unknown"}"? This action cannot be undone.`}
                confirmLabel="Delete"
                cancelLabel="Cancel"
                destructive
                onConfirm={() => console.log("Deleting host:", props.hostnames[0] || "Unknown")}
            />
        </CardContainer>
    )
};

export default Host;