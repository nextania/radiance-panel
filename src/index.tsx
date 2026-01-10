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
import { StateProvider } from "./context.tsx";

const root = document.getElementById("root");

render(() => (
    <StateProvider>
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
    </StateProvider>
    ), root!
);
