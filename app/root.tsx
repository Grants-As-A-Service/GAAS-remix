import { json, LinksFunction, LoaderArgs, MetaFunction, redirect } from "@remix-run/node";
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration, useLoaderData } from "@remix-run/react";
import { NavBar, NavSandwhich, NavItem, NavDropDown, NavButton } from "./components/navs/NavBar";
import Route from "./components/navs/route";
import { SideBar } from "./components/navs/SideBar";
import { signout } from "./utils/firebaseClient";
import stylesheet from "./tailwind.css";
import { auth } from "../cookies";
import { pathNameSlicer } from "./utils/httpHandler";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: stylesheet }];

export const meta: MetaFunction = () => ({
    charset: "utf-8",
    title: "New Remix App",
    viewport: "width=device-width,initial-scale=1",
});

export async function loader({ request }: LoaderArgs) {
    const cookieHeader = request.headers.get("Cookie");
    const cookie = (await auth.parse(cookieHeader)) || undefined;

    const shouldRedirect = pathNameSlicer(request.url) === "/" && cookie !== undefined;

    console.log(shouldRedirect, cookie);

    return new Response(JSON.stringify({ auth: cookie }), {
        ...(shouldRedirect ? { status: 302 } : {}),
        headers: {
            ...(shouldRedirect ? { Location: "/home" } : {}),
            "Content-Type": "application/json; charset=utf-8",
        },
    });
}

export default function App() {
    const { auth } = useLoaderData<typeof loader>();

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
                        {auth ? (
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
