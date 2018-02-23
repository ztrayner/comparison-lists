import React from 'react';
import Link from 'gatsby-link';
import Img from 'gatsby-image';
import Script from 'react-load-script';
import graphql from 'graphql';

export default class IndexPage extends React.Component {
    handleScriptLoad() {
        if (typeof window !== 'undefined' && window.netlifyIdentity) {
            window.netlifyIdentity.on('init', user => {
                if (!user) {
                    window.netlifyIdentity.on('login', () => {
                        document.location.href = '/admin/';
                    });
                }
            });
        }
        window.netlifyIdentity.init();
    }

    render() {
        const { data } = this.props;
        const { edges: posts } = data.allMarkdownRemark;

        return (
            <div className="section">
                <Script
                    url="https://identity.netlify.com/v1/netlify-identity-widget.js"
                    onLoad={() => this.handleScriptLoad()}
                />
                <section className="hero">
                    <div className="container">
                    <h1 style={{paddingTop: '4rem'}}>The best products for your baby</h1>
                        <p>Subscribe to our weekly newsletter to get the best baby products in your inbox</p>
                        <form className="email-registration" name="email-subscribe" method="post" data-netlify="true">
                            <input type="hidden" name="form-name" value="email-subscribe" />
                            <input className="email-input" name="email" type="email" placeholder="Email address" />
                            <button type="submit" className="button filled">Submit</button>
                        </form>
                    </div>
                    <Img sizes={data.happyBaby.childImageSharp.sizes} outerWrapperClassName="hero-image-wrapper" imgStyle={{}} />
                </section>
                <section className="container" style={{margin: '8rem auto'}}>
                    <h2 className="">Our Top Baby Lists</h2>
                    {posts
                        .filter(post => post.node.frontmatter.templateKey === 'comparison-page')
                        .map(({ node: post }) => (
                            <article
                                className="article-list-item"
                                key={post.id}
                            >
                                <h1 className="inline-block" style={{marginTop: '1rem'}}>
                                    <Link to={post.frontmatter.path}>
                                        {post.frontmatter.title}
                                    </Link>
                                </h1>
                                <span className="meta-date">{post.frontmatter.date}</span>
                                <p>
                                    {post.frontmatter.comparison_intro}
                                    <br />
                                    <br />
                                    <Link className="button primary" to={post.frontmatter.path}>
                                        Keep Reading →
                                    </Link>
                                </p>
                            </article>
                        ))}
                </section>
            </div>
        );
    }
}

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          frontmatter {
            title
            comparison_intro
            templateKey
            date(formatString: "MMMM DD, YYYY")
            path
          }
        }
      }
    }
    happyBaby: file(relativePath: { eq: "happy-baby.jpeg" }) {
        childImageSharp {
          sizes(maxWidth: 1800) {
            ...GatsbyImageSharpSizes_withWebp_tracedSVG
          }
        }
      }
  }
`;
