import { useEffect, useState } from "react";
import useNotifier from "@common/hooks/useSticky";
import { Container, Stack } from "@mui/material";
import { RootState, useSelector } from "@redux/store";
import { useRouter } from "next/router";
import { pxToRem } from "src/theme/typography";
import BoardColumn from "./BoardColumn";
import BoardColumnAdd from "./BoardColumnAdd";
import BoardEmpty from "./BoardEmpty";
import BoardSkeleton from "./BoardSkeleton";

export default function Board() {
	useNotifier();

	const router = useRouter();

	const { query, replace } = router;

	const { id: currentBoardId } = query;

	const { boards, isLoading } = useSelector((state: RootState) => state.board);
	const { isLoading: taskLoading } = useSelector((state: RootState) => state.task);

	// get the current board by id

	const currentBoard = boards?.find((board) => board._id === currentBoardId);

	useEffect(() => {
		if (!currentBoard && boards?.length === 0 && !isLoading) {
			replace(`/kanban/new`);
		}
	}, [currentBoard, currentBoardId, boards, replace]);

	if (isLoading || taskLoading) {
		return <BoardSkeleton />;
	}

	return (
		<Container maxWidth={false} sx={{ py: pxToRem(24), zIndex: 1000 }}>
			<Stack
				spacing={pxToRem(20)}
				direction="row"
				alignItems="flex-start"
				sx={{
					mt: 2,
					width: 1,
					height: "100vh",
					overflowY: "auto",
					"&::-webkit-scrollbar": {
						width: 0,
					},
				}}
			>
				{currentBoard?.columns?.map((column, index) => {
					return <BoardColumn data={column} key={column._id} />;
				})}

				{currentBoard?.columns?.length! > 0 ? <BoardColumnAdd /> : <BoardEmpty />}
			</Stack>
		</Container>
	);
}
