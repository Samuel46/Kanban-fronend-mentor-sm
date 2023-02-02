import Button from "@common/components/button/Button";
import { AddNewBoard } from "@component/board-details/modals";
import { Box, Stack, Typography } from "@mui/material";
import { pxToRem } from "src/theme/typography";

export default function OnBoardingUser() {
	return (
		<Box sx={{ display: "grid", placeItems: "center", placeContent: "center", color: (theme) => theme.palette.grey[500] }}>
			<Stack spacing={3} alignItems="center" justifyContent="center">
				<Typography
					sx={{
						typography: { sm: "body2", md: "h6" },
					}}
					textAlign="center"
				>
					No Boards found. Create a new Board to get started.
				</Typography>
				<AddNewBoard />
			</Stack>
		</Box>
	);
}
