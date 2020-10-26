import { useEffect, useRef } from 'react'

const useDidUpdateEffect = (fn, inputs) => {
    const didMountRef = useRef(false)

    useEffect(() => {
        if (didMountRef.current) fn()
        else didMountRef.current = true
    }, inputs)
}

export default useDidUpdateEffect

// FUNCTIONALITY

// same functionality with useEffect but only runs on updates

// input (callback func)

// output (none)