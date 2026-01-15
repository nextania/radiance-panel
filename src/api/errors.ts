export type ServerError = 
    | "DATABASE_ERROR"
    | "MISSING_TOKEN"
    | "INVALID_TOKEN"
    | "CREDENTIAL_ERROR"
    | "PASSWORD_NOT_CONFIGURED"
    | "OIDC_NOT_CONFIGURED"
    | "OIDC_CONFIGURATION_ERROR"
    | "OIDC_SERVER_ERROR"
    | "RATE_LIMITED"
    | "CONTROL_SOCKET_ERROR"
    | "HOST_NOT_FOUND"
    | "HOST_ALREADY_EXISTS"
    | "CERTIFICATE_NOT_FOUND"
    | "CERTIFICATE_ALREADY_EXISTS"
    | "INVALID_CERTIFICATE"
    | "FAILED_TO_RELOAD"
    | "FAILED_TO_SAVE"
    | "MALFORMED_COMMAND";
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
    | "errors.unknownError"
    | "errors.hostNotFound"
    | "errors.hostAlreadyExists"
    | "errors.certificateNotFound"
    | "errors.certificateAlreadyExists"
    | "errors.invalidCertificate";


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
        case "CONTROL_SOCKET_ERROR":
            return "errors.serverError";
        case "HOST_NOT_FOUND":
            return "errors.hostNotFound";
        case "HOST_ALREADY_EXISTS":
            return "errors.hostAlreadyExists";
        case "CERTIFICATE_NOT_FOUND":
            return "errors.certificateNotFound";
        case "CERTIFICATE_ALREADY_EXISTS":
            return "errors.certificateAlreadyExists";
        case "INVALID_CERTIFICATE":
            return "errors.invalidCertificate";
        case "FAILED_TO_RELOAD":
            return "errors.serverError";
        case "FAILED_TO_SAVE":
            return "errors.serverError";
        case "MALFORMED_COMMAND":
            return "errors.serverError";
    }
};
