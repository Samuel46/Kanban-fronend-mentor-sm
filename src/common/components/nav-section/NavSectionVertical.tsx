// @mui
import { Stack, List } from "@mui/material";
// components
import Navlist from "./Navlist";
import { StyledSubheader } from "./styles";
// types
import { NavSectionProps } from "./types";

export default function NavSectionVertical({ data, sx, ...other }: NavSectionProps) {
	return (
		<>
			<Stack sx={sx} {...other}>
				{data.map((listItem) => {
					const key = listItem.subheader || listItem.items[0].title;
					return (
						<List key={key} disablePadding>
							{listItem.subheader && <StyledSubheader disableSticky>{listItem.subheader} (3)</StyledSubheader>}
							{listItem.items.map((item) => {
								return <Navlist key={item.title + item.path} data={item} />;
							})}
						</List>
					);
				})}
			</Stack>
		</>
	);
}
