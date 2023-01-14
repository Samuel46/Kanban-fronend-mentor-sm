import type { AppProps } from "next/app";

// emotion
import { CacheProvider, EmotionCache } from "@emotion/react";
// next
import { NextPage } from "next";
import Head from "next/head";
// utils
import createEmotionCache from "../utils/createEmotionCache";
// theme
import ThemeProvider from "../theme";
import { SettingsProvider } from "@common/components/settings";

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

			<SettingsProvider>
				<ThemeProvider>{getLayout(<Component {...pageProps} />)}</ThemeProvider>
			</SettingsProvider>
		</CacheProvider>
	);
}
