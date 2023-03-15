import { useState } from "react";
import { useRouter } from "~/components/hooks/navigator";
import { Title } from "~/components/title";

export default function ProjectView() {
	const [project, setProject] = useRouter<Project | undefined>();

	return project ? (
		<Title title={project.name} foot={project.description}>
			<div>status: {project.status}</div>
		</Title>
	) : (
		<></>
	);
}
