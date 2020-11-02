import { useState } from 'react';

const useLocalStorage = (key, initialData) => {
	const [storedData, setStoredData] = useState(() => {
		try {
			const data = localStorage.getItem(key);
			return data ? JSON.parse(data) : initialData;
		} catch (error) {
			console.log(error);
			return initialData;
		}
	});

	const setValue = (data) => {
		try {
			const dataToStore = data instanceof Function ? data(storedData) : data;
			setStoredData(dataToStore);
			localStorage.setItem(key, JSON.stringify(dataToStore));
		} catch (error) {
			console.log(error);
		}
	};

	return [storedData, setValue];
};

export default useLocalStorage;
