/* eslint-disable no-unused-vars */
import request from 'superagent';
const graphql = require('graphql');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLList
} = graphql;

const QuestionType =  new GraphQLObjectType({
	name: 'Questions',
	fields: {
		title: { type: GraphQLString },
		body: { type: GraphQLString }
	}
});

const HomepageType =  new GraphQLObjectType({
	name: 'Homepage',
	fields: {
		heading: { type: GraphQLString },
		subheading: { type: GraphQLString }
	}
});

const TitlesType =  new GraphQLObjectType({
	name: 'Titles',
	fields: {
		title: { type: GraphQLString }
	}
});

const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
		homepage: {
			type: HomepageType,
			resolve(parentValue, args) {
				return request.get('http://localhost:3000/api/faqData/homepage')
                    .then(response => response.body);
			}
		},
		faqs: {
			type: new GraphQLList(QuestionType),
			resolve(parentValue, args) {
				return request.get('http://localhost:3000/api/faqData/faq')
                    .then(response => response.body);
			}
		},
		titles: {
			type: new GraphQLList(TitlesType),
			resolve(parentValue, args) {
				return request.get('http://localhost:3000/api/faqData/faq')
                    .then(response => response.body);
			}
		}
	}
});

module.exports = new GraphQLSchema({
	query: RootQuery
});
