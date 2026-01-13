import { callEndpoint, type Host } from "./routes";
import { ulid } from "ulid";

export interface OidcProviderInfo {
    id: string;
    displayName: string;
    logoPath: string;
    authPath: string;
}

export interface Capabilities {
    version: string;
    oidcProviders: OidcProviderInfo[];
    passwordAuthentication: boolean;
}

export class Client {
    private token: string;

    private constructor(token: string) {
        this.token = token;
    }
    static async authenticate(password: string) {
        const session = await callEndpoint("PASSWORD_LOGIN", { password });
        return new Client(session.token);
    }
    static async getCapabilities(): Promise<Capabilities> {
        return await callEndpoint("CAPABILITIES", undefined);
    }
    async getHosts(): Promise<Record<string, Host>> {
        return (await callEndpoint("GET_HOSTS", undefined, this.token)).data;
    }
    async getHost(id: string): Promise<Host | null> {
        return (await callEndpoint("GET_HOST", undefined, this.token, { id })).data;
    }
    async createHost(host: Host): Promise<void> {
        await callEndpoint("ADD_HOST", { config: host, id: ulid() }, this.token);
    }
    async updateHost(id: string, host: Partial<Host>): Promise<void> {
        await callEndpoint("UPDATE_HOST", { config: host }, this.token, { id });
    }
    async deleteHost(id: string): Promise<void> {
        await callEndpoint("DELETE_HOST", undefined, this.token, { id });
    }
    async hotReload(): Promise<void> {
        await callEndpoint("HOT_RELOAD", undefined, this.token);
    }

}