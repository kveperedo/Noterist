import { useEffect, useRef } from 'react'

const usePrevious = value => {
    const ref = useRef()

    useEffect(() => {
        ref.current = value
    })

    return ref.current
}

export default usePrevious

// FUNCTIONALITY

// returns a value that allows you to compare previous props from new props

// input (props)

// output (previousProps)