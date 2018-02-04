import React from 'react';
import graphql from 'graphql';
import Helmet from 'react-helmet';

export const ComparisonPageTemplate = ({
    title,
    date,
    intro,
    products,
    outro,
    helmet
}) => (
    <article className="container">
        {helmet || ''}
        <section className="article-intro">
            <h1 className="title">
                {title}
            </h1>
            <date className="subtitle">{date}</date>
            <p>{intro}</p>
        </section>
        <section className="products-list">
            {products.map(product => (
                <article className="" key={product.heading}>
                    <h2>{product.heading}</h2>
                    <p>{product.description}</p>
                    <a href={product.links[0].link}>
                            Purchase on {product.links[0].source}
                    </a>
                </article>
            ))}
        </section>
        <section className="article-outro">
            <h2>In Summary</h2>
            <p>{outro}</p>
        </section>
    </article>
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
