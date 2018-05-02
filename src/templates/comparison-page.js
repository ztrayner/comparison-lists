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
    <div className="container flexin-on-them-haterz">
        {helmet || ''}
        <article className="article card">
            <section className="article-intro">
                <h1 className="title">
                    {title}
                </h1>
                <date className="subtitle">{date}</date>
                <p className="intro">{intro}</p>
            </section>
            <section className="products-list">
                {products.map(product => (
                    <article className="" key={product.heading}>
                        <h2>{product.heading}</h2>
                        <p>{product.description}</p>
                        <a href={product.links[0].link} className="button filled">
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
        <aside className="aside card">
            <div className="sticky">
                <h3>Don't miss out!</h3>
                <p>Sign up for our newsletter to find out about the best baby products.</p>
                <form className="email-registration" name="email-subscribe" method="post" data-netlify="true">
                    <input type="hidden" name="form-name" value="email-subscribe" />
                    <input className="email-input" name="email" type="email" placeholder="Email address" />
                    <button type="submit" className="button">Submit</button>
                </form>
            </div>
        </aside>
    </div>
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
