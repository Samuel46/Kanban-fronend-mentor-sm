import { Box, Typography } from "@mui/material";
import { pxToRem } from "src/theme/typography";

type Task = {
	title: string;
	description: string;
	subtasks: Subtasks[];
	status: string;
};

type Subtasks = {
	title: string;
	complete: boolean;
};

type Props = {
	title: string;
	color: string;
	data: Task[];
};

const PRIORITIZES_OPTIONS = [
	{ value: "low", label: "Low", color: "info" },
	{ value: "medium", label: "Medium", color: "warning" },
	{ value: "high", label: "High", color: "error" },
	{ value: "critical", label: "Critical", color: "primary" },
] as const;

export default function BoardHeader({ title, color, data }: Props) {
	const current = PRIORITIZES_OPTIONS.find((item) => item.value === color);

	return (
		<Typography
			fontWeight="700"
			fontSize={pxToRem(12)}
			lineHeight={pxToRem(15)}
			letterSpacing={pxToRem(2.4)}
			mb={2}
			color="text.secondary"
			sx={{ display: "flex", alignItems: "center", gap: 1 }}
		>
			<Box
				sx={{
					width: pxToRem(15),
					height: pxToRem(15),
					borderRadius: "50%",
					bgcolor: (theme) => theme.palette[current?.color || "info"]?.main,
				}}
			/>
			{title}
			<span>({data.length})</span>
		</Typography>
	);
}
