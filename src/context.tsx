import { createContext, useContext } from "solid-js";
import type { Locale } from "./i18n";
import type { SetStoreFunction, Store } from "solid-js/store";
import { Client } from "./api";

export interface Preferences {
    locale: Locale;
}

export const PreferencesContext = createContext<[Store<Preferences>, SetStoreFunction<Preferences>]>();

export const usePreferences = () => {
    const context = useContext(PreferencesContext);
    if (!context) {
        throw new Error("usePreferences must be used within a PreferencesProvider");
    }
    return context;
};

export const ClientContext = createContext<Client>();

export const useClient = () => {
    const context = useContext(ClientContext);
    if (!context) {
        throw new Error("useClient must be used within a ClientProvider");
    }
    return context;
};
