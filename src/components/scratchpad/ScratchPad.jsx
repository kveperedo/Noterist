import React from 'react';
import { connect } from 'react-redux';

import Tabs from '../Tabs';
import ScratchContent from './ScratchContent';
import EmptyContent from '../EmptyContent';

import { createScratch, deleteScratch, editScratch } from '../../actions';

import '../../styles/ScratchPad.scss';
import emptyImage from '../../images/empty.svg';

const ScratchPad = (props) => {
	const { scratchpads, createScratch, deleteScratch, editScratch } = props;

	const onTabAdd = () => {
		createScratch();
	};

	const onTabDelete = (id) => {
		deleteScratch(id);
	};

	const onTabEdit = (tab) => {
		editScratch(tab);
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

export default connect(mapStateToProps, { createScratch, deleteScratch, editScratch })(ScratchPad);
