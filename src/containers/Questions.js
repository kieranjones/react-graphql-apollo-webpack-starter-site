import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import Sidebar from '../components/Sidebar';
import QuestionMain from '../components/QuestionMain';
import questionsQuery from '../queries/questionsQuery';

export class Questions extends Component {

	static propTypes = {
		data: PropTypes.object.isRequired
	};

	componentWillReceiveProps() {
        // Deliberately empty. This is used to allow unit tests to run
        // TODO - Work out a way to remove this dependency
	}

	render() {
		const { loading, faqs } = this.props.data;

		return (
			<div className="questions__container fluid-container">
				<div className="row">
					<div className="container">
						<div className="row">
							<QuestionMain faqs={loading ? [] : faqs} loading={loading}/>
							<Sidebar faqs={loading ? [] : faqs} loading={loading}/>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default graphql(questionsQuery, {
	options: { fetchPolicy: 'cache-first' }
})(Questions);
