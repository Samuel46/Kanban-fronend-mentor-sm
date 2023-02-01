import { Stack } from "@mui/material";
import { Box } from "@mui/system";
import { RootState, useSelector } from "@redux/store";
import { pxToRem } from "src/theme/typography";
import BoardHeader from "./BoardHeader";
import ViewTask from "./modals/ViewTask";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";

export default function BoardColumn({ data, tasks }: { data: any; tasks: any }) {
	const currentTasks = tasks?.filter((board) => board?.status === data?._id);

	return (
		<Box minWidth="280px">
			<BoardHeader title={data?.name} color={data?.prioritize} data={currentTasks} />

			<Stack spacing={pxToRem(20)}>
				{currentTasks?.map((task, index) => (
					<Droppable droppableId={task?.status as string} direction="horizontal" key={task._id}>
						{(provided) => (
							<div {...provided.droppableProps} ref={provided.innerRef} style={{ border: "1px solid red" }}>
								<ViewTask task={task} index={index} />
								{provided.placeholder}
							</div>
						)}
					</Droppable>
				))}
			</Stack>
		</Box>
	);
}
