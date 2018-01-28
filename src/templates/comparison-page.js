import React from 'react';
import graphql from 'graphql';
import Helmet from 'react-helmet';
import Content, { HTMLContent } from '../components/Content';

// eslint-disable-next-line react/display-name
export default ({ data }) => {
    const { markdownRemark: post } = data;

    return <div>{JSON.stringify(data)}</div>;
};

export const comparisonPageQuery = graphql`
    query ComparisonPage($path: String!) {
        markdownRemark(frontmatter: { path: { eq: $path } }) {
            html
            frontmatter {
                path
                title
            }
        }
    }
`;
