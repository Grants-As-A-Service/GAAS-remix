import { Link } from "@remix-run/react";

export const NavBar = ({ children }: ChildProps) => <div className="navbar bg-base-100">{children}</div>;

export const NavSandwhich = () => (
	<span className="tooltip tooltip-bottom before:text-xs before:content-[attr(data-tip)]" data-tip="Menu">
		<label htmlFor="drawer" className="btn btn-square btn-ghost drawer-button ">
			<svg
				width="20"
				height="20"
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				className="inline-block h-5 w-5 stroke-current md:h-6 md:w-6"
			>
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
			</svg>
		</label>
	</span>
);

export const NavDropDown = ({ title, menu }: { title: string; menu: Array<string> }) => (
	<div className="flex-none">
		<ul className="menu menu-horizontal px-1">
			<li tabIndex={0}>
				<a>
					{title}
					<svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
						<path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
					</svg>
				</a>
				<ul className="p-2 bg-base-100">
					{menu.map((item, key) => (
						<li key={key}>
							<Link to={item}>{item}</Link>
						</li>
					))}
				</ul>
			</li>
		</ul>
	</div>
);

export const NavEnd = ({ children }: ChildProps) => (
	<div className="flex-none">
		<button className="btn btn-square btn-ghost">
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current">
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth="2"
					d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
				></path>
			</svg>
		</button>
	</div>
);

export const NavButton = ({ name, onClick }: { name: string; onClick: () => void }) => {
	return (
		<div className="flex-0">
			<button className="btn btn-ghost" onClick={onClick}>
				<span className="text-primary inline-flex text-lg lowercase">{name}</span>
			</button>
		</div>
	);
};

export const NavItem = ({ name, route }: { name: string; route?: string }) => {
	return (
		<div className="flex-0">
			{route ? (
				<Link to={route} className="btn btn-ghost">
					<span className="font-title text-primary inline-flex text-3xl">{name}</span>
				</Link>
			) : (
				<button className="btn btn-ghost">
					<span className="font-title text-primary inline-flex text-3xl">{name}</span>
				</button>
			)}
		</div>
	);
};
