import { NavItemProps } from "./types";
// @mui
import { styled } from "@mui/material/styles";
import { ListItemIcon, ListItemButton, ListSubheader } from "@mui/material";
// config
import { ICON, NAV } from "../../../config";

// ----------------------------------------------------------------------

type StyledItemProps = Omit<NavItemProps, "item"> & {
	caption?: boolean;
	disabled?: boolean;
};

export const StyledItem = styled(ListItemButton, {
	shouldForwardProp: (prop) => prop !== "active",
})<StyledItemProps>(({ active, theme }) => {
	const isLight = theme.palette.mode === "light";

	const activeStyle = {
		color: theme.palette.primary.contrastText,
		backgroundColor: theme.palette.primary.main,

		...(!isLight && {
			color: theme.palette.common.white,
		}),
	};

	return {
		position: "relative",
		textTransform: "capitalize",
		paddingLeft: theme.spacing(2),
		paddingRight: theme.spacing(1.5),
		marginBottom: theme.spacing(0.5),
		color: theme.palette.text.secondary,
		transition: theme.transitions.create("all"),

		borderTopRightRadius: 100,
		borderBottomRightRadius: 100,
		marginRight: 20,

		// Active item
		...(active && {
			...activeStyle,
			"&:hover": {
				...activeStyle,
			},
		}),
	};
});

// ----------------------------------------------------------------------

export const StyledIcon = styled(ListItemIcon)({
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	width: ICON.NAV_ITEM,

	height: ICON.NAV_ITEM,
	color: "inherit",
});

// ----------------------------------------------------------------------

export const StyledSubheader = styled(ListSubheader)(({ theme }) => ({
	...theme.typography.overline,

	marginTop: theme.spacing(3),
	padding: theme.spacing(0, 2),
	fontSize: 13,
	marginLeft: theme.spacing(3),
	letterSpacing: "2.4px",
	paddingTop: theme.spacing(3),
	paddingBottom: theme.spacing(1),
	color: theme.palette.grey[500],
	marginBottom: theme.spacing(1),
}));
