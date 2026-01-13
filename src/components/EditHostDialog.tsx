import CorvuDialog from "corvu/dialog";
import { styled } from "solid-styled-components";
import { createSignal, For } from "solid-js";
import { Input } from "./Input";
import Toggle from "./Toggle";
import Select from "./Select";
import { useTranslate } from "../i18n";
import { FiPlus, FiX } from "solid-icons/fi";
import { Actions, Content, Description, DialogButton, Overlay, Title } from "./Dialog";

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const FormField = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`;

const Label = styled.label`
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--text-primary);
`;

const ToggleField = styled.div`
    display: flex;
    align-items: center;
    gap: 0.75rem;
`;

const HostnameList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`;

const HostnameRow = styled.div`
    display: flex;
    gap: 0.5rem;
    align-items: center;
`;

const RemoveButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem;
    background: transparent;
    border: 1px solid var(--border-color);
    border-radius: 0.5rem;
    color: var(--text-secondary);
    transition: all 0.2s ease;
    flex-shrink: 0;
    
    &:hover {
        background: var(--error-dark);
        border-color: var(--error-border);
        color: var(--error-color);
    }
    
    &:focus-visible {
        outline: none;
        box-shadow: 0 0 0 2px var(--focus-ring);
    }
`;

const AddButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    background: transparent;
    border: 1px dashed var(--border-color);
    border-radius: 0.5rem;
    color: var(--text-secondary);
    font-size: 0.875rem;
    transition: all 0.2s ease;
    width: 100%;
    
    &:hover {
        border-color: var(--primary-color);
        color: var(--primary-color);
        background: var(--bg-hover);
    }
    
    &:focus-visible {
        outline: none;
        box-shadow: 0 0 0 2px var(--focus-ring);
    }
`;


interface EditHostDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    hostname: string;
    enabled: boolean;
    tls: boolean;
    certificate?: string;
    onSave?: (data: { hostnames: string[]; enabled: boolean; certificate?: string }) => void;
}

export const EditHostDialog = (props: EditHostDialogProps) => {
    const t = useTranslate();
    const [hostnames, setHostnames] = createSignal<string[]>([props.hostname]);
    const [enabled, setEnabled] = createSignal(props.enabled);
    const [certificate, setCertificate] = createSignal(props.certificate || "");

    // TODO: replace dummy data
    const certificateOptions = () => [
        { value: "", label: t("hosts.noCertificate")! },
        { value: "cert-1", label: "example.com" },
        { value: "cert-2", label: "*.example.com" },
        { value: "cert-3", label: "mail.example.com" },
    ];

    const addHostname = () => {
        setHostnames([...hostnames(), ""]);
    };

    const removeHostname = (index: number) => {
        setHostnames(hostnames().filter((_, i) => i !== index));
    };

    const updateHostname = (index: number, value: string) => {
        const updated = [...hostnames()];
        updated[index] = value;
        setHostnames(updated);
    };

    const handleSubmit = (e: Event) => {
        e.preventDefault();
        const validHostnames = hostnames().filter(h => h.trim() !== "");
        if (validHostnames.length === 0) return;
        
        props.onSave?.({
            hostnames: validHostnames,
            enabled: enabled(),
            certificate: certificate() || undefined
        });
        props.onOpenChange(false);
    };

    return (
        <CorvuDialog open={props.open} onOpenChange={props.onOpenChange}>
            <CorvuDialog.Portal>
                <Overlay />
                <Content>
                    <Title>{t("hosts.editHost")}</Title>
                    <Description>{t("hosts.editHostDescription")}</Description>
                    <Form onSubmit={handleSubmit}>
                        <FormField>
                            <Label>{t("hosts.hostnames")}</Label>
                            <HostnameList>
                                <For each={hostnames()}>
                                    {(hostname, index) => (
                                        <HostnameRow>
                                            <Input
                                                type="text"
                                                value={hostname}
                                                onInput={(e) => updateHostname(index(), e.currentTarget.value)}
                                                placeholder="example.com"
                                                required
                                            />
                                            {hostnames().length > 1 && (
                                                <RemoveButton
                                                    type="button"
                                                    onClick={() => removeHostname(index())}
                                                    title={t("hosts.removeHostname")}
                                                >
                                                    <FiX size={18} />
                                                </RemoveButton>
                                            )}
                                        </HostnameRow>
                                    )}
                                </For>
                                <AddButton type="button" onClick={addHostname}>
                                    <FiPlus size={16} />
                                    {t("hosts.addHostname")}
                                </AddButton>
                            </HostnameList>
                        </FormField>
                        
                        <ToggleField>
                            <Toggle
                                checked={enabled}
                                setChecked={setEnabled}
                            />
                            <Label for="enabled">{t("generic.enabled")}</Label>
                        </ToggleField>

                        <FormField>
                            <Label for="certificate">{t("hosts.certificate")}</Label>
                            <Select
                                options={certificateOptions()}
                                value={certificate}
                                onChange={setCertificate}
                            />
                        </FormField>
                        
                        <Actions>
                            <CorvuDialog.Close as="div">
                                <DialogButton type="button" variant="secondary">
                                    {t("generic.cancel")}
                                </DialogButton>
                            </CorvuDialog.Close>
                            <DialogButton type="submit" variant="primary">
                                {t("generic.save")}
                            </DialogButton>
                        </Actions>
                    </Form>
                </Content>
            </CorvuDialog.Portal>
        </CorvuDialog>
    );
};

export default EditHostDialog;
