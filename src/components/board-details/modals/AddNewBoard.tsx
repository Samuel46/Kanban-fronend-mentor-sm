import { useEffect, useState } from "react";

// @mui
import { Button as MuiButton } from "@mui/material";

import { RootState, useSelector } from "@redux/store";

import { useRouter } from "next/router";
import { BoardDialog } from "@common/components/board-dialog";

export default function AddNewBoard() {
	const [open, setOpen] = useState(false);

	const router = useRouter();

	const { board, isLoading } = useSelector((state: RootState) => state.board);

	useEffect(() => {
		if (board && !isLoading) {
			router.push(`/kanban/${board._id}`);
		}
	}, [board, isLoading]);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div>
			<MuiButton onClick={handleClickOpen}>+ Create New Board</MuiButton>
			{/* TODO: overwrite dialog component, to extend the new maxwidth xs */}
			<BoardDialog open={open} handleClose={handleClose} title="Add Board" buttonTxt="Save" edit={false} />
		</div>
	);
}
