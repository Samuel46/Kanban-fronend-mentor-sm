import { Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { pxToRem } from "src/theme/typography";
import ViewTask from "./modals/ViewTask";

export default function PlatFormLaunchColumn({ data }: { data: any }) {
	return (
		<Box minWidth="280px">
			<Typography variant="h6" fontWeight="700" mb={2} color="text.secondary">
				{data.status}
			</Typography>
			<Stack spacing={pxToRem(20)}>
				{data.tasks.map((task: any) => (
					<ViewTask task={task} />
				))}
			</Stack>
		</Box>
	);
}
