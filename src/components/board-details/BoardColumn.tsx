import { Stack } from "@mui/material";
import { Box } from "@mui/system";
import { RootState, useSelector } from "@redux/store";
import { pxToRem } from "src/theme/typography";
import BoardHeader from "./BoardHeader";
import ViewTask from "./modals/ViewTask";

type Column = {
	name: string;
	_id?: string;
	prioritize: string;
};

export default function BoardColumn({ data }: { data: Column }) {
	const { tasks } = useSelector((state: RootState) => state.task);
	const currentTasks = tasks?.filter((board) => board?.status === data?._id);

	return (
		<Box minWidth="280px">
			<BoardHeader title={data?.name} color={data?.prioritize} data={currentTasks} />

			<Stack spacing={pxToRem(20)}>
				{currentTasks?.map((task, index) => (
					<ViewTask task={task} index={index} key={task._id} />
				))}
			</Stack>
		</Box>
	);
}
