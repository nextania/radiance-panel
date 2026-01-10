import { styled } from "solid-styled-components";
import Toggle from "./Toggle";
import { Button } from "./Button";
import type { Component } from "solid-js";

const SettingContainer = styled.div`
    display: flex;
    padding: 0.75rem;
    border: 1px solid var(--border-color);
    border-radius: 8px;
    background: var(--bg-overlay);
    box-shadow: var(--shadow-md);
`;

type SelectSettingProps<T extends string> = {
    type: "select",
    label: string,
    description?: string,
    options: { value: T, label: string }[],
    value: T,
    onChange: (value: T) => void,
};

type ToggleSettingProps = {
    type: "toggle",
    label: string,
    description?: string,
    value: boolean,
    onChange: (value: boolean) => void,
};

type ButtonSettingProps = {
    type: "button",
    label: string,
    description?: string,
    buttonLabel: string,
    Icon?: Component,
    onClick: () => void,
};

const SettingDetails = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    margin-left: 0.75rem;
`;

const SettingAction = styled.div`
    display: flex;
    align-items: center;
`;

const SettingLabel = styled.div`
    font-size: 1rem;
    font-weight: 500;
    color: white;
`;

const SettingDescription = styled.div`
    font-size: 0.875rem;
    color: var(--text-secondary);
`;

type SettingProps<T extends string> = SelectSettingProps<T> | ToggleSettingProps | ButtonSettingProps;

const Setting = <T extends SettingProps<U>, U extends string = string>(props: T) => {
    return (
        <SettingContainer>
            <SettingDetails>
                <SettingLabel>{props.label}</SettingLabel>
                {props.description && <SettingDescription>{props.description}</SettingDescription>}
            </SettingDetails>
            <SettingAction>
                {props.type === "select" ? (
                    <select
                        value={props.value}
                        onChange={(e) => props.onChange(e.currentTarget.value as U)}
                    />
                ) : props.type === "toggle" ? (
                    <Toggle
                        checked={() => props.value}
                        setChecked={() => {}}
                        onChange={(e) => props.onChange(e.currentTarget.checked)}
                    />
                ) : props.type === "button" ? (
                    <Button onClick={props.onClick} text={props.buttonLabel} Icon={props.Icon}></Button>
                ) : null}
            </SettingAction>
        </SettingContainer>
    )
};

export default Setting;