// icons
import Iconify from "@common/components/iconify";
// routes
import { PATH_KANBAN } from "src/routes/path";

const navConfig = [
	{
		// kanban
		subheader: "All Boards",
		items: [
			{ title: "Platform Launch", path: PATH_KANBAN.platformLaunch, icon: <Iconify icon="tabler:layout-board-split" /> },
			{ title: "Markerting Plan", path: PATH_KANBAN.marketingPlan, icon: <Iconify icon="tabler:layout-board-split" /> },
			{ title: "Roadmap", path: PATH_KANBAN.roadmap, icon: <Iconify icon="tabler:layout-board-split" /> },
		],
	},
];

export default navConfig;
