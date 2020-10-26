export const loadLocalStorage = () => {
    try {
        const serializedState = localStorage.getItem('noteristState')

        if (serializedState === null) return undefined

        return JSON.parse(serializedState)
    } catch (error) {
        return undefined
    }
}

export const saveLocalStorage = state => {
    try {
        const serializedState = JSON.stringify(state)
        localStorage.setItem('noteristState', serializedState)
    } catch (error) {

    }
}
