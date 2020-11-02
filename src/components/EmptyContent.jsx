import React from 'react';
import PropTypes from 'prop-types';

import '../styles/EmptyContent.scss';

const EmptyContent = (props) => {
	const { image, title, subtitle } = props;

	return (
		<div className="empty-content">
			<img className="image" src={image} alt="empty content" />
			<div className="text">
				<p className="title">{title}</p>
				<p className="subtitle">{subtitle}</p>
			</div>
		</div>
	);
};

EmptyContent.propTypes = {
	image: PropTypes.node.isRequired,
	title: PropTypes.string,
	subtitle: PropTypes.string,
};

export default EmptyContent;
