import * as React from "react";
// components
import Button from "@common/components/button";
// @mui
import { Stack, Dialog, DialogContent, DialogTitle, useTheme, Box, Button as MuiButton, Typography } from "@mui/material";
import { pxToRem } from "src/theme/typography";

export default function DeleteTask() {
	const [open, setOpen] = React.useState(false);

	const theme = useTheme();

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div>
			<MuiButton onClick={handleClickOpen}>Delete Task</MuiButton>
			{/* TODO: overwrite dialog component, to extend the new maxwidth xs */}
			<Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
				<DialogTitle sx={{ mt: pxToRem(20), color: theme.palette.error.main }}>Delete this board?</DialogTitle>
				<DialogContent>
					<Stack spacing={3} mb={pxToRem(32)}>
						<Typography fontSize={pxToRem(13)} lineHeight={pxToRem(23)} color={theme.palette.grey[500]}>
							Are you sure you want to delete the ‘Build settings UI’ task and its subtasks? This action cannot be
							reversed.
						</Typography>
						<Box display="flex" alignItems="center" justifyContent="center">
							<Button onClick={handleClose} buttonType="error" fullWidth>
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
