export type ServerError = 
    | "DATABASE_ERROR"
    | "MISSING_TOKEN"
    | "INVALID_TOKEN"
    | "CREDENTIAL_ERROR"
    | "PASSWORD_NOT_CONFIGURED"
    | "OIDC_NOT_CONFIGURED"
    | "OIDC_CONFIGURATION_ERROR"
    | "OIDC_SERVER_ERROR"
    | "RATE_LIMITED";
export type RequestError = 
    | "INVALID_RESPONSE"
    | "TIMED_OUT"
    | "UNKNOWN_ERROR";

export type RenderableError =
    | "errors.serverError"
    | "errors.sessionExpired"
    | "errors.invalidCredentials"
    | "errors.rateLimited"
    | "errors.timedOut"
    | "errors.unknownError";


export const intoRenderableError = (error: ServerError | RequestError): RenderableError => {
    switch (error) {
        case "DATABASE_ERROR":
            return "errors.serverError";
        case "MISSING_TOKEN":
            return "errors.serverError";
        case "INVALID_TOKEN":
            return "errors.sessionExpired";
        case "CREDENTIAL_ERROR":
            return "errors.invalidCredentials";
        case "PASSWORD_NOT_CONFIGURED":
            return "errors.serverError";
        case "OIDC_NOT_CONFIGURED":
            return "errors.serverError";
        case "OIDC_CONFIGURATION_ERROR":
            return "errors.serverError";
        case "OIDC_SERVER_ERROR":
            return "errors.serverError";
        case "INVALID_RESPONSE":
            return "errors.serverError";
        case "RATE_LIMITED":
            return "errors.rateLimited";
        case "TIMED_OUT":
            return "errors.timedOut";
        case "UNKNOWN_ERROR":
            return "errors.serverError";
    }
};
