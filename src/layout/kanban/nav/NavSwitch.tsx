// components
import Iconify from "@common/components/iconify/Iconify";

import Switch from "@common/components/switch/Switch";
import useResponsive from "@common/hooks/useResponsive";
// mui
import { Box, Stack, useTheme } from "@mui/material";
// typography
import { pxToRem } from "src/theme/typography";
import NavToggle from "./NavToggle";

type Props = {
	handleToggle: () => void;
};

export default function NavSwitch({ handleToggle }: Props) {
	const theme = useTheme();
	const isPhone = useResponsive("down", "sm");

	return (
		<Stack spacing={2} mb={pxToRem(36)}>
			<Box
				sx={{
					background: theme.palette.background.neutral,
					borderRadius: pxToRem(6),
					height: pxToRem(48),
					/* top | right | bottom | left */
					margin: theme.spacing(0, 2.4, 0, 2.4),
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					cursor: "pointer",
				}}
			>
				<Stack
					spacing={3}
					p={3}
					direction="row"
					justifyContent="center"
					width={"100%"}
					sx={{ color: theme.palette.grey[500] }}
				>
					<Iconify icon="ri:moon-clear-fill" width={"10%"} />
					<Switch />
					<Iconify icon="ph:sun-fill" width={"10%"} />
				</Stack>
			</Box>
			{!isPhone && <NavToggle handleToggle={handleToggle} />}
		</Stack>
	);
}
