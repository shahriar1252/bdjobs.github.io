import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PaletteIcon from '@material-ui/icons/Palette';
import GetAppIcon from '@material-ui/icons/GetApp';
import PolicyIcon from '@material-ui/icons/Policy';
import BugReportIcon from '@material-ui/icons/BugReport';
import InfoIcon from '@material-ui/icons/Info';
import { Link } from 'react-router-dom';

import { about, privacyPolicy, reportBug } from '../utils/fixedRoutes';

const OptionsMenu = ({
	anchorPosition,
	isOptionsMenuOpen,
	setIsOptionsMenuOpen,
	setIsThemeChangerOpen,
	setIsInstallDialogOpen,
	changeLanguage,
}) => {
	const handleMenuClose = () => {
		setIsOptionsMenuOpen(false);
	};
	const handleThemeChangerOpen = () => {
		setIsThemeChangerOpen(true);
		setIsOptionsMenuOpen(false);
	};
	const handleInstallOpen = () => {
		setIsInstallDialogOpen(true);
		setIsOptionsMenuOpen(false);
	};

	return (
		<Menu
			open={isOptionsMenuOpen}
			onClose={handleMenuClose}
			anchorReference='anchorPosition'
			anchorPosition={anchorPosition}
			id='header-more-options-menu'>
			{/* <MenuItem disabled dense>
				<ListItemText secondary='Options' />
			</MenuItem> */}

			<MenuItem dense divider button onClick={handleThemeChangerOpen}>
				<ListItemIcon>
					<PaletteIcon />
				</ListItemIcon>

				<ListItemText primary='Change Theme' />
			</MenuItem>

			<MenuItem dense divider button onClick={handleInstallOpen}>
				<ListItemIcon>
					<GetAppIcon />
				</ListItemIcon>

				<ListItemText primary='Install App' />
			</MenuItem>

			{/* <MenuItem disabled dense>
				<ListItemText secondary='Important Links' />
			</MenuItem>

			<MenuItem dense component={Link} to={privacyPolicy} onClick={handleMenuClose}>
				<ListItemIcon>
					<PolicyIcon />
				</ListItemIcon>

				<ListItemText primary='Privacy &amp; Policy' />
			</MenuItem>

			<MenuItem dense component={Link} to={reportBug} onClick={handleMenuClose}>
				<ListItemIcon>
					<BugReportIcon />
				</ListItemIcon>

				<ListItemText primary='Report A Problem' />
			</MenuItem> */}

			<MenuItem dense component={Link} to={about} onClick={handleMenuClose}>
				<ListItemIcon>
					<InfoIcon />
				</ListItemIcon>

				<ListItemText primary='About Me' />
			</MenuItem>
		</Menu>
	);
};

export default OptionsMenu;
