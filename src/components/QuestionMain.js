import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import QuestionItem from './QuestionItem';

const QuestionMain = ({ faqs, loading }) => {
	return (
		<div className="col-sm-8">
			<div className="question-main__container">
				<div className="question-title__container">
					<h1>Frequently Asked Questions</h1>
				</div>
				{ faqs && !loading ?
					( <Route path="/faqs/:faqId" render={({ match }) =>
						<QuestionItem question={faqs[match.params.faqId]}/>
					}/> ) :
						<div>Loading...</div>

				}
			</div>
		</div>
	);
};

QuestionMain.propTypes = {
	faqs: PropTypes.array.isRequired,
	loading: PropTypes.bool.isRequired
};

export default QuestionMain;
