import { IconButton, Menu, useTheme } from "@mui/material";
// @mui@icons
import MoreVertIcon from "@mui/icons-material/MoreVert";
//
import { pxToRem } from "src/theme/typography";
import { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
	anchorEl: HTMLElement | null;
	openn: boolean;
	handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
	handleClosee: () => void;
}

export default function MenuNav({ children, anchorEl, openn, handleClick, handleClosee }: Props) {
	const theme = useTheme();
	return (
		<div>
			<IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} onClick={handleClick}>
				<MoreVertIcon sx={{ color: theme.palette.grey[600] }} />
			</IconButton>

			<Menu
				id="basic-menu"
				anchorEl={anchorEl}
				open={openn}
				onClose={handleClosee}
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
				{children}
			</Menu>
		</div>
	);
}
