// components

import Iconify from "@common/components/iconify/Iconify";
import Logo from "@common/components/logo";
import NavSectionVertical from "@common/components/nav-section/NavSectionVertical";

// hooks
import useResponsive from "@common/hooks/useResponsive";
//
import { AddNewBoard } from "@component/board-details/modals";

// @mui
import { Box, Drawer, Stack, useTheme } from "@mui/material";
import { RootState } from "@redux/store";
import { useSelector } from "react-redux";

// config
import { NAV } from "src/config";
import { PATH_KANBAN } from "src/routes/path";

//

import NavSwitch from "./NavSwitch";

type Props = {
	openNav: boolean;
	onCloseNav: () => void;
	handleToggle: () => void;
};

export default function NavVertical({ openNav, onCloseNav, handleToggle }: Props) {
	const theme = useTheme();
	const color = theme.palette;

	const { boards, isLoading } = useSelector((state: RootState) => state.board);

	const navConfig = [
		{
			// kanban
			subheader: "All Boards",
			items: boards.map((item) => ({
				title: item.name,
				path: `/kanban/${item._id}`,
				icon: <Iconify icon="tabler:layout-board-split" />,
			})),
		},
	];

	const isDesktop = useResponsive("up", "sm");

	const renderContent = (
		<Box sx={{ height: 1, display: "flex", flexDirection: "column" }}>
			<Stack spacing={3} justifyContent="center" alignItems="left" sx={{ pt: 3, px: 2.5, flexShrink: 0 }}>
				<Logo />
			</Stack>

			<NavSectionVertical data={navConfig} />

			<Stack direction="row" alignItems="center" spacing={1} sx={{ ml: 4.2, color: color.primary.main, cursor: "pointer" }}>
				<Iconify icon="tabler:layout-board-split" />
				<AddNewBoard />
			</Stack>

			<Box sx={{ flexGrow: 1 }} />
			<NavSwitch handleToggle={handleToggle} />
		</Box>
	);

	return (
		<Box
			component="nav"
			sx={{
				flexShrink: { lg: 0 },
				width: { lg: NAV.W_DASHBOARD },

				"@keyframes slideIn": {
					"0%": {
						transform: "translateX(-100%)",
					},
					"100%": {
						transform: "translateX(0)",
					},
				},
				"@keyframes slideOut": {
					"0%": {
						transform: "translateX(0)",
					},
					"100%": {
						transform: "translateX(-100%)",
					},
				},
				animation: `${openNav ? "slideIn" : "slideOut"} 0.2s ease`,
			}}
		>
			{isDesktop && (
				<Drawer
					open={openNav}
					onClose={onCloseNav}
					variant="persistent"
					anchor="left"
					sx={{
						transition: "all 0.3s ease",
					}}
					PaperProps={{
						sx: {
							width: { sm: NAV.W_BASE, md: NAV.W_DASHBOARD },
							bgcolor: "background.paper",
							borderRight: `${color.border} 2px solid`,
						},
					}}
				>
					{renderContent}
				</Drawer>
			)}
		</Box>
	);
}
