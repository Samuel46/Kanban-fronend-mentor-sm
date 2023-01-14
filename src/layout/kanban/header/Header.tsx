// @mui
import { Divider, Menu, MenuItem, useTheme } from "@mui/material";
import { Toolbar, Typography, IconButton, AppBar, Box } from "@mui/material";
// @mui@icons
import MoreVertIcon from "@mui/icons-material/MoreVert";
// common components
import Button from "@common/components/button";
import useResponsive from "@common/hooks/useResponsive";
import Logo from "@common/components/logo";
// config
import { HEADER, NAV } from "src/config";
import AddNewTask from "@component/platform-launch/modals/AddNewTask";
import { useState } from "react";
import { pxToRem } from "src/theme/typography";
import { useSettingsContext } from "@common/components/settings";

type Props = {
	open: boolean;
};

export default function Header({ open }: Props) {
	const theme = useTheme();
	const color = theme.palette;

	const { themeMode } = useSettingsContext();

	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const openn = Boolean(anchorEl);

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const isDesktop = useResponsive("up", "lg");

	return (
		<AppBar
			sx={{
				height: HEADER.H_DASHBOARD_DESKTOP,
				zIndex: theme.zIndex.appBar + 1,
				...(isDesktop && {
					width: open ? `calc(100% - ${NAV.W_DASHBOARD + 1}px)` : "100%",
					height: HEADER.H_DASHBOARD_DESKTOP,
				}),

				background: theme.palette.background.paper,
				color: theme.palette.text.primary,

				boxShadow: "none",
				borderBottom: `${theme.palette.border} 2px solid`,
				justifyContent: "center",
			}}
		>
			<Toolbar sx={{ height: HEADER.H_DASHBOARD_DESKTOP }}>
				{!open && (
					<>
						<Box marginRight={3}>
							<Logo styles={{ width: "100%" }} />
						</Box>
						<Divider
							sx={{ borderRightWidth: "2px", borderColor: theme.palette.border }}
							orientation="vertical"
							flexItem
						/>
					</>
				)}

				<Typography variant="h1" sx={{ flexGrow: 1, marginLeft: !open ? 3 : 0 }}>
					Platform Launch
				</Typography>

				<AddNewTask />

				<div>
					<IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} onClick={handleClick}>
						<MoreVertIcon sx={{ color: color.grey[600] }} />
					</IconButton>

					<Menu
						id="basic-menu"
						anchorEl={anchorEl}
						open={openn}
						onClose={handleClose}
						MenuListProps={{
							"aria-labelledby": "basic-button",
						}}
						PaperProps={{
							style: {
								width: pxToRem(192),
								minHeight: pxToRem(92),
								boxShadow: "0px 10px 20px rgba(54, 78, 126, 0.25)",
								borderRadius: pxToRem(8),
								marginTop: 15,
							},
						}}
					>
						<MenuItem
							onClick={handleClose}
							sx={{
								typography: "body2",
								color: theme.palette.grey[500],
								lineHeight: pxToRem(23),
								fontWeight: 500,
								fontSize: pxToRem(13),
							}}
						>
							Edit Board
						</MenuItem>
						<MenuItem
							onClick={handleClose}
							sx={{
								typography: "body2",
								color: theme.palette.error.main,
								lineHeight: pxToRem(23),
								fontWeight: 500,
								fontSize: pxToRem(13),
							}}
						>
							Delete Board
						</MenuItem>
					</Menu>
				</div>
			</Toolbar>
		</AppBar>
	);
}
