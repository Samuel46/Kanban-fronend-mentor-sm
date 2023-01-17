import React, { useState } from "react";
import { Box, IconButton, useTheme } from "@mui/material";

//
import { useSettingsContext } from "../settings";
import { pxToRem } from "src/theme/typography";

export default function Switch() {
	const [on, setON] = useState(false);

	const { onToggleMode } = useSettingsContext();

	const theme = useTheme();

	const handleToggle = () => {
		setON(!on);
		onToggleMode();
	};

	return (
		<IconButton
			disableTouchRipple
			disableRipple
			onClick={handleToggle}
			sx={{
				background: theme.palette.primary.main,
				borderRadius: pxToRem(12),
				width: pxToRem(40),
				height: pxToRem(20),
				display: "flex",
				m: 0,
				p: 0,

				"&:hover": {
					background: " #A8A4FF;",
				},
			}}
		>
			<Box
				sx={{
					background: theme.palette.common.white,
					borderRadius: pxToRem(12),
					width: pxToRem(14),
					height: pxToRem(14),
					transition: "all .2s ease",
					transform: !on ? "translateX(8px)" : "translateX(-8px)",
				}}
			/>
		</IconButton>
	);
}
