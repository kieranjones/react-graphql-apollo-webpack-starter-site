import React from 'react';
import PropTypes from 'prop-types';

const Question = ({ question }) => {
	return (
        <div className="question-item__container">
            <h3>{question.title}</h3>
            <div className="question-item__container--content" dangerouslySetInnerHTML = {{__html: question.body}} />
        </div>
	);
};

Question.propTypes = {
	question: PropTypes.object.isRequired
};

export default Question;
