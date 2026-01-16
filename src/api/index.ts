import { callEndpoint, type Certificate, type CertificateInfo, type Host } from "./routes";
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
    private _token: string;

    private constructor(token: string) {
        this._token = token;
    }

    static async authenticate(password: string) {
        const session = await callEndpoint("PASSWORD_LOGIN", { password });
        return new Client(session.token);
    }
    static async validate(token: string) {
        await callEndpoint("VALIDATE_TOKEN", undefined, token);
        return new Client(token);
    }
    
    static async getCapabilities(): Promise<Capabilities> {
        return await callEndpoint("CAPABILITIES", undefined);
    }
    async getHosts(): Promise<Record<string, Host>> {
        return (await callEndpoint("GET_HOSTS", undefined, this._token));
    }
    async getHost(id: string): Promise<Host | null> {
        return (await callEndpoint("GET_HOST", undefined, this._token, { id }));
    }
    async createHost(host: Host): Promise<void> {
        await callEndpoint("ADD_HOST", { config: host, id: ulid() }, this._token);
    }
    async updateHost(id: string, host: Partial<Host>): Promise<void> {
        await callEndpoint("UPDATE_HOST", { config: host }, this._token, { id });
    }
    async deleteHost(id: string): Promise<void> {
        await callEndpoint("DELETE_HOST", undefined, this._token, { id });
    }
    async hotReload(): Promise<void> {
        await callEndpoint("HOT_RELOAD", undefined, this._token);
    }

    async getCertificates(): Promise<Record<string, CertificateInfo>> {
        return (await callEndpoint("GET_CERTIFICATES", undefined, this._token));
    }
    async getCertificate(id: string): Promise<CertificateInfo | null> {
        return (await callEndpoint("GET_CERTIFICATE", undefined, this._token, { id }));
    }
    async createCertificate(cert: Certificate): Promise<void> {
        await callEndpoint("ADD_CERTIFICATE", cert, this._token);
    }
    async deleteCertificate(id: string): Promise<void> {
        await callEndpoint("DELETE_CERTIFICATE", undefined, this._token, { id });
    }

    async destroy(): Promise<void> {
        await callEndpoint("LOGOUT", undefined, this._token);
    }

    get token(): string {
        return this._token;
    }
}