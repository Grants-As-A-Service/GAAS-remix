export const SideBar = ({ children }: { children: React.ReactNode }) => (
	<div className="drawer">
		<input id="drawer" type="checkbox" className="drawer-toggle" />
		<div className="drawer-content flex flex-col">{children}</div>
		<div className="drawer-side">
			<label htmlFor="drawer" className="drawer-overlay"></label>
			<ul className="menu p-4 w-80 bg-base-100 text-base-content">
				<li>
					<a href="/home">GAAS</a>
				</li>
				<li />
				<li>
					<a href="/account">View Account</a>
				</li>
				<li />
				<li>
					<a href="/account.">Create Proejct</a>
				</li>
			</ul>
		</div>
	</div>
);