const generateColor = (prevColor) => {
	const colors = [
		'#F94144',
		'#F9844A',
		'#43AA8B',
		'#277DA1',
		'#F3722C',
		'#4D908E',
		'#F8961E',
		'#90BE6D',
		'#577590',
		'#2F2F2F',
	];
	const index = Math.floor(Math.random() * colors.length);

	if (prevColor === colors[index]) return generateColor();

	return colors[index];
};

export default generateColor;
