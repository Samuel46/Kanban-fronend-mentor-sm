import { useState } from "react";

// @mui
import { MenuItem } from "@mui/material";
import { pxToRem } from "src/theme/typography";

import { BoardDialog } from "@common/components/board-dialog";

export default function EditBoard() {
	const [open, setOpen] = useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div>
			<MenuItem
				onClick={handleClickOpen}
				sx={{
					typography: "body2",
					color: "text.secondary",
					lineHeight: pxToRem(23),
					fontWeight: 500,
					fontSize: pxToRem(13),
				}}
			>
				Edit Board
			</MenuItem>
			{/* TODO: overwrite dialog component, to extend the new maxwidth xs */}
			<BoardDialog open={open} handleClose={handleClose} title="Edit Board" buttonTxt="Save" edit={true} />
		</div>
	);
}
