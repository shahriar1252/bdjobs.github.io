import { useLocation } from 'react-router';
/**
 * This function extracts a specific part of the url\
 * It splits the url into an array and returns the value from the selected position
 *
 * @param {number} position from which to return the value
 * @param {string} [rootRoute] [optional] root route of the app, usually '/'
 * @returns {string} name of route at the `position`
 *
 * Suppose, url is /home/books/bookname\
 * The array will be `["home", "books", "bookname"]`\
 * So, to get the the book name from this url :
 * @example
 * const bookName = useLocationLevel(2);
 */
const useLocationLevel = (position = 0, rootRoute = '/') => {
	const levels = useLocation().pathname.replace(rootRoute, '').split('/');
	return levels[position];
};

export default useLocationLevel;
