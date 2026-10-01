import type { Project } from "../../../schemas/content";
export type { Project } from "../../../schemas/content";

export interface ProjectCardProps {
	project: Project;
	size?: "small" | "medium" | "large";
	showImage?: boolean;
	maxTechStack?: number;
}
