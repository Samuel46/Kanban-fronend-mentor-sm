function path(root: string, sublink: string) {
	return `${root}${sublink}`;
}
const ROOT_KANBAN = "/kanban";
const ROOT = "/";

// -------------------------------------------------------------

export const PATH_KANBAN = {
	root: ROOT,
	kanban: ROOT_KANBAN,
	platformLaunch: path(ROOT_KANBAN, "/platform-launch"),
	marketingPlan: path(ROOT_KANBAN, "/marketing-plan"),
	roadmap: path(ROOT_KANBAN, "/roadmap"),
	newboard: path(ROOT_KANBAN, "/newboard"),
};
