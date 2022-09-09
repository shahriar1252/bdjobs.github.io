import { useEffect, useRef } from "react";

const useEventListener = (
    eventType = '',
    listener = () => null,
    target = window,
    options = null
) => {
    const savedListener = useRef();

    useEffect(() => {
        savedListener.current = listener;
    }, [listener]);

    useEffect(() => {
        if (!target?.addEventListener) return;

        const eventListener = event => savedListener.current(event);

        target.addEventListener(eventType, eventListener, options);

        return () => {
            target.removeEventListener(eventType, eventListener, options);
        };
    }, [eventType, target, options]);
};

export default useEventListener;

//https://github.com/AlterClassIO/react-custom-hooks/blob/481b41080693496ba42abddc71234749ff527693/docs/useEventListener.md