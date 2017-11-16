import React  from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Sidebar = ({ faqs, loading }) => {
	return (
		<div className="col-sm-4">
			<div className="sidebar__container">
				<div className="sidebar__container--title">
					<span className="sidebar__container--title-heading">What would you like to know?</span>
				</div>
				<ul className="sidebar__container--question-list">
				{ faqs && !loading ?
					faqs.map((question, index) => (
						<li key={index}>
							<Link to={`/faqs/${index}`}>{question.title}</Link>
						</li>
					)) :
						<li>Loading...</li>

				}
				</ul>
			</div>
		</div>
	);
};

Sidebar.propTypes = {
	faqs: PropTypes.array.isRequired,
	loading: PropTypes.bool.isRequired
};

export default Sidebar;

