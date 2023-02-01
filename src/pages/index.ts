import { useEffect } from "react";
// next
import { useRouter } from "next/router";
// routes
import { PATH_KANBAN } from "src/routes/path";

// ----------------------------------------------------------------------

export default function Index() {
	const { pathname, replace, prefetch } = useRouter();

	useEffect(() => {
		if (pathname === PATH_KANBAN.root) {
			replace(PATH_KANBAN.kanban);
		}
		/* eslint-disable react-hooks/exhaustive-deps */
	}, [pathname]);

	useEffect(() => {
		prefetch(PATH_KANBAN.kanban);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return null;
}
