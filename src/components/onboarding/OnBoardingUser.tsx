import Button from "@common/components/button/Button";
import { AddNewBoard } from "@component/board-details/modals";
import { Box, Stack, Typography } from "@mui/material";
import { pxToRem } from "src/theme/typography";

export default function OnBoardingUser() {
	return (
		<Box sx={{ display: "grid", placeItems: "center", color: (theme) => theme.palette.grey[500] }}>
			<Stack spacing={3} alignItems="center">
				<Typography fontSize={pxToRem(18)}>No Boards found. Create a new Board to get started.</Typography>
				<AddNewBoard />
			</Stack>
		</Box>
	);
}
