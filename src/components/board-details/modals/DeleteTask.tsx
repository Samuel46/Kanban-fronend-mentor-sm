import * as React from "react";
// components
import Button from "@common/components/button";
// @mui
import { Stack, Dialog, DialogContent, DialogTitle, useTheme, Box, Typography, MenuItem } from "@mui/material";
import { pxToRem } from "src/theme/typography";
import { dispatch } from "@redux/store";
import { deleteTask } from "@redux/slice/task";

type Props = {
	id?: string;
	handleCloseMenu: () => void;
};

export default function DeleteTask({ id, handleCloseMenu }: Props) {
	const [open, setOpen] = React.useState(false);

	const theme = useTheme();

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleDelete = () => {
		dispatch(deleteTask(id));
		handleClose();
		handleCloseMenu();
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
				Delete Task
			</MenuItem>
			{/* TODO: overwrite dialog component, to extend the new maxwidth xs */}
			<Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
				<DialogTitle sx={{ mt: pxToRem(20), color: theme.palette.error.main }}>Delete this Task?</DialogTitle>
				<DialogContent>
					<Stack spacing={3} mb={pxToRem(32)}>
						<Typography fontSize={pxToRem(13)} lineHeight={pxToRem(23)} color={theme.palette.grey[500]}>
							Are you sure you want to delete the ‘Build settings UI’ task and its subtasks? This action cannot be
							reversed.
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
