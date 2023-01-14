// @mui
import { useSettingsContext } from "@common/components/settings";
import { GlobalStyles as MUIGlobalStyles, useTheme } from "@mui/material";

// ----------------------------------------------------------------------

export default function GlobalStyles() {
	const theme = useTheme();
	// TODO: find another sol for the dark mode
	const { themeMode } = useSettingsContext();

	const inputGlobalStyles = (
		<MUIGlobalStyles
			styles={{
				"*": {
					boxSizing: "border-box",
				},
				html: {
					margin: 0,
					padding: 0,
					width: "100%",
					height: "100%",
					WebkitOverflowScrolling: "touch",
				},
				a: {
					textDecoration: "none",
				},
				body: {
					margin: 0,
					padding: 0,
					width: "100%",
					height: "100vh",
					background: themeMode === "light" ? theme.palette.background.default : theme.palette.background.neutral,
				},
				"#__next": {
					width: "100%",
					height: "100%",
				},
				input: {
					"&[type=number]": {
						MozAppearance: "textfield",
						"&::-webkit-outer-spin-button": {
							margin: 0,
							WebkitAppearance: "none",
						},
						"&::-webkit-inner-spin-button": {
							margin: 0,
							WebkitAppearance: "none",
						},
					},
				},
				img: {
					display: "block",
					maxWidth: "100%",
				},
				ul: {
					margin: 0,
					padding: 0,
				},
			}}
		/>
	);

	return inputGlobalStyles;
}
