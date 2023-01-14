import { useEffect } from "react";
// next
import { useRouter } from "next/router";
// routes
import { PATH_KANBAN } from "src/routes/path";

// ----------------------------------------------------------------------

export default function Index() {
	const { pathname, replace, prefetch } = useRouter();

	useEffect(() => {
		if (pathname === PATH_KANBAN.kanban) {
			replace(PATH_KANBAN.platformLaunch);
		}
		/* eslint-disable react-hooks/exhaustive-deps */
	}, [pathname]);

	useEffect(() => {
		prefetch(PATH_KANBAN.platformLaunch);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return null;
}
