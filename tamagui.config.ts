import { color, radius, size, space, themes, zIndex } from '@tamagui/themes';
import { createTamagui, createTokens } from 'tamagui';

// Define the Digitalt font for headings and body
const headingFont = {
	family: 'Digitalt', // Define font family name
	size: {
		1: 18,
		2: 20,
		3: 24,
		4: 28,
		5: 32,
		6: 36,
	},
	lineHeight: {
		1: 22,
		2: 24,
		3: 28,
		4: 32,
		5: 36,
		6: 40,
	},
	weight: {
		1: '400', // Regular weight
		2: '700', // Bold weight
	},
	letterSpacing: {
		1: 1, // Set default letter spacing
	},
};

const bodyFont = headingFont; // Reuse the same configuration for body text

// Create tokens
const tokens = createTokens({
	size,
	space,
	zIndex,
	color,
	radius,
});

// Convert HSL colors to RGB for placeholder styling
const rgbBlue12Light = hslToRgb(tokens.color.blue12Light.val);
const rgbBlue12Dark = hslToRgb(tokens.color.blue12Dark.val);

// Define your custom theme with blue color shades
const jokeCentralTheme = {
	light: {
		...themes.light,

		background: "white",
		backgroundHighlight: "#D1D8FF",
		background2: tokens.color.blue4Dark,

		inputBorder: "#bfbfbf",
		inputBorderFocus: tokens.color.blue4Dark,

		// Purple colors
		accentPurpleLight: "#C16DFE",
		accentPurpleMedium: "#A75CF4",
		accentPurpleDark: "#9F51FE",
		accentPurpleDarkest: "#7054FE",

		accentBlueLight: tokens.color.blue7Light,
		accentBlueMedium: tokens.color.blue8Light,
		accentBlueDark: tokens.color.blue9Light,

		// Pink colors
		accentPinkLight: "#FDC0FF",
		accentPinkMedium: "#FC8AFF",
		accentPinkDark: "#DA57F0",
		accentPinkDarkest: "#B20D78",

		// Yellow colors
		accentYellowLight: "#FFDD17",
		accentYellowMedium: "#FFC715",
		accentYellowDark: "#FFB213",
		accentYellowDarkest: "#FF8413",

		// Green colors
		accentGreenLight: "#92F200",
		accentGreenMedium: "#86EE04",
		accentGreenDark: "#67EB00",
		accentGreenDarkest: "#4EC307",

		// Red colors
		accentRedMedium: "#FF4672",
		accentRedDark: "#E90038",

		// Metals
		accentGold: "#AE824E",
		accentSilver: "#BCBABE",
		accentBronze: "#824F14",

		text1: tokens.color.gray9Dark,
		textPlaceholder: tokens.color.gray11Dark,

		enableShadow: 1,
		isLightMode: 1,
	},

	dark: {
		...themes.dark,

		background: tokens.color.blue1Dark,
		backgroundHighlight: tokens.color.blue2Dark,
		background2: "white",

		inputBorder: "white",
		inputBorderFocus: "white",

		// Purple colors
		accentPurpleLight: "#9F51FE",
		accentPurpleMedium: "#8B47E0",
		accentPurpleDark: "#763CC2",
		accentPurpleDarkest: "#5B2E99",

		// Blue colors (using tokens)
		accentBlueLight: "#5CB3D1",
		accentBlueMedium: "#309AB8",
		accentBlueDark: "#0078A3",

		// Pink colors
		accentPinkLight: "#E0A8E0",
		accentPinkMedium: "#D488DC",
		accentPinkDark: "#B06FB8",
		accentPinkDarkest: "#8A558F",

		// Yellow colors
		accentYellowLight: "#FFB213",
		accentYellowMedium: "#FFA000",
		accentYellowDark: "#FF8C00",
		accentYellowDarkest: "#CC7000",

		// Green colors
		accentGreenLight: "#A0D67D",
		accentGreenMedium: "#91C673",
		accentGreenDark: "#78AD5E",
		accentGreenDarkest: "#60924B",


		// Red colors
		accentRedMedium: "#E83F60",
		accentRedDark: "#C8003A",


		// Metals
		accentGold: "#AE824E",
		accentSilver: "#BCBABE",
		accentBronze: "#824F14",

		text1: "white",
		textPlaceholder: tokens.color.gray11Light,

		enableShadow: 0,
		isLightMode: 0,
	},
}

// Create the Tamagui configuration
const config = createTamagui({
	fonts: {
		heading: headingFont,
		body: bodyFont,
	},
	themes: jokeCentralTheme,
	tokens,
});

export type AppConfig = typeof config;

declare module 'tamagui' {
	interface TamaguiCustomConfig extends AppConfig { }
}

declare module '@tamagui/core' {
	interface TamaguiCustomConfig extends AppConfig { }
}

// Helper function to convert HSL to RGB
function hslToRgb(hsl: string) {
	const [hue, sat, light] = hsl
		.substring(4, hsl.length - 1)
		.split(',')
		.map((value) => parseFloat(value.trim()) / 100); // Ensure proper scaling for saturation and lightness

	const hueScaled = hue * 360; // Hue should be in the range of 0-360
	let r, g, b;

	if (sat === 0) {
		r = g = b = light; // achromatic
	} else {
		const c = (1 - Math.abs(2 * light - 1)) * sat;
		const x = c * (1 - Math.abs(((hueScaled / 60) % 2) - 1));
		const m = light - c / 2;

		let rgb: [number, number, number];

		if (hueScaled >= 0 && hueScaled < 60) {
			rgb = [c, x, 0];
		} else if (hueScaled >= 60 && hueScaled < 120) {
			rgb = [x, c, 0];
		} else if (hueScaled >= 120 && hueScaled < 180) {
			rgb = [0, c, x];
		} else if (hueScaled >= 180 && hueScaled < 240) {
			rgb = [0, x, c];
		} else if (hueScaled >= 240 && hueScaled < 300) {
			rgb = [x, 0, c];
		} else if (hueScaled >= 300 && hueScaled < 360) {
			rgb = [c, 0, x];
		} else {
			rgb = [0, 0, 0];
		}

		r = Math.round((rgb[0] + m) * 255);
		g = Math.round((rgb[1] + m) * 255);
		b = Math.round((rgb[2] + m) * 255);
	}

	return { r, g, b };
}

export default config;
