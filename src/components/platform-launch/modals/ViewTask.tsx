import * as React from "react";
// @mui
import {
	Stack,
	Dialog,
	DialogContent,
	DialogTitle,
	useTheme,
	Box,
	Typography,
	Card,
	Checkbox,
	FormControlLabel,
	FormControl,
	TextField,
	MenuItem,
} from "@mui/material";
// typography
import { pxToRem } from "src/theme/typography";
// components
import Label from "@common/components/label/Label";
import Iconify from "@common/components/iconify/Iconify";

type Props = {
	task: any;
};

export default function ViewTask({ task }: Props) {
	const [open, setOpen] = React.useState(false);

	const [checked, setChecked] = React.useState(true);

	const theme = useTheme();

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setChecked(event.target.checked);
	};

	return (
		<>
			<Card
				onClick={handleClickOpen}
				sx={{
					p: 2,
					borderRadius: pxToRem(8),
					bgcolor: "background.paper",
					transition: theme.transitions.create("all"),
					cursor: "pointer",
					boxShadow: "0px 4px 6px rgba(54, 78, 126, 0.101545);",
					"&:hover": {
						transform: "scale(.97)",
						color: theme.palette.primary.main,
					},

					"&:last-child": {
						mb: 5,
					},
				}}
				key={task.title}
			>
				<Typography variant="body1" fontWeight="600" mb={2}>
					{task.title}
				</Typography>
				<Typography variant="body2" sx={{ color: theme.palette.grey[500] }}>
					0 of {task.subtasks.length} substasks
				</Typography>
			</Card>
			{/* TODO: overwrite dialog component, to extend the new maxwidth xs */}
			<Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
				<DialogTitle sx={{ mt: pxToRem(20) }}>
					Research pricing points of various competitors and trial different business models
				</DialogTitle>
				<DialogContent>
					<Stack spacing={3} mb={pxToRem(32)}>
						<Typography
							fontSize={pxToRem(13)}
							lineHeight={pxToRem(23)}
							fontWeight="500"
							color={theme.palette.grey[500]}
						>
							We know what we're planning to build for version one. Now we need to finalise the first pricing model
							we'll use. Keep iterating the subtasks until we have a coherent proposition.
						</Typography>

						<Stack spacing={pxToRem(25)}>
							{/*
							 * This is the subtask header
							 */}
							<Typography variant="body1" sx={{ color: theme.palette.grey[500], mb: -1 }}>
								Subtasks (2 of 3)
							</Typography>

							{/*
							 * This is the subtask component
							 * Find a way to change the checkbox icon
							 *  Create a custom checkbox component
							 */}
							<Box
								sx={{
									background: theme.palette.secondary.light,
									px: pxToRem(12),
									borderRadius: pxToRem(4),
									height: pxToRem(40),
									color: theme.palette.grey[500],
									transition: theme.transitions.create("all"),
									cursor: "pointer",
									"&:hover": {
										backgroundColor: theme.palette.secondary.btnHover,
										color: theme.palette.common.black,
									},
								}}
							>
								<FormControlLabel
									control={
										<Checkbox
											defaultChecked
											checked={checked}
											onChange={handleChange}
											inputProps={{ "aria-label": "controlled" }}
										/>
									}
									label={
										<Typography
											variant="body2"
											sx={{ textDecoration: checked ? "line-through" : "", lineHeight: pxToRem(15) }}
										>
											Research competitor pricing and business models
										</Typography>
									}
								/>
							</Box>

							{/*
							 * Add the status section with the drop down
							 */}

							<FormControl variant="outlined" sx={{ width: "100%" }}>
								<Label htmlFor="subtasks">Current Status</Label>
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
										IconComponent: (props) => <Iconify icon={"ic:round-keyboard-arrow-down"} {...props} />,
									}}
								>
									<MenuItem sx={{ typography: "body1", fontWeight: "500" }} value="Doing">
										Doing
									</MenuItem>
									<MenuItem sx={{ typography: "body1", fontWeight: "500" }} value="Todo">
										Todo
									</MenuItem>
									<MenuItem sx={{ typography: "body1", fontWeight: "500" }} value="Done">
										Done
									</MenuItem>
								</TextField>
							</FormControl>
						</Stack>
					</Stack>
				</DialogContent>
			</Dialog>
		</>
	);
}
