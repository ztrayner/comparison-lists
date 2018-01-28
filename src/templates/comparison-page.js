import React from 'react';
import graphql from 'graphql';
import Helmet from 'react-helmet';

export const ComparisonPageTemplate = ({
    title,
    date,
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
                    <span>Published: {date}</span>
                    <p>{intro}</p>
                    {products.map(product => (
                        <article className="" key={product.heading}>
                            {product.heading}
                            {product.description}
                            <a href={product.links[0].link}>
                                Purchase on {product.links[0].source}
                            </a>
                        </article>
                    ))}
                    <p>{outro}</p>
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
            date={frontmatter.date}
            intro={frontmatter.comparison_intro}
            products={frontmatter.products}
            outro={frontmatter.outro}
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
                date(formatString: "MMMM DD, YYYY")
                products {
                    heading
                    description
                    product_image
                    links {
                        source
                        link
                    }
                }
                outro
                comparison_intro
            }
        }
    }
`;
