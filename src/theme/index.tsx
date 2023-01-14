import { useMemo } from "react";
// @mui
import { CssBaseline } from "@mui/material";
import { createTheme, ThemeOptions, ThemeProvider as MUIThemeProvider } from "@mui/material/styles";
// components
import { useSettingsContext } from "@common/components/settings";
//
import palette from "./palette";
import typography from "./typography";

import GlobalStyles from "./globalStyles";

// ----------------------------------------------------------------------

type Props = {
	children: React.ReactNode;
};

export default function ThemeProvider({ children }: Props) {
	const { themeMode } = useSettingsContext();

	const themeOptions: ThemeOptions = useMemo(
		() => ({
			palette: palette(themeMode),
			typography,
			shape: { borderRadius: 8 },
		}),
		[themeMode]
	);

	const theme = createTheme(themeOptions);

	return (
		<MUIThemeProvider theme={theme}>
			<CssBaseline />
			<GlobalStyles />
			{children}
		</MUIThemeProvider>
	);
}
