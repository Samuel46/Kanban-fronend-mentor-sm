// ----------------------------------------------------------------------

export function remToPx(value: string) {
	return Math.round(parseFloat(value) * 16);
}

export function pxToRem(value: number) {
	return `${value / 16}rem`;
}

export function responsiveFontSizes({ sm, md, lg }: { sm: number; md: number; lg: number }) {
	return {
		"@media (min-width:600px)": {
			fontSize: pxToRem(sm),
		},
		"@media (min-width:900px)": {
			fontSize: pxToRem(md),
		},
		"@media (min-width:1200px)": {
			fontSize: pxToRem(lg),
		},
	};
}

const FONT = "Plus Jakarta Sans";

// ----------------------------------------------------------------------

const typography = {
	fontWeightRegular: 400,
	fontWeightMedium: 600,
	fontWeightBold: 700,
	fontFamily: FONT,

	h1: {
		fontWeight: 700,
		lineHeight: pxToRem(30),
		fontSize: pxToRem(24),
		...responsiveFontSizes({ sm: 18, md: 24, lg: 24 }),
	},
	h2: {
		fontWeight: 700,
		lineHeight: pxToRem(23),
		fontSize: pxToRem(18),
		...responsiveFontSizes({ sm: 14, md: 18, lg: 20 }),
	},
	h3: {
		fontWeight: 700,
		lineHeight: pxToRem(19),
		fontSize: pxToRem(15),
		...responsiveFontSizes({ sm: 12, md: 15, lg: 18 }),
	},
	h4: {
		fontWeight: 700,
		lineHeight: pxToRem(15),
		fontSize: pxToRem(12),
		...responsiveFontSizes({ sm: 10, md: 12, lg: 14 }),
	},
	h5: {
		fontWeight: 700,
		lineHeight: 1.5,
		fontSize: pxToRem(18),
		...responsiveFontSizes({ sm: 19, md: 20, lg: 20 }),
	},
	h6: {
		fontWeight: 700,
		lineHeight: 28 / 18,
		fontSize: pxToRem(17),
		...responsiveFontSizes({ sm: 16, md: 18, lg: 20 }),
	},

	body1: {
		fontWeight: 700,
		lineHeight: pxToRem(23),
		fontSize: pxToRem(15),
	},
	body2: {
		lineHeight: pxToRem(15),
		fontSize: pxToRem(12),
		fontWeight: 700,
	},
	caption: {
		lineHeight: 1.5,
		fontSize: pxToRem(12),
	},
	overline: {
		fontWeight: 700,
		lineHeight: 1.5,
		fontSize: pxToRem(12),
		textTransform: "uppercase",
	},
	button: {
		fontWeight: 700,
		lineHeight: 24 / 14,
		fontSize: pxToRem(14),
		textTransform: "capitalize",
	},
} as const;

export default typography;
