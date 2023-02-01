// form
import { useFormContext, Controller } from "react-hook-form";
// @mui
import { Radio, RadioGroup, FormHelperText, RadioGroupProps, FormControlLabel, Box, Stack, alpha } from "@mui/material";
import Iconify from "../iconify/Iconify";

// ----------------------------------------------------------------------

type Props = RadioGroupProps & {
	name: string;
	options: readonly {
		readonly value: string;
		readonly label: string;
		readonly color: "info" | "warning" | "error" | "success" | "primary";
	}[];
};

export default function RHFRadioGroup({ name, options, ...other }: Props) {
	const { control } = useFormContext();

	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState: { error } }) => (
				<div>
					<RadioGroup {...field} row {...other}>
						{options.map((option) => {
							const selected = option.value === field.value;

							return (
								<Box key={option.value} sx={{ position: "relative", mr: 1, mt: 1 }}>
									<Stack
										spacing={0.5}
										direction="row"
										alignItems="center"
										sx={{
											pl: "4px",
											pr: "10px",
											fontWeight: "fontWeightBold",
											height: 28,
											fontSize: 12,
											borderRadius: 0.75,

											border: (theme) => `solid 1px ${alpha(theme.palette.grey[500], 0.24)}`,
											...(selected && {
												color: (theme) => theme.palette[option.color].main,
												border: (theme) => `solid 1px ${theme.palette[option.color].main}`,
												bgcolor: (theme) => alpha(theme.palette[option.color].main, 0.08),
											}),
										}}
									>
										<Stack
											alignItems="center"
											justifyContent="center"
											sx={{ width: 16, height: 16, mr: 0.5 }}
										>
											{selected ? (
												<Iconify icon="eva:checkmark-fill" width={16} />
											) : (
												<Box
													sx={{
														width: 8,
														height: 8,
														borderRadius: "50%",
														bgcolor: (theme) => theme.palette[option.color].main,
													}}
												/>
											)}
										</Stack>
										{option.label}
									</Stack>

									<FormControlLabel
										key={option.value}
										value={option.value}
										control={<Radio sx={{ display: "none" }} />}
										label=""
										sx={{
											m: 0,
											top: 0,
											left: 0,
											right: 0,
											bottom: 0,
											position: "absolute",
										}}
									/>
								</Box>
							);
						})}
					</RadioGroup>

					{!!error && (
						<FormHelperText error sx={{ px: 2 }}>
							{error.message}
						</FormHelperText>
					)}
				</div>
			)}
		/>
	);
}
