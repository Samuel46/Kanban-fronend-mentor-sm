export type ColorSchema = "primary" | "secondary" | "error";

declare module "@mui/material/styles/createPalette" {
	interface TypeBackground {
		neutral: string;
	}
	interface SimplePaletteColorOptions {
		btn?: string;
		btnHover?: string;
		btnText?: string;
		error?: string;
		border?: string;
	}
	interface PaletteColor {
		btn: string;
		btnHover: string;
		btnText: string;
		error: string;
		border?: string;
	}
	interface Palette {
		border?: string;
		columnBg?: string;
	}
}

// COLORS SETUP

const GREY = {
	0: "#FFFFFF",
	100: "#F9FAFB",
	200: "#F4F6F8",
	300: "#DFE3E8",
	400: "#C4CDD5",
	500: "#828FA3",
	600: "#637381",
	700: "#454F5B",
	800: "#212B36",
	900: "#161C24",
	1000: "828FA3",
};

const PRIMARY = {
	main: "#635FC7",
	light: "#A8A4FF",
	//
	btn: "#635FC7",
	btnHover: "#A8A4FF",
	btnText: "#FFFFFF",
};

const SECONDARY = {
	main: "#E4EBFA",
	light: "#F4F7FD",
	//
	btn: "rgba(99, 95, 199, 0.1)",
	btnHover: "rgba(99, 95, 199, 0.25);",
	btnText: "#635FC7",
};

const error = {
	main: "#EA5555",
	light: "#FF9898",
	//
	btn: "#EA5555",
	btnHover: "#FF9898",
	btnText: "#FFFFFF",
};

const COMMON = {
	common: { black: "#000112", white: "#FFFFFF" },
	primary: PRIMARY,
	secondary: SECONDARY,
	error: error,
	grey: GREY,
};

// TODO: fix the colors come up with cleaner way of implementing this

export default function palette(themeMode: "light" | "dark") {
	const light = {
		...COMMON,
		mode: "light",
		text: {
			primary: "#2B2C37;",
		},
		background: {
			paper: "#fff",
			default: "#F4F7FD",
			neutral: "linear-gradient(180deg, #E9EFFA 0%, rgba(233, 239, 250, 0.5) 100%)",
		},
		border: "#E4EBFA",
		// new column section
		columnBg: "linear-gradient(180deg, #E9EFFA 0%, rgba(233, 239, 250, 0.5) 100%)",
	} as const;

	const dark = {
		...COMMON,
		mode: "dark",
		text: {
			primary: "#fff",
		},
		background: {
			paper: "#2B2C37",
			default: "#2B2C37",
			neutral: "#20212C",
		},
		border: "rgba(62, 63, 78, 1)",
		columnBg: "linear-gradient(180deg, rgba(43, 44, 55, 0.25) 0%, rgba(43, 44, 55, 0.125) 100%);",
	} as const;

	return themeMode === "light" ? light : dark;
}
