import React from 'react';
import { connect } from 'react-redux';

import Tabs from '../Tabs';
import ScratchContent from './ScratchContent';
import EmptyContent from '../EmptyContent';

import { createPad, deletePad, editPad } from '../../features/scratchSlice.js';

import '../../styles/ScratchPad.scss';
import emptyImage from '../../images/empty.svg';

const ScratchPad = (props) => {
	const { scratchpads, createPad, deletePad, editPad } = props;

	const onTabAdd = () => {
		createPad();
	};

	const onTabDelete = (id) => {
		deletePad(id);
	};

	const onTabEdit = (tab) => {
		editPad(tab);
	};

	return (
		<div className="scratchpad">
			<Tabs onTabAdd={onTabAdd} onTabDelete={onTabDelete}>
				{scratchpads.length ? (
					scratchpads.map((pad) => {
						return (
							<div id={pad.id} key={pad.id} title={pad.title} hasContent={!!pad.content}>
								<ScratchContent pad={pad} onTabEdit={onTabEdit} />
							</div>
						);
					})
				) : (
					<div className="empty-content-container">
						<EmptyContent
							image={emptyImage}
							title="No Scratchpads Available!"
							subtitle="Click on the plus icon on the upper right side to add a scratchpad."
						/>
					</div>
				)}
			</Tabs>
		</div>
	);
};

const mapStateToProps = (state) => {
	return { scratchpads: state.scratchpads };
};

export default connect(mapStateToProps, { createPad, editPad, deletePad })(ScratchPad);
