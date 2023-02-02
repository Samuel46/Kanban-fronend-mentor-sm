// @mui
import { Stack, List } from "@mui/material";
import { RootState, useSelector } from "@redux/store";
// components
import Navlist from "./Navlist";
import { StyledSubheader } from "./styles";
// types
import { NavSectionProps } from "./types";

export default function NavSectionVertical({ data, sx, ...other }: NavSectionProps) {
	const { boards } = useSelector((state: RootState) => state.board);
	return (
		<>
			<Stack sx={sx} {...other}>
				{data.map((listItem) => {
					const key = listItem.subheader || listItem.items[0].title;
					return (
						<List key={key} disablePadding>
							{listItem.subheader && (
								<StyledSubheader disableSticky>
									{listItem.subheader} ({boards.length})
								</StyledSubheader>
							)}
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
