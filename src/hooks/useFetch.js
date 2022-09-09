import { useEffect, useState } from "react";

const useFetch = (url = '', options = null) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        let isMounted = true;

        setLoading(true);

        fetch(url, options)
            .then(res => res.json())
            .then(data => {
                if (isMounted) {
                    setData(data);
                    setError(null);
                }
            })
            .catch(error => {
                if (isMounted) {
                    setError(error);
                    setData(null);
                }
            })
            .finally(() => isMounted && setLoading(false));

        return () => (isMounted = false);
    }, [url, options]);

    return { loading, error, data };
};

export default useFetch;

//https://github.com/AlterClassIO/react-custom-hooks/blob/481b41080693496ba42abddc71234749ff527693/docs/useFetch.md