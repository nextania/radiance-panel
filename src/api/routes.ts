import { object, string, literal, boolean, optional, type Infer, is, Struct, nullable, union, array, partial, number, map, record } from "superstruct";
import type { ServerError } from "./errors";

const host = object({
    domains: array(string()),
    enabled: boolean(),
    tls_cert_id: optional(string()),
    upstream: object({
        tls: boolean(),
        servers: array(union([
            object({
                type: literal("local"),
                address: string(),
            }),
            object({
                type: literal("outpost"),
                id: string(),
                address: string(),
            })
        ])),
        path: string(),
    }),
    header_rewrites: optional(map(string(), string())),
    upgrade_https: optional(boolean()),
    forward_auth: optional(object({
        url: string(),
        response_headers: optional(array(string())),
    })),
});

export type Host = Infer<typeof host>;

const certificate = union([object({
    type: literal("local"),
    id: string(),
    cert_file: string(),
    key_file: string(),
}), object({
    type: literal("vault"),
    id: string(),
    vault_path: string(),
})]);

export type Certificate = Infer<typeof certificate>;

const routes = {
    PASSWORD_LOGIN: {
        route: "/api/session",
        method: "POST" as const,
        types: {
            request: object({
                password: string(),
            }),
            response: object({
                token: string(),
                expiresAt: number(),
            }),
        }
    },
    VALIDATE_TOKEN: {
        route: "/api/session",
        method: "GET" as const,
        types: {
            request: undefined,
            response: object({
                expiresAt: number(),
            }),
        }
    },
    CAPABILITIES: {
        route: "/api",
        method: "GET" as const,
        types: {
            request: undefined,
            response: object({
                version: string(),
                oidcProviders: array(object({
                    id: string(),
                    displayName: string(),
                    logoPath: string(),

                    authPath: string(),
                })),
                passwordAuthentication: boolean(),
            }),
        }
    },
    LOGOUT: {
        route: "/api/session",
        method: "DELETE" as const,
        types: {
            request: undefined,
            response: object({}),
        }
    },
    GET_HOSTS: {
        route: "/api/hosts",
        method: "GET" as const,
        types: {
            request: undefined,
            response: object({
                data: record(string(), host),
                message: string(),
            }),
        }
    },
    GET_HOST: {
        route: "/api/hosts/{id}",
        method: "GET" as const,
        types: {
            request: undefined,
            response: object({
                data: nullable(host),
                message: string(),
            }),
        }
    },
    ADD_HOST: {
        route: "/api/hosts",
        method: "POST" as const,
        types: {
            request: object({
                id: string(),
                config: host,
            }),
            response: object({
                data: literal(null),
                message: string(),
            }),
        }
    },
    DELETE_HOST: {
        route: "/api/hosts/{id}",
        method: "DELETE" as const,
        types: {
            request: undefined,
            response: object({
                data: literal(null),
                message: string(),
            }),
        }
    },
    UPDATE_HOST: {
        route: "/api/hosts/{id}",
        method: "PUT" as const,
        types: {
            request: object({
                config: partial(host),
            }),
            response: object({
                data: literal(null),
                message: string(),
            }),
        }
    },
    HOT_RELOAD: {
        route: "/api/reload",
        method: "POST" as const,
        types: {
            request: undefined,
            response: object({
                data: literal(null),
                message: string(),
            }),
        }
    },
    GET_CERTIFICATES: {
        route: "/api/certificates",
        method: "GET" as const,
        types: {
            request: undefined,
            response: object({
                data: array(certificate),
                message: string(),
            }),
        }
    },
    GET_CERTIFICATE: {
        route: "/api/certificates/{id}",
        method: "GET" as const,
        types: {
            request: undefined,
            response: object({
                data: nullable(certificate),
                message: string(),
            }),
        }
    },
    ADD_CERTIFICATE: {
        route: "/api/certificates",
        method: "POST" as const,
        types: {
            request: certificate,
            response: object({
                data: literal(null),
                message: string(),
            }),
        }
    },
    DELETE_CERTIFICATE: {
        route: "/api/certificates/{id}",
        method: "DELETE" as const,
        types: {
            request: undefined,
            response: object({
                data: literal(null),
                message: string(),
            }),
        }
    },
    // UPDATE_CERTIFICATE: {
    //     route: "/api/certificates/{id}",
    //     method: "PUT" as const,
    //     types: {
    //         request: object({
    //             cert: partial(certificate),
    //         }),
    //         response: object({
    //             data: literal(null),
    //             message: string(),
    //         }),
    //     }
    // },
}

type GenericResponse<T> = { error: ServerError } | T;
type InferUndefined<T> = T extends undefined ? undefined : T extends Struct<any, any> ? Infer<T> : never;
export type Route = keyof typeof routes;
export type Method<T extends Route> = typeof routes[T]["method"];
export type ApiRequest<T extends Route> = InferUndefined<typeof routes[T]["types"]["request"]>;
export type ApiResponse<T extends Route> = Infer<typeof routes[T]["types"]["response"]>;

export const callEndpoint = async <T extends Route>(
    route: T, 
    body: Method<T> extends "GET" ? undefined : ApiRequest<T>, 
    authorization?: string, 
    replace?: Record<string, string>
): Promise<ApiResponse<T>> => {
    let headers: Record<string, string> = {};
    if (routes[route].method !== "GET") headers["Content-Type"] = "application/json";
    if (authorization) headers["Authorization"] = authorization;
    let dynamicRoute = routes[route].route;
    if (replace) {
        dynamicRoute = Object.keys(replace).reduce((acc, val) => {
            return acc.replace(`{${val}}`, replace[val]);
        }, routes[route].route);
    }
    try {
        const response: GenericResponse<ApiResponse<T>> = await (Promise.race([fetch(dynamicRoute, {
            method: routes[route].method,
            headers,
            body: routes[route].method === "GET" ? undefined : JSON.stringify(body),
        }), new Promise((_, reject) => setTimeout(() => reject("TIMED_OUT"), 5000))]) as Promise<Response>).then(r => r.json());
        if ("error" in response) {
            throw response.error;
        }
        if (!is(response, routes[route].types.response as Struct)) {
            throw "INVALID_RESPONSE";
        }
        return response;
    } catch (e) {
        if (typeof e !== "string") {
            throw "UNKNOWN_ERROR";
        } else {
            throw e;
        }
    }
};