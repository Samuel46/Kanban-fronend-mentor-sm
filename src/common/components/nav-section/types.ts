import { StackProps, ListItemButtonProps } from "@mui/material";

// ----------------------------------------------------------------------

export type INavItem = {
	item: NavListProps;
	active?: boolean;
};

export type NavItemProps = INavItem & ListItemButtonProps;

export type NavListProps = {
	title: string;
	path: string;
	icon?: React.ReactElement;
};

export interface NavSectionProps extends StackProps {
	data: {
		subheader: string;
		items: NavListProps[];
	}[];
}
