import React, { useState } from 'react';
//Material UI core
import IconButton from '@material-ui/core/IconButton';
import Popover from '@material-ui/core/Popover';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Tooltip from '@material-ui/core/Tooltip';
import { makeStyles } from '@material-ui/core/styles';
//Material UI icons
import SearchIcon from '@material-ui/icons/Search';
//React router
import { useHistory } from 'react-router-dom';
//Fixed Routes
import { search } from '../utils/fixedRoutes';

const SearchMenu = ({ isSearchMenuOpen, setIsSearchMenuOpen }) => {
	const classes = useStyles();
	const history = useHistory();

	const [searchQuery, setSearchQuery] = useState('');
	const handleMenuClose = () => {
		setIsSearchMenuOpen(false);
	};
	const handleSearchPush = (event) => {
		event.target.blur();
		history.push(`${search}/${searchQuery}`);
		handleMenuClose();
	};

	return (
		<React.Fragment>
			<Popover
				open={isSearchMenuOpen}
				onClose={handleMenuClose}
				anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
				transformOrigin={{ vertical: 'center', horizontal: 'center' }}
				id='search-menu-popup'>
				<div className={classes.searchMenuContainer}>
					<OutlinedInput
						type='search'
						placeholder='Search...'
						fullWidth
						autoFocus
						onChange={(event) => setSearchQuery(event.target.value)}
						onKeyPress={(event) => {
							if (event.key === 'Enter') handleSearchPush(event);
						}}
						inputProps={{
							'aria-label': 'input search query',
							className: classes.searchMenuInput,
						}}
						endAdornment={
							<Tooltip title='Show search results'>
								<IconButton
									onClick={(event) => handleSearchPush(event)}
									aria-label='show search results'
									size='small'
									edge='end'>
									<SearchIcon />
								</IconButton>
							</Tooltip>
						}
					/>
				</div>
			</Popover>
		</React.Fragment>
	);
};

const useStyles = makeStyles((theme) => ({
	searchMenuContainer: {
		minWidth: 280,
		minHeight: 60,
		padding: theme.spacing(1),
		boxShadow: `0px 0px 4px 0px ${theme.palette.action.selected} inset`,
		[theme.breakpoints.up('xs')]: {
			minWidth: 360,
		},
		[theme.breakpoints.up('sm')]: {
			minWidth: 480,
		},
	},
	searchMenuInput: {
		padding: theme.spacing(1.5, 1, 1.5, 2),
		'&::-webkit-search-cancel-button': {
			appearance: 'none',
		},
	},
}));
export default SearchMenu;
