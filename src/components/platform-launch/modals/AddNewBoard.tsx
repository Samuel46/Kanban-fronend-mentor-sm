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
} from "@mui/material";
import { pxToRem } from "src/theme/typography";
import Iconify from "@common/components/iconify/Iconify";

export default function AddNewBoard() {
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
			<MuiButton onClick={handleClickOpen}>+ Create New Board</MuiButton>
			{/* TODO: overwrite dialog component, to extend the new maxwidth xs */}
			<Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
				<DialogTitle sx={{ mt: pxToRem(16) }}>Add New Board</DialogTitle>
				<DialogContent>
					<Stack spacing={3}>
						<FormControl variant="outlined" sx={{ width: "100%" }}>
							<Label htmlFor="name">Name</Label>
							<TextField
								autoFocus
								margin="dense"
								id="name"
								placeholder="e.g. Take coffee break"
								fullWidth
								inputProps={{
									style: { fontSize: pxToRem(13), color: theme.palette.grey[500] },
								}}
							/>
						</FormControl>

						<FormControl variant="outlined" sx={{ width: "100%" }}>
							<Label htmlFor="subtasks">Columns</Label>
							<Stack spacing={2}>
								<Box display="flex" alignItems="center" gap={pxToRem(10)}>
									<TextField
										margin="dense"
										autoFocus
										id="subtasks"
										placeholder="e.g. Drink coffee & smile"
										fullWidth
										variant="outlined"
										select
										inputProps={{
											style: { fontSize: pxToRem(13), color: theme.palette.grey[500] },
										}}
										SelectProps={{
											IconComponent: (props) => (
												<Iconify icon={"ic:round-keyboard-arrow-down"} {...props} />
											),
										}}
									>
										<MenuItem sx={{ typography: "body1", fontWeight: "500" }} value="Doing">
											Doing
										</MenuItem>
									</TextField>
									<IconButton>
										<img src="../icons/x.svg" alt="remove column" />
									</IconButton>
								</Box>
								<Box display="flex" alignItems="center" gap={pxToRem(10)}>
									<TextField
										margin="dense"
										autoFocus
										id="subtasks"
										placeholder="e.g. Drink coffee & smile"
										fullWidth
										variant="outlined"
										select
										inputProps={{
											style: { fontSize: pxToRem(13), color: theme.palette.grey[500] },
										}}
										SelectProps={{
											IconComponent: (props) => (
												<Iconify icon={"ic:round-keyboard-arrow-down"} {...props} />
											),
										}}
									>
										<MenuItem sx={{ typography: "body1", fontWeight: "500" }} value="Doing">
											Doing
										</MenuItem>
									</TextField>

									<IconButton>
										<img src="../icons/x.svg" alt="remove column" />
									</IconButton>
								</Box>
								<Button onClick={handleClose} sx={{ alignSelf: "center" }} fullWidth buttonType="secondary">
									+ Add New Column
								</Button>
							</Stack>
						</FormControl>
					</Stack>

					<Box mb={pxToRem(32)} mt={pxToRem(24)}>
						<Button onClick={handleClose} fullWidth>
							Create New Board
						</Button>
					</Box>
				</DialogContent>
			</Dialog>
		</div>
	);
}
