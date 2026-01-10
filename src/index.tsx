/* @refresh reload */
import { render } from "solid-js/web";
import "./index.css";
import App from "./App.tsx";
import { Navigate, Route, Router } from "@solidjs/router";
import Hosts from "./components/pages/Hosts.tsx";
import NotFound from "./components/pages/NotFound.tsx";
import Login from "./components/pages/Login.tsx";
import Tls from "./components/pages/Tls.tsx";
import Outposts from "./components/pages/Outposts.tsx";
import Settings from "./components/pages/Settings.tsx";

const root = document.getElementById("root");

render(() => (
    <Router>
        <Route path="/dashboard" component={App}>
            <Route path="/" component={() => <Navigate href="/dashboard/hosts" />} />
            <Route path="/hosts" component={Hosts} />
            <Route path="/tls" component={Tls} />
            <Route path="/outposts" component={Outposts} />
            <Route path="/settings" component={Settings} />
        </Route>    
        <Route path="/login" component={Login} />
        {/* <Route path="/" component={} /> */}
        <Route path="*" component={NotFound} />
    </Router>
    ), root!
);
