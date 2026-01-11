import { FiActivity, FiGlobe, FiMoreVertical, FiServer } from "solid-icons/fi";
import { createSignal } from "solid-js";
import { useTranslate } from "../i18n";
import { Menu, MenuItem, MenuDivider } from "./Menu";
import { Dialog } from "./Dialog";
import { ActionButton, CardActions, CardBadge, CardContainer, CardDetails, CardIcon, CardName } from "./Card";

interface OutpostProps {
    enabled: boolean;
    identifier: string;
    up: boolean;
}

const Outpost = (props: OutpostProps) => {
    const t = useTranslate();
    const [deleteDialogOpen, setDeleteDialogOpen] = createSignal(false);
    
    return (
        <CardContainer>
            <CardDetails>
                <CardIcon> <FiServer /> </CardIcon>
                <CardName>{props.identifier}</CardName>
                <CardBadge type={props.enabled ? "success" : "error"}> <FiActivity /> {props.enabled ? t("generic.enabled") : t("generic.disabled")}</CardBadge>
                {props.enabled && (props.up ? <CardBadge type="success"> <FiGlobe /> {t("outposts.online")}</CardBadge> : <CardBadge type="error"> <FiGlobe /> {t("outposts.offline")}</CardBadge>)}
            </CardDetails>
            <CardActions>
                <Menu trigger={<ActionButton> <FiMoreVertical /></ActionButton>}>
                    <MenuItem>{t("generic.edit")}</MenuItem>
                    <MenuDivider />
                    <MenuItem>{props.enabled ? t("generic.disable") : t("generic.enable")}</MenuItem>
                    <MenuItem destructive onClick={() => setDeleteDialogOpen(true)}>{t("generic.delete")}</MenuItem>
                </Menu>
            </CardActions>
            <Dialog
                open={deleteDialogOpen()}
                onOpenChange={setDeleteDialogOpen}
                title="Delete outpost"
                description={`Are you sure you want to delete "${props.identifier}"? This action cannot be undone.`}
                confirmLabel="Delete"
                cancelLabel="Cancel"
                destructive
                onConfirm={() => console.log("Deleting outpost:", props.identifier)}
            />
        </CardContainer>
    )
};

export default Outpost;