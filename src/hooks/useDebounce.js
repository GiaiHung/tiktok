import { useState, useEffect } from 'react'

function useDebounce(value, delay = 500) {
    const [debounceValue, setDebunceValue] = useState(value)
    useEffect(() => {
        const handler = setTimeout(() => setDebunceValue(value), delay)
        return () => clearTimeout(handler)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value])
    return debounceValue
}

export default useDebounce
