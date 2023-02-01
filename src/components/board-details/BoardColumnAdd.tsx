import { useState } from "react";

// @mui
import { Box, Button as MuiButton, Typography } from "@mui/material";
import { pxToRem } from "src/theme/typography";
import { BoardDialog } from "@common/components/board-dialog";

export default function BoardColumnAdd() {
	const [open, setOpen] = useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<Box minWidth="280px" height={1}>
			<Typography variant="h6" fontWeight="700" mb={2} color="text.secondary" sx={{ color: "transparent" }}>
				Add new column
			</Typography>
			<Box
				sx={{
					background: (theme) => theme.palette.columnBg,
					height: "inherit",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					color: (theme) => theme.palette.grey[500],
					borderRadius: pxToRem(6),
				}}
			>
				<MuiButton
					onClick={handleClickOpen}
					sx={{
						typography: "h5",
						color: "inherit",
						"&:hover": {
							background: "transparent",
							color: (theme) => theme.palette.primary.main,
						},
					}}
				>
					+ New Column
				</MuiButton>

				<BoardDialog open={open} handleClose={handleClose} title="Add new columns" buttonTxt="Save changes" edit={true} />
			</Box>
		</Box>
	);
}
