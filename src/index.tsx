/* @refresh reload */
import { render } from "solid-js/web";
import "./index.css";
import App from "./App.tsx";
import { Navigate, Route, Router } from "@solidjs/router";
import Hosts from "./pages/Hosts.tsx";
import NotFound from "./pages/NotFound.tsx";
import Login from "./pages/Login.tsx";
import Tls from "./pages/Tls.tsx";
import Outposts from "./pages/Outposts.tsx";
import Settings from "./pages/Settings.tsx";
import { PreferencesContext } from "./context.tsx";
import Overview from "./pages/Overview.tsx";
import { createStore } from "solid-js/store";
import type { Locale } from "./i18n/index.ts";
import Root from "./pages/Root.tsx";

const root = document.getElementById("root");

render(() => {
    const preferences = createStore({ locale: localStorage.getItem("locale") as Locale || "en" });
    return (
        <PreferencesContext.Provider value={preferences}>
            <Router>
                <Route path="/dashboard" component={App}>
                    <Route path="/" component={() => <Navigate href="/dashboard/overview" />} />
                    <Route path="/overview" component={Overview} />
                    <Route path="/hosts" component={Hosts} />
                    <Route path="/tls" component={Tls} />
                    <Route path="/outposts" component={Outposts} />
                    <Route path="/settings" component={Settings} />
                </Route>    
                <Route path="/login" component={Login} />
                <Route path="/" component={Root} />
                <Route path="*" component={NotFound} />
            </Router>
        </PreferencesContext.Provider>
    );
}, root!);
