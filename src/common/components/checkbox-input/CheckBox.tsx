import { Checkbox, FormControlLabel, useTheme, Box, Typography } from "@mui/material";
import { updatedSubTask, updatedTask } from "@redux/slice/task";
import { dispatch } from "@redux/store";
import React, { useEffect, useState } from "react";
import { pxToRem } from "src/theme/typography";
import { useSettingsContext } from "../settings";

type Props = {
	label: string;
	complete: boolean;
	subTaskId?: string;
	taskId?: string;
};

export default function CheckBox({ label, complete, subTaskId, taskId }: Props) {
	const [checked, setChecked] = useState(complete);

	const theme = useTheme();

	const { themeMode } = useSettingsContext();

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(updatedSubTask(taskId, subTaskId, event.target.checked));
		setChecked(event.target.checked);
	};

	return (
		<Box
			sx={{
				background: theme.palette.background.neutral,
				px: pxToRem(12),
				borderRadius: pxToRem(4),
				height: pxToRem(40),
				color: theme.palette.grey[500],
				transition: theme.transitions.create("all"),
				mb: pxToRem(8),
				cursor: "pointer",
				"&:hover": {
					backgroundColor: themeMode === "light" ? theme.palette.secondary.btnHover : "hsla(242, 48%, 58%, .24)",
					color: themeMode === "light" ? theme.palette.common.black : theme.palette.common.white,
				},
			}}
		>
			<FormControlLabel
				control={<Checkbox checked={checked} onChange={handleChange} inputProps={{ "aria-label": "controlled" }} />}
				label={
					<Typography variant="body2" sx={{ textDecoration: checked ? "line-through" : "", lineHeight: pxToRem(15) }}>
						{label}
					</Typography>
				}
			/>
		</Box>
	);
}
