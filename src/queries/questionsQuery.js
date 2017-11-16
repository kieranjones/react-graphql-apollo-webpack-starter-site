import gql from 'graphql-tag';

// Note - Testing adding the titles query
const questionsQuery = gql`
    query RootQueryType {
        faqs {
            title
            body
        }
        titles {
            title
        }
    }
`;

export default questionsQuery;
