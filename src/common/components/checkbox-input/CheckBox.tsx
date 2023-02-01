import { Checkbox, FormControlLabel, useTheme, Box, Typography } from "@mui/material";
import React, { useState } from "react";
import { pxToRem } from "src/theme/typography";

type Props = {
	label: string;
};

export default function CheckBox({ label }: Props) {
	const [checked, setChecked] = useState(true);

	const theme = useTheme();

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setChecked(event.target.checked);
	};
	return (
		<Box
			sx={{
				background: theme.palette.secondary.light,
				px: pxToRem(12),
				borderRadius: pxToRem(4),
				height: pxToRem(40),
				color: theme.palette.grey[500],
				transition: theme.transitions.create("all"),
				mb: pxToRem(8),
				cursor: "pointer",
				"&:hover": {
					backgroundColor: theme.palette.secondary.btnHover,
					color: theme.palette.common.black,
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
