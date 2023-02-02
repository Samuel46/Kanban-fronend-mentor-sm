import Iconify from "@common/components/iconify/Iconify";
import NavSectionVertical from "@common/components/nav-section/NavSectionVertical";
import { AddNewBoard } from "@component/board-details/modals";
import { Box, IconButton, Menu, Stack, Typography, useTheme } from "@mui/material";
import { RootState, useSelector } from "@redux/store";
import { useRouter } from "next/router";

import NavSwitch from "src/layout/kanban/nav/NavSwitch";
import { pxToRem } from "src/theme/typography";

type Column = {
	name: string;
	_id?: string;
	prioritize: string;
};

type Board = {
	name: string;
	columns: Column[];
	_id?: string;
	createdAt: number;
};

type Props = {
	handleToggle: () => void;
	boardEl: null | HTMLElement;
	openBoard: boolean;
	handleBoardClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
	handleBoardClose: () => void;
	currentBoard: Board | undefined;
};

export default function MobileMenu({
	handleToggle,
	boardEl,
	openBoard,
	handleBoardClick,
	handleBoardClose,
	currentBoard,
}: Props) {
	const theme = useTheme();

	const { boards } = useSelector((state: RootState) => state.board);

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

	return (
		<Stack direction="row" gap={0.5} flexGrow={1}>
			<img src="../ls.svg" alt="logo_dark" />

			<div>
				<Typography
					onClick={handleBoardClick}
					component={IconButton}
					disableRipple
					fontSize={pxToRem(18)}
					fontWeight={700}
					lineHeight={pxToRem(23)}
					sx={{ display: "flex", alignItems: "center", color: theme.palette.common.black }}
				>
					{currentBoard?.name}

					{!openBoard ? (
						<Iconify icon="bx:bxs-chevron-down" color="primary.main" />
					) : (
						<Iconify icon="bx:bxs-chevron-up" color="primary.main" />
					)}
				</Typography>

				<Menu
					id="board-menu"
					anchorEl={boardEl}
					open={openBoard}
					onClose={handleBoardClose}
					MenuListProps={{
						"aria-labelledby": "board-menu",
					}}
					PaperProps={{
						style: {
							minWidth: pxToRem(264),
							minHeight: pxToRem(322),
							boxShadow: "0px 10px 20px rgba(54, 78, 126, 0.25)",
							borderRadius: pxToRem(8),
							marginTop: 50,
						},
					}}
				>
					<Box sx={{ marginTop: "-35px" }}>
						<NavSectionVertical data={navConfig} />
						<Stack
							direction="row"
							alignItems="center"
							spacing={1}
							sx={{ ml: 4.2, color: theme.palette.primary.main, cursor: "pointer" }}
						>
							<Iconify icon="tabler:layout-board-split" />
							<AddNewBoard />
						</Stack>

						<Box sx={{ mb: pxToRem(31) }} />
						<NavSwitch handleToggle={handleToggle} />
					</Box>
				</Menu>
			</div>
		</Stack>
	);
}
