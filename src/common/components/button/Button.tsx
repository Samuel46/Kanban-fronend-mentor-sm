import { Button as MuiButton, useTheme } from "@mui/material";
import { ReactElement } from "react";
import { pxToRem } from "src/theme/typography";
import { useSettingsContext } from "../settings";

type Props = {
	children: ReactElement | string;
	sx?: React.CSSProperties;
	type?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
	onClick?: () => void;
	buttonType?: "primary" | "secondary" | "error";
	fullWidth?: boolean;
	disabled?: boolean;
};

export default function Button({ children, buttonType = "primary", sx, onClick, fullWidth, type = "button", disabled }: Props) {
	const theme = useTheme();
	const color = theme.palette;

	const { themeMode } = useSettingsContext();

	return (
		<MuiButton
			color="inherit"
			variant="text"
			onClick={onClick}
			fullWidth={fullWidth}
			disabled={disabled}
			type={type}
			sx={{
				...sx,
				mr: 2,
				borderRadius: pxToRem(24),
				padding: ".75rem 2rem",
				boxShadow: "none",

				"&:disabled": {
					color: color.common.white,
					opacity: 0.25,
				},

				...(buttonType === "primary" && {
					color: color.primary.btnText,
					background: color.primary.btn,
					"&:hover": {
						backgroundColor: color.primary.btnHover,
						boxShadow: "none",
					},
				}),

				...(buttonType === "secondary" && {
					color: color.secondary.btnText,
					background: themeMode === "dark" ? color.secondary.light : color.secondary.btn,
					"&:hover": {
						color: color.primary.main,
						background: themeMode === "dark" ? color.secondary.light : color.secondary.btnHover,
						marginRight: theme.spacing(2.4),
					},
				}),
				...(buttonType === "error" && {
					color: color.error.btnText,
					background: color.error.btn,
					"&:hover": {
						backgroundColor: color.error.btnHover,
						boxShadow: "none",
					},
				}),
			}}
		>
			{children}
		</MuiButton>
	);
}
