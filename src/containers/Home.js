import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { graphql } from 'react-apollo';
import homepageQuery from '../queries/homepageQuery';

export class Home extends Component {

	static propTypes = {
		data: PropTypes.object.isRequired
	};

	componentWillReceiveProps() {
		// Deliberately empty. This is used to allow unit tests to run
		// TODO - Work out a way to remove this dependency
	}

	render() {
		const { homepage } = this.props.data;

		return (
			<div className="home__container fluid-container ">
				<div className="row">
					<div className="col-sm-12">
						{ homepage && (
							<div className="home__container--hero-content">
								<h1>{homepage.heading}</h1>
								<p>{homepage.subheading}</p>
								<Link to="/faqs" className="btn btn-primary">Learn More</Link>
							</div>
						)
						}
					</div>
				</div>
			</div>
		);
	}
}

export default graphql(homepageQuery, {
	options: { fetchPolicy: 'cache-first' }
})(Home);


