import { createTheme } from '@material-ui/core';
import { useEffect, useState } from 'react';
import useLocalStorage from './useLocalStorage';

const matchDark = '(prefers-color-scheme: dark)';
/**
 ** **returns [theme, themeChoice, setThemeChoice]**
 ** **theme** \<Object\> - can be used in Material-UI \<ThemeProvider\>.
 ** **themeChoice** \<Object\> - current theme choice.
 *>  *themeChoice object format* = {\
 *>  &ensp; background: 'auto' or 'light' or 'dark',\
 *>  &ensp; primary: 'blue' or 'green' or 'violet',\
 *>  &ensp; secondary: 'amber' or 'orange' or 'pink'\
 *>  }
 ** **setThemeChoice** \<function\> - takes an object in *themeChoice object format* as a parameter to save new theme choice in local storage.
 */
const useThemeMaker = () => {
	const [themeChoice, setThemeChoice] = useLocalStorage('theme-choice', {
		background: 'auto',
		primary: 'blue',
		secondary: 'amber',
	});
	const [theme, setTheme] = useState(
		makeTheme(themeChoice.background, themeChoice.primary, themeChoice.secondary),
	);
	const [isDark, setIsDark] = useState(
		() => window.matchMedia && window.matchMedia(matchDark).matches,
	);

	useEffect(() => {
		if (themeChoice.background === 'auto') {
			const matcher = window.matchMedia(matchDark);
			const onChange = ({ matches }) => setIsDark(matches);
			matcher.addListener(onChange);
			if (!isDark) {
				setTheme(makeTheme('light', themeChoice.primary, themeChoice.secondary));
			} else {
				setTheme(makeTheme('dark', themeChoice.primary, themeChoice.secondary));
			}
			return () => {
				matcher.removeListener(onChange);
			};
		} else {
			setTheme(makeTheme(themeChoice.background, themeChoice.primary, themeChoice.secondary));
		}
	}, [isDark, themeChoice.background, themeChoice.primary, themeChoice.secondary]);

	return [theme, themeChoice, setThemeChoice];
};

const makeTheme = (background, primary, secondary) => {
	let paletteType = 'light';
	let chosenPrimary = customPrimaryBlueLight;
	let chosenSecondary = customSecondaryAmberLight;
	let chosenBackground = customBackgroundLight;
	//let chosenError = customErrorLight;
	//let chosenWarning = customWarningLight;
	//let chosenInfo = customInfoLight;
	//let chosenSuccess = customSuccessLight;

	if (background === 'dark' && primary === 'green') {
		paletteType = 'dark';
		chosenPrimary = customPrimaryGreenDark;
		chosenBackground = customBackgroundDark;
		//chosenError = customErrorDark;
		//chosenWarning = customWarningDark;
		//chosenInfo = customInfoDark;
		//chosenSuccess = customSuccessDark;
	} else if (background === 'dark' && primary === 'violet') {
		paletteType = 'dark';
		chosenPrimary = customPrimaryVioletDark;
		chosenBackground = customBackgroundDark;
		//chosenError = customErrorDark;
		//chosenWarning = customWarningDark;
		//chosenInfo = customInfoDark;
		//chosenSuccess = customSuccessDark;
	} else if (background === 'dark') {
		paletteType = 'dark';
		chosenPrimary = customPrimaryBlueDark;
		chosenBackground = customBackgroundDark;
		//chosenError = customErrorDark;
		//chosenWarning = customWarningDark;
		//chosenInfo = customInfoDark;
		//chosenSuccess = customSuccessDark;
	} else if (primary === 'green') {
		chosenPrimary = customPrimaryGreenLight;
	} else if (primary === 'violet') {
		chosenPrimary = customPrimaryVioletLight;
	}

	if (background === 'dark' && secondary === 'orange') {
		chosenSecondary = customSecondaryOrangeDark;
	} else if (background === 'dark' && secondary === 'pink') {
		chosenSecondary = customSecondaryPinkDark;
	} else if (background === 'dark') {
		chosenSecondary = customSecondaryAmberDark;
	} else if (secondary === 'orange') {
		chosenSecondary = customSecondaryOrangeLight;
	} else if (secondary === 'pink') {
		chosenSecondary = customSecondaryPinkLight;
	}

	return createTheme({
		palette: {
			type: paletteType,
			primary: {
				...chosenPrimary,
			},
			secondary: {
				...chosenSecondary,
			},
			background: {
				...chosenBackground,
			},
			/* 
			error: {
				...chosenError,
			},
			warning: {
				...chosenWarning,
			},
			info: {
				...chosenInfo,
			},
			success: {
				...chosenSuccess,
			}, 
			*/
		},
		...customCommonStyles,
	});
};

