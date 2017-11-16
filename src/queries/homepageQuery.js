import gql from 'graphql-tag';

const homepageQuery = gql`
    query RootQueryType {
        homepage {
            heading
            subheading
            heroImageUrl
        }
    }
`;

export default homepageQuery;
