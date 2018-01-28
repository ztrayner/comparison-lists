import React from 'react';
import graphql from 'graphql';
import Helmet from 'react-helmet';

export const ComparisonPageTemplate = ({
    title,
    publishDate,
    intro,
    products,
    outro,
    helmet,
}) => (
    <section className="section">
        {helmet || ''}
        <div className="container content">
            <div className="columns">
                <div className="column is-10 is-offset-1">
                    <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
                        {title}
                    </h1>
                </div>
            </div>
        </div>
    </section>
);

// eslint-disable-next-line react/display-name
export default ({ data }) => {
    const { frontmatter } = data.markdownRemark;

    return (
        <ComparisonPageTemplate
            title={frontmatter.title}
            helmet={<Helmet title={`${frontmatter.title}`} />}
        />
    );
};

export const comparisonPageQuery = graphql`
    query ComparisonPage($path: String!) {
        markdownRemark(frontmatter: { path: { eq: $path } }) {
            frontmatter {
                path
                title
            }
        }
    }
`;
