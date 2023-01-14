import Button from "@common/components/button";
import { Box, Stack, Typography } from "@mui/material";
import { pxToRem } from "src/theme/typography";

export default function PlatFormLaunchEmpty() {
	return (
		<Box sx={{ display: "grid", placeItems: "center", height: "100%", color: (theme) => theme.palette.grey[500] }}>
			<Stack spacing={3} alignItems="center">
				<Typography fontSize={pxToRem(18)}>This board is empty. Create a new column to get started.</Typography>
				<Button>+ Add New Column</Button>
			</Stack>
		</Box>
	);
}
