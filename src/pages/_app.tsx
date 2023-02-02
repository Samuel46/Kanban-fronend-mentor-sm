import type { AppProps } from "next/app";

// emotion
import { CacheProvider, EmotionCache } from "@emotion/react";
// next
import { NextPage } from "next";
import Head from "next/head";
// redux
import { Provider as ReduxProvider } from "react-redux";
import { store } from "@redux/store";
// utils
import createEmotionCache from "../utils/createEmotionCache";
// theme
import ThemeProvider from "../theme";
import { SettingsProvider } from "@common/components/settings";
// components
import SnackbarProvider from "@common/components/snackbar/Snackbar";

const clientSideEmotionCache = createEmotionCache();

type NextPageWithLayout = NextPage & {
	getLayout?: (page: React.ReactElement) => React.ReactNode;
};

interface MyAppProps extends AppProps {
	emotionCache?: EmotionCache;
	Component: NextPageWithLayout;
}

export default function App({ Component, pageProps, emotionCache = clientSideEmotionCache }: MyAppProps) {
	const getLayout = Component.getLayout ?? ((page) => page);

	return (
		<CacheProvider value={emotionCache}>
			<Head>
				<meta name="viewport" content="initial-scale=1, width=device-width" />
			</Head>
			<ReduxProvider store={store}>
				<SettingsProvider>
					<ThemeProvider>
						<SnackbarProvider>{getLayout(<Component {...pageProps} />)}</SnackbarProvider>
					</ThemeProvider>
				</SettingsProvider>
			</ReduxProvider>
		</CacheProvider>
	);
}
