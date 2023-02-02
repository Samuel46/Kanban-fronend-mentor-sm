import { useEffect } from "react";
// next
import { useRouter } from "next/router";
// routes
import { PATH_KANBAN } from "src/routes/path";
import { RootState, useSelector } from "@redux/store";

// ----------------------------------------------------------------------

export default function Index() {
	const { pathname, replace, prefetch } = useRouter();

	const { boards, isLoading } = useSelector((state: RootState) => state.board);

	useEffect(() => {
		if (pathname === PATH_KANBAN.kanban && boards.length === 0 && !isLoading) {
			replace(`${PATH_KANBAN.kanban}/new`);
		}

		if (pathname === PATH_KANBAN.kanban && boards && !isLoading) {
			replace(`${PATH_KANBAN.kanban}/${boards[0]?._id}`);
		}

		/* eslint-disable react-hooks/exhaustive-deps */
	}, [pathname]);

	useEffect(() => {
		if (pathname === PATH_KANBAN.kanban && boards.length === 0 && !isLoading) {
			prefetch(`${PATH_KANBAN.kanban}/new`);
		}

		if (pathname === PATH_KANBAN.kanban && boards.length > 0 && !isLoading) {
			prefetch(`${PATH_KANBAN.kanban}/${boards[0]?._id}`);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return null;
}
