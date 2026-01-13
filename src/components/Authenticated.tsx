import { createResource, ErrorBoundary, Show, type ParentProps } from "solid-js";
import { Navigate } from "@solidjs/router";
import { Client } from "../api";
import { ClientContext } from "../context";
import { useTranslate } from "../i18n";

const Authenticated = (props: ParentProps) => {
    const t = useTranslate();
    const [client] = createResource(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            throw new Error("INVALID_TOKEN");
        }
        return Client.validate(token);
    });
    return (
        <ErrorBoundary fallback={
            <Navigate href={"/login?continue=" + encodeURIComponent(location.pathname)} />
        }>
            <Show when={client()} fallback={<div>{t("generic.loading")}</div>}>
                <ClientContext.Provider value={client()}>
                    {props.children}
                </ClientContext.Provider>
            </Show>
        </ErrorBoundary>
    )
};

export default Authenticated;
