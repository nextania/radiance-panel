import { Navigate } from "@solidjs/router";

const Authenticate = () => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const continueUrl = params.get("continue") || "/dashboard";
    if (token) {
        localStorage.setItem("token", token);
        return <Navigate href={continueUrl} />;
    } else {
        let newContinueUrl = "/login?continue=" + encodeURIComponent(continueUrl);
        return <Navigate href={newContinueUrl} />;
    }
};

export default Authenticate;
