// @mui
import { Box } from "@mui/material";
import { getAllBoards } from "@redux/slice/board";
import { RootState, useDispatch, useSelector } from "@redux/store";
import { getAllTasks } from "@redux/slice/task";
//
import { useCallback, useEffect, useState } from "react";

//
import Header from "./header/Header";
import Main from "./Main";
import NavVertical from "./nav/NavVertical";

type Props = {
	children?: React.ReactNode;
};

export default function KanbanLayout({ children }: Props) {
	const [open, setOPen] = useState(true);

	const { boards, isLoading } = useSelector((state: RootState) => state.board);

	const { tasks, isLoading: taskLoading } = useSelector((state: RootState) => state.task);

	// We pass useDispatch as a callback to useCallback, so that it will only change when the component re-renders
	// if isLoading or taskLoading changes.
	const dispatch = useCallback(useDispatch(), [isLoading, taskLoading]);

	const handleToggle = () => {
		setOPen(!open);
	};

	const handleClose = () => {
		setOPen(false);
	};

	useEffect(() => {
		if (tasks.length === 0) {
			dispatch(getAllTasks());
		}
		if (boards.length === 0) {
			dispatch(getAllBoards());
		}
	}, []);

	return (
		<>
			<Header open={open} />
			<Box
				sx={{
					display: { lg: "flex" },
					minHeight: { lg: 1 },
					height: 1,
				}}
			>
				{open && <NavVertical openNav={open} onCloseNav={handleClose} handleToggle={handleToggle} />}

				<Main handleToggle={handleToggle} open={open}>
					{children}
				</Main>
			</Box>
		</>
	);
}
