import React, { useEffect } from "react";
// components
import Button from "@common/components/button";
// @mui
import { MenuItem, Stack, Dialog, DialogContent, DialogTitle, useTheme, Box, Typography } from "@mui/material";
import { pxToRem } from "src/theme/typography";
import { useRouter } from "next/router";
import { dispatch, RootState, useSelector } from "@redux/store";
import { deleteBoard } from "@redux/slice/board";

type Props = {
	handleCloseMenu: () => void;
};

export default function DeleteBoard({ handleCloseMenu }: Props) {
	const [open, setOpen] = React.useState(false);

	const theme = useTheme();

	const { query, push, replace } = useRouter();

	const { id } = query;

	const { boards } = useSelector((state: RootState) => state.board);

	const remaining = boards.filter((board) => board._id !== id);
	console.log(remaining, "remaining");

	const handleDelete = () => {
		dispatch(deleteBoard(id));
		handleClose();
		handleCloseMenu();
		replace(`/kanban/${remaining[0]?._id}`);
	};

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
					color: theme.palette.error.main,
					lineHeight: pxToRem(23),
					fontWeight: 500,
					fontSize: pxToRem(13),
				}}
			>
				Delete Board
			</MenuItem>
			{/* TODO: overwrite dialog component, to extend the new maxwidth xs */}
			<Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
				<DialogTitle sx={{ mt: pxToRem(20), color: theme.palette.error.main }}>Delete this board?</DialogTitle>
				<DialogContent>
					<Stack spacing={3} mb={pxToRem(32)}>
						<Typography fontSize={pxToRem(13)} lineHeight={pxToRem(23)} color={theme.palette.grey[500]}>
							Are you sure you want to delete the ‘Platform Launch’ board? This action will remove all columns and
							tasks and cannot be reversed.
						</Typography>
						<Box display="flex" alignItems="center" justifyContent="center">
							<Button onClick={handleDelete} buttonType="error" fullWidth>
								Delete
							</Button>
							<Button onClick={handleClose} buttonType="secondary" fullWidth>
								Cancel
							</Button>
						</Box>
					</Stack>
				</DialogContent>
			</Dialog>
		</div>
	);
}
