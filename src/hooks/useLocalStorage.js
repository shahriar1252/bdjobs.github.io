import { useState } from "react";
const useLocalStorage = (key = '', initialValue = '') => {
    const [state, setState] = useState(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.warn(`Unable to get value for "${key}". ${error}`);
            return initialValue;
        }
    });

    const setLocalStorageState = newState => {
        try {
            const newStateValue =
                newState instanceof Function ? newState(state) : newState;
            setState(newStateValue);
            window.localStorage.setItem(key, JSON.stringify(newStateValue));
        } catch (error) {
            console.error(`Unable to store new value for "${key}". ${error}`);
        }
    };

    return [state, setLocalStorageState];
};

export default useLocalStorage;

//https://github.com/AlterClassIO/react-custom-hooks/blob/481b41080693496ba42abddc71234749ff527693/docs/useLocalStorage.md