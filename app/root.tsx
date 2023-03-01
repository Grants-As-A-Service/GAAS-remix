import type { LinksFunction, MetaFunction } from "@remix-run/node";
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from "@remix-run/react";
import { NavBar, NavSandwhich, NavItem, NavDropDown, NavButton } from "components/NavBar";
import Route from "components/route";
import { SideBar } from "components/SideBar";
import { useAuthState } from "components/useAuthState";
import { signout } from "utils/firebaseClient";
import stylesheet from "./tailwind.css";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: stylesheet }];

export const meta: MetaFunction = () => ({
    charset: "utf-8",
    title: "New Remix App",
    viewport: "width=device-width,initial-scale=1",
});
// <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />

export default function App() {
    const [loggedin] = useAuthState();

    return (
        <html lang="en" data-theme="night">
            <head>
                <Meta />
                <Links />
            </head>
            <body style={{ margin: 0 }}>
                <SideBar>
                    <NavBar>
                        <NavSandwhich />
                        <NavItem name="GAAS" route="/" />
                        <Route />
                        {loggedin ? (
                            <NavButton
                                name="sign out"
                                onClick={() => {
                                    console.log("signining out");
                                    signout();
                                }}
                            />
                        ) : (
                            <NavDropDown title="Account" menu={["login", "register"]} />
                        )}
                    </NavBar>
                    <Outlet />
                </SideBar>
                <ScrollRestoration />
                <Scripts />
                <LiveReload />
            </body>
        </html>
    );
}
