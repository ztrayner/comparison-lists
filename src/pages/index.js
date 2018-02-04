import React from 'react';
import Link from 'gatsby-link';
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
                <section className="">
                    <div className="container" style={{minHeight: '40vh', display: 'flex', alignItems: 'center'}}>
                        <h1>The best products for your baby</h1>
                    </div>
                    <div className="container">
                        <p>Subscribe to our weekly newsletter to get the best baby products in your inbox</p>
                        <form className="email-registration">
                            <input className="email-input" type="email" placeholder="Enter your email address" />
                            <button type="submit" className="button filled">Submit</button>
                        </form>
                    </div>
                </section>
                <section className="container">
                    <h1 className="">Latest Baby Products</h1>
                    {posts
                        .filter(post => post.node.frontmatter.templateKey === 'comparison-page')
                        .map(({ node: post }) => (
                            <article
                                className="article-list-item"
                                key={post.id}
                            >
                                <h1 className="inline-bloc" style={{marginTop: 0}}>
                                    <Link to={post.frontmatter.path}>
                                        {post.frontmatter.title}
                                    </Link>
                                </h1>
                                <date style={{fontSize: '16px'}}>{post.frontmatter.date}</date>
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
  }
`;
