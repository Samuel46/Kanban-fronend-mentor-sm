import * as React from "react";
// components
import Label from "@common/components/label/Label";
import Button from "@common/components/button";
// @mui
import {
	MenuItem,
	Stack,
	TextField,
	Dialog,
	DialogContent,
	DialogTitle,
	useTheme,
	FormControl,
	Box,
	Button as MuiButton,
	IconButton,
	Typography,
} from "@mui/material";
import { pxToRem } from "src/theme/typography";
import Iconify from "@common/components/iconify/Iconify";

export default function DeleteBoard() {
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
			<MuiButton onClick={handleClickOpen}>Delete Board</MuiButton>
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
