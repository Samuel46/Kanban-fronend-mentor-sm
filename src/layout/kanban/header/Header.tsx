// @mui
import { Divider, Menu, Stack, useTheme } from "@mui/material";
import { Toolbar, Typography, IconButton, AppBar, Box } from "@mui/material";
import Grow from "@mui/material/Grow";
// @mui@icons
import MoreVertIcon from "@mui/icons-material/MoreVert";
// common components
import useResponsive from "@common/hooks/useResponsive";
import Logo from "@common/components/logo";
// config
import { HEADER, NAV } from "src/config";
import { AddNewBoard, AddNewTask, DeleteBoard } from "@component/board-details/modals";
import { useState } from "react";
import { pxToRem } from "src/theme/typography";
import EditBoard from "@component/board-details/modals/EditBaord";
import { RootState, useSelector } from "@redux/store";
import { useRouter } from "next/router";
import Iconify from "@common/components/iconify/Iconify";
import { StyledSubheader } from "@common/components/nav-section/styles";
import NavSectionVertical from "@common/components/nav-section/NavSectionVertical";
import NavSwitch from "../nav/NavSwitch";
import { MobileMenu } from "@component/mobile-menu";

type Props = {
	open: boolean;
	handleToggle: () => void;
};

export default function Header({ open, handleToggle }: Props) {
	const theme = useTheme();
	const color = theme.palette;
	const router = useRouter();

	const { query } = router;

	const { id: currentBoardId } = query;

	const { boards } = useSelector((state: RootState) => state.board);

	const currentBoard = boards?.find((board) => board._id === currentBoardId);

	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const openn = Boolean(anchorEl);

	const [boardEl, setBoardEl] = useState<null | HTMLElement>(null);

	const openBoard = Boolean(boardEl);

	const handleBoardClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setBoardEl(event.currentTarget);
	};

	const handleBoardClose = () => {
		setBoardEl(null);
	};

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const isDesktop = useResponsive("up", "md");
	const isTablet = useResponsive("down", "md");
	const isPhone = useResponsive("down", "sm");

	return (
		<AppBar
			sx={{
				height: HEADER.H_DASHBOARD_DESKTOP,
				zIndex: theme.zIndex.appBar + 1,
				...(isDesktop && {
					width: open ? `calc(100% - ${NAV.W_DASHBOARD + 1}px)` : "100%",
					height: HEADER.H_DASHBOARD_DESKTOP,
				}),

				...(isTablet && {
					width: open ? `calc(100% - ${NAV.W_BASE + 1}px)` : "100%",
					height: HEADER.H_DASHBOARD_DESKTOP,
				}),
				...(isPhone && {
					width: "100%",
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

				{isPhone && (
					<MobileMenu
						handleToggle={handleToggle}
						boardEl={boardEl}
						openBoard={openBoard}
						handleBoardClick={handleBoardClick}
						handleBoardClose={handleBoardClose}
						currentBoard={currentBoard}
					/>
				)}

				{isDesktop && (
					<Typography variant="h1" sx={{ flexGrow: 1, marginLeft: !open ? 3 : 0, textTransform: "capitalize" }}>
						{currentBoard?.name}
					</Typography>
				)}

				{isTablet && !isPhone && (
					<Typography variant="h1" sx={{ flexGrow: 1, marginLeft: !open ? 3 : 0, textTransform: "capitalize" }}>
						{currentBoard?.name}
					</Typography>
				)}

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
								background: theme.palette.background.paper,
								minHeight: pxToRem(92),
								boxShadow: "0px 10px 20px rgba(54, 78, 126, 0.25)",
								borderRadius: pxToRem(8),
								marginTop: 15,
							},
						}}
					>
						<EditBoard />
						<DeleteBoard handleCloseMenu={handleClose} />
					</Menu>
				</div>
			</Toolbar>
		</AppBar>
	);
}
