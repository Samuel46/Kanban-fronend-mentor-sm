import { Box, Typography, Stack, Button } from "@mui/material";
import React from "react";
import { pxToRem } from "src/theme/typography";

export default function PlatFormLaunchColumnAdd() {
	return (
		<Stack width={1} height={1}>
			<h6></h6>
			<Box
				sx={{
					background: (theme) => theme.palette.columnBg,
					height: 1,
					width: pxToRem(280),
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					color: (theme) => theme.palette.grey[500],
					borderRadius: pxToRem(6),
				}}
			>
				<Button
					sx={{
						typography: "h5",
						color: "inherit",
						"&:hover": {
							background: "transparent",
							color: (theme) => theme.palette.primary.main,
						},
					}}
				>
					+ New Column
				</Button>
			</Box>
		</Stack>
	);
}