const customPrimaryBlueLight = {
	main: '#039be5',
	contrastText: '#fff',
};
const customPrimaryBlueDark = {
	main: '#29b6f6',
	contrastText: '#000',
};
const customPrimaryGreenLight = {
	main: '#4caf50',
	contrastText: '#fff',
};
const customPrimaryGreenDark = {
	main: '#66bb6a',
	contrastText: '#000',
};
const customPrimaryVioletLight = {
	main: '#9050ff',
	contrastText: '#fff',
};
const customPrimaryVioletDark = {
	main: '#b279ff',
	contrastText: '#000',
};
const customSecondaryAmberLight = {
	main: '#f57c00',
	contrastText: '#fff',
};
const customSecondaryAmberDark = {
	main: '#ff9800',
	contrastText: '#000',
};
const customSecondaryOrangeLight = {
	main: '#ff5722',
	contrastText: '#fff',
};
const customSecondaryOrangeDark = {
	main: '#ff7043',
	contrastText: '#000',
};
const customSecondaryPinkLight = {
	main: '#f40658',
	contrastText: '#fff',
};
const customSecondaryPinkDark = {
	main: '#ff5c86',
	contrastText: '#000',
};
/* 
const customErrorLight = {
	main: '#f44336',
	contrastText: '#fff',
};
const customErrorDark = {
	main: '#ef5350',
	contrastText: '#000',
};
const customWarningLight = {
	main: '#ff9800',
	contrastText: '#fff',
};
const customWarningDark = {
	main: '#ffa726',
	contrastText: '#000',
};
const customInfoLight = {
	main: '#2196f3',
	contrastText: '#fff',
};
const customInfoDark = {
	main: '#42a5f5',
	contrastText: '#000',
};
const customSuccessLight = {
	main: '#4caf50',
	contrastText: '#fff',
};
const customSuccessDark = {
	main: '#66bb6a',
	contrastText: '#000',
};
*/
const customBackgroundLight = {
	paper: '#fff',
	default: '#f5f5f5',
};
const customBackgroundDark = {
	paper: '#35363a',
	default: '#212121',
};

const customCommonStyles = {
	breakpoints: {
		keys: ['xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl'],
		values: {
			xxs: 0,
			xs: 414,
			sm: 576,
			md: 768,
			lg: 992,
			xl: 1200,
			xxl: 1400,
		},
	},
	typography: {
		fontFamily: `'Roboto', 'Baloo Da 2', sans-serif`,
		h1: {
			fontSize: '5rem',
			fontFamily: `'Poppins', 'Baloo Da 2', sans-serif`,
		},
		h2: {
			fontFamily: `'Poppins', 'Baloo Da 2', sans-serif`,
		},
		h3: {
			fontFamily: `'Poppins', 'Baloo Da 2', sans-serif`,
		},
		h4: {
			fontFamily: `'Poppins', 'Baloo Da 2', sans-serif`,
		},
		h5: {
			fontFamily: `'Poppins', 'Baloo Da 2', sans-serif`,
		},
		h6: {
			fontFamily: `'Poppins', 'Baloo Da 2', sans-serif`,
		},
	},
	shape: {
		borderRadius: 8,
	},
};

export default useThemeMaker;

/*
const customPrimaryBlueLight = {
    light: '#29b6f6',
    main: '#039be5',
    dark: '#0277bd',
    contrastText: '#fff',
};
const customPrimaryBlueDark = {
    light: '#4fc3f7',
    main: '#29b6f6',
    dark: '#039be5',
    contrastText: '#000',
};
const customPrimaryGreenLight = {
    light: '#81c784',
    main: '#4caf50',
    dark: '#388e3c',
    contrastText: '#fff',
};
const customPrimaryGreenDark = {
    light: '#81c784',
    main: '#66bb6a',
    dark: '#43a047',
    contrastText: '#000',
};
const customPrimaryVioletLight = {
    light: '#a773ff',
    main: '#9050ff',
    dark: '#6b22f6',
    contrastText: '#fff',
};
const customPrimaryVioletDark = {
    light: '#bc90ff',
    main: '#b279ff',
    dark: '#812fed',
    contrastText: '#000',
};
const customSecondaryAmberLight = {
    light: '#ff9800',
    main: '#f57c00',
    dark: '#e65100',
    contrastText: '#fff',
};
const customSecondaryAmberDark = {
    light: '#ffb74d',
    main: '#ff9800',
    dark: '#f57c00',
    contrastText: '#000',
};
const customSecondaryOrangeLight = {
    light: '#ff8a65',
    main: '#ff5722',
    dark: '#e64a19',
    contrastText: '#fff',
};
const customSecondaryOrangeDark = {
    light: '#ff8a65',
    main: '#ff7043',
    dark: '#f4511e',
    contrastText: '#000',
};
const customSecondaryPinkLight = {
    light: '#fb5d8a',
    main: '#f40658',
    dark: '#cd0052',
    contrastText: '#fff',
};
const customSecondaryPinkDark = {
    light: '#ff7aa9',
    main: '#ff5c86',
    dark: '#f1436e',
    contrastText: '#000',
};
const customBackgroundLight = {
    paper: '#fff',
    default: '#f5f5f5',
};
const customBackgroundDark = {
    paper: '#35363a',
    default: '#212121',
};
*/
