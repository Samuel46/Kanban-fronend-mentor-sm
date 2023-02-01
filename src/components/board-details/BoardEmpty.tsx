import { BoardDialog } from "@common/components/board-dialog";
import Button from "@common/components/button";
import { Box, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { pxToRem } from "src/theme/typography";

export default function BoardEmpty() {
	const [open, setOpen] = useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<Box
			sx={{
				display: "grid",
				placeItems: "center",
				flex: 1,
				height: "100%",
				color: (theme) => theme.palette.grey[500],
			}}
		>
			<Stack spacing={3} alignItems="center">
				<Typography fontSize={pxToRem(18)}>This board is empty. Create a new column to get started.</Typography>
				<Button onClick={handleClickOpen}>+ Add New Column</Button>
			</Stack>

			<BoardDialog open={open} handleClose={handleClose} title="Add new columns" buttonTxt="Save changes" edit={true} />
		</Box>
	);
}
