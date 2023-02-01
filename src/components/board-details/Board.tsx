import { useEffect, useState } from "react";
import useNotifier from "@common/hooks/useSticky";
import { Container, Stack } from "@mui/material";
import { dispatch, RootState, useSelector } from "@redux/store";
import { useRouter } from "next/router";
import { pxToRem } from "src/theme/typography";
import BoardColumn from "./BoardColumn";
import BoardColumnAdd from "./BoardColumnAdd";
import BoardEmpty from "./BoardEmpty";
import BoardSkeleton from "./BoardSkeleton";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { getAllTasks, updatedTask } from "@redux/slice/task";
import { getAllBoards } from "@redux/slice/board";

type Subtasks = {
	title: string;
	complete: boolean;
	_id?: string;
};

type Task = {
	title: string;
	description: string;
	subtasks: Subtasks[];
	status: string;
	_id?: string;
	order: number;
};

export default function Board() {
	useNotifier();

	const { tasks: data } = useSelector((state: RootState) => state.task);

	const [tasks, setTasks] = useState(data || []);

	useEffect(() => {
		setTasks(data);
		console.log("setTasks");
	}, [data]);

	// console.log(newTask, "newTask");

	const router = useRouter();

	const { query, replace } = router;

	const { id: currentBoardId } = query;

	const { boards, isLoading } = useSelector((state: RootState) => state.board);

	// get the current board by id

	const currentBoard = boards?.find((board) => board._id === currentBoardId);

	// console.log(currentBoard, "currentBoard");

	const onDragEnd = (result: DropResult) => {
		const { source, destination, draggableId } = result;

		console.log(draggableId, "draggableId");

		console.log(source, "source");

		console.log(destination, "destination");

		// handle the drop only if there's a source and a destination
		if (!destination && !source) {
			return;
		}

		if (destination?.droppableId === source.droppableId && destination.index === source.index) return;

		// current tasks in the column
		const currentTask = tasks?.filter((task) => task.status === source.droppableId);

		// handle moving task within the same column
		if (source.droppableId === destination?.droppableId) {
			// implement reordering of tasks in the same column

			const newTask = currentTask?.map((task, index) => {
				if (index === source.index) {
					return {
						...task,
						order: destination.index,
					};
				}

				return task;
			});

			// dispatch(updatedTask(newTask))
		}

		// handle moving task to a different column
		if (source.droppableId !== destination?.droppableId) {
			// implement logic to move task to a different column

			const newTask = currentTask?.map((task, index) => {
				if (index === source.index) {
					return {
						...task,
						order: destination?.index,
						status: destination?.droppableId,
					};
				}
			});

			const taskToMove = newTask[source.index];

			const newTasks = tasks?.filter((task) => task._id !== taskToMove?._id);

			const mutataTasks = [...newTasks, taskToMove];

			setTasks(mutataTasks as Task[]);

			dispatch(
				updatedTask(
					taskToMove?.title!,
					taskToMove?.description!,
					taskToMove?.subtasks!,
					taskToMove?.status!,
					taskToMove?._id!
				)
			);
		}
	};

	useEffect(() => {
		if (!currentBoard && boards?.length! === 0) {
			replace(`/kanban/new`);
		} else if (!currentBoard && boards?.length! > 0) {
			replace(`/kanban/${boards[0]._id}`);
		}
	}, [currentBoard]);

	return (
		<Container maxWidth={false} sx={{ py: pxToRem(24), zIndex: 1000 }}>
			<DragDropContext onDragEnd={onDragEnd}>
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
						return (
							<Droppable droppableId={column._id as string} key={column._id}>
								{(provided) => (
									<div
										ref={provided.innerRef}
										{...provided.droppableProps}
										style={{ border: "4px solid yellow", width: "100%", height: "100%" }}
									>
										<BoardColumn data={column} tasks={tasks} />
										{provided.placeholder}
									</div>
								)}
							</Droppable>
						);
					})}

					{currentBoard?.columns?.length! > 0 ? <BoardColumnAdd /> : <BoardEmpty />}
				</Stack>
			</DragDropContext>
		</Container>
	);
}
