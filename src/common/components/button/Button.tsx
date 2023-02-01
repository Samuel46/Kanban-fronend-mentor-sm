import { Button as MuiButton, useTheme } from "@mui/material";
import { ReactElement } from "react";
import { pxToRem } from "src/theme/typography";

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
					background: color.secondary.btn,
					"&:hover": {
						backgroundColor: color.secondary.btnHover,
						boxShadow: "none",
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
