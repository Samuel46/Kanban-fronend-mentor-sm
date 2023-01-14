// next
import NextLink from "next/link";
//@mui
import { Box, ListItemText, useTheme } from "@mui/material";
// types
import { NavItemProps } from "./types";
// styles
import { StyledIcon, StyledItem } from "./styles";

export default function NavItem({ active, item }: NavItemProps) {
	const { title, path, icon } = item;

	const theme = useTheme();

	const renderContent = (
		<StyledItem active={active}>
			{icon && <StyledIcon>{icon}</StyledIcon>}

			<ListItemText
				primary={title}
				primaryTypographyProps={{
					noWrap: true,
					component: "span",
					variant: active ? "body1" : "body1",
					color: active ? theme.palette.common.white : theme.palette.grey[500],
				}}
			/>
		</StyledItem>
	);

	const renderItem = () => {
		return <NextLink href={path}>{renderContent}</NextLink>;
	};

	return <Box>{renderItem()}</Box>;
}
