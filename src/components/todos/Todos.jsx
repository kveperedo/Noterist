import React, { useState } from 'react';
import EditableText from '../EditableText';

import Logo from '../../images/edit-title.svg';

const Todos = () => {
	const [title, setTitle] = useState('testing');
	console.log(title);

	return <EditableText value={title} onChange={setTitle} image={Logo} hasDoubleClick hasEnterAbility />;
};

export default Todos;
