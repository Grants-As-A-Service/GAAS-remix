import { json, LinksFunction, LoaderArgs, MetaFunction, redirect } from "@remix-run/node";
import { Link, Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration, useLoaderData } from "@remix-run/react";
import { NavBar, NavSandwhich, NavItem, NavDropDown, NavButton } from "./components/navs/NavBar";
import Route from "./components/navs/route";
import { SideBar } from "./components/navs/SideBar";
import { signout } from "./utils/firebaseClient";
import stylesheet from "./tailwind.css";
import { getAccount, getAccountFromId } from "db/controllers/accountController";
import { mongoHandlerThrows } from "./utils/handler";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: stylesheet }];

export const meta: MetaFunction = () => ({
	charset: "utf-8",
	title: "New Remix App",
	viewport: "width=device-width,initial-scale=1",
});

export async function loader({ request }: LoaderArgs) {
	let user = JSON.parse(request.headers.get("user") as string);

	if (user) {
		let userType = "userType" in user ? user.userType : "";

		let account = await mongoHandlerThrows(getAccountFromId(user.accountId));

		return json({ userType: userType, account: account, isLoggedIn: true });
	} else {
		return json({ userType: undefined, account: undefined, isLoggedIn: false });
	}
}

export default function App() {
	const { isLoggedIn, userType, account } = useLoaderData<typeof loader>();

	return (
		<html lang="en" data-theme="night">
			<head>
				<Meta />
				<Links />
			</head>
			<body style={{ margin: 0 }}>
				<SideBar isLoggedIn={isLoggedIn} userType={userType}>
					<NavBar>
						<NavSandwhich />
						<NavItem name="GAAS" route={isLoggedIn ? "/home/" + userType : "/"} />
						<Route />
						<div className="flex-none">
							{isLoggedIn ? (
								<NavDropDown
									title="Account"
									menu={[
										<li>
											<a href={"/home/profile"}>Account</a>
										</li>,
										<li>
											<a href="/logout">Logout</a>
										</li>,
									]}
								/>
							) : (
								<NavDropDown
									title="Account"
									menu={[
										<li>
											<a href="/login">Login</a>
										</li>,
										<li>
											<a href="/register">Register</a>
										</li>,
									]}
								/>
							)}
						</div>
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
