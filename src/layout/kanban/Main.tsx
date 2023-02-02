// @mui
import { Box, BoxProps, useTheme } from "@mui/material";
// hooks
import useResponsive from "@common/hooks/useResponsive";
// config
import { HEADER, NAV } from "../../config";
import { pxToRem } from "src/theme/typography";

const SPACING = 8;

type Props = {
	children?: React.ReactNode;
	handleToggle: () => void;
	open: boolean;
	sx?: BoxProps["sx"];
	others?: BoxProps;
};

export default function Main({ children, sx, handleToggle, open, ...others }: Props) {
	const theme = useTheme();

	const isDesktop = useResponsive("up", "lg");
	const isLaptop = useResponsive("up", "md");
	const isTablet = useResponsive("down", "md");
	const isPhone = useResponsive("down", "sm");

	return (
		<Box
			component="main"
			sx={{
				flexGrow: 1,
				py: `${HEADER.H_MOBILE + SPACING}px`,
				px: 2,

				...(isDesktop && {
					py: `${HEADER.H_DASHBOARD_DESKTOP + SPACING}px`,
					width: `calc(100% - ${NAV.W_DASHBOARD}px)`,
				}),
				...(isLaptop &&
					!isDesktop && {
						py: `${HEADER.H_DASHBOARD_DESKTOP + SPACING}px`,
						width: `calc(100% - ${NAV.W_DASHBOARD}px)`,
						marginLeft: open ? `${NAV.W_DASHBOARD}px` : 0,
					}),
				...(isTablet && {
					py: `${HEADER.H_DASHBOARD_DESKTOP + SPACING}px`,
					marginLeft: open ? `${NAV.W_BASE}px` : 0,
				}),
				...(isPhone && {
					py: `${HEADER.H_MOBILE + SPACING}px`,
					marginLeft: 0,
				}),
				"@keyframes slideOut": {
					"0%": {
						opacity: 0,
					},

					"100%": {
						opacity: 1,
					},
				},
				animation: `${!open && "slideOut"} 0.3s ease-in-out`,
				...sx,
			}}
			{...others}
		>
			{children}
			{!open && (
				<Box
					onClick={handleToggle}
					sx={{
						position: "fixed",
						bottom: 60,
						left: 0,
						background: theme.palette.primary.main,
						height: pxToRem(48),
						width: pxToRem(58),
						borderRadius: `0px ${pxToRem(100)} ${pxToRem(100)} 0px`,
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						pr: 1,
						cursor: "pointer",
						"&:hover": {
							background: theme.palette.primary.light,
						},
					}}
				>
					<img src="../eye.svg" alt="kanban-eye" />
				</Box>
			)}
		</Box>
	);
}
