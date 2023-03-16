export const Title = ({ children, title, foot }: { children: React.ReactNode; title: string; foot: string }) => {
	return (
		<div className="grid place-items-left items-start flex-1 ml-20">
			<div className="hero-content col-start-1 row-start-1 w-full max-w-8xl justify-between pb-40 flex-row items-end gap-0">
				<div className="pl-1 w-full">
					<div className="mb-2 py-4 text-left">
						<h1 className="font-title mb-2 text-4xl font-extrabold">{title}</h1>
						<h1 className="font-title mb-2 text-2xl">{foot}</h1>
					</div>
					{children}
				</div>
			</div>
		</div>
	);
};

export const TitleCenter = ({ children, title }: { children: React.ReactNode; title: string }) => {
	return (
		<div className="w-full h-screen">
			<div className="px-5 w-full h-full">
				<div className="mb-2 py-4 text-center">
					<h1 className="font-title mb-2 text-4xl font-extrabold">{title}</h1>
				</div>
				<div className="flex flex-row gap-5 w-full">{children}</div>
			</div>
		</div>
	);
};
