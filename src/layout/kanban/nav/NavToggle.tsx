// components
import Iconify from "@common/components/iconify/Iconify";
// @mui
import { Box, Stack, Typography, useTheme } from "@mui/material";
// @typography
import { pxToRem } from "src/theme/typography";

type Props = {
	handleToggle: () => void;
};

export default function NavToggle({ handleToggle }: Props) {
	const theme = useTheme();
	const color = theme.palette;
	return (
		<Stack
			onClick={handleToggle}
			alignItems="start"
			justifyContent="center"
			sx={{
				color: color.grey[500],
				height: pxToRem(48),
				transition: "all 0.3s ease",
				borderRadius: "0px 100px 100px 0px",

				cursor: "pointer",
				"&:hover": {
					color: color.primary.main,
					background: color.secondary.light,
					marginRight: theme.spacing(2.4),
				},
			}}
		>
			<Box display="flex" gap={2} sx={{ margin: theme.spacing(0, 2.4, 0, 2.4) }}>
				<Iconify icon="ph:eye-slash" width={pxToRem(24)} />
				<Typography variant="body1">Hide Sidebar</Typography>
			</Box>
		</Stack>
	);
}
