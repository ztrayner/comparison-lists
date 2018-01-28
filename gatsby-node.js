const path = require('path');

exports.createPages = ({ boundActionCreators, graphql }) => {
    const { createPage } = boundActionCreators;

    return graphql(`
        {
            allMarkdownRemark(
                sort: { order: DESC, fields: [frontmatter___date] }
                limit: 1000
            ) {
                edges {
                    node {
                        excerpt(pruneLength: 400)
                        html
                        id
                        frontmatter {
                            templateKey
                            path
                            date
                            title
                            image
                            heading
                            description
                            intro {
                                blurbs {
                                    image
                                    text
                                }
                                heading
                                description
                            }
                            main {
                                heading
                                description
                                image1 {
                                    alt
                                    image
                                }
                                image2 {
                                    alt
                                    image
                                }
                                image3 {
                                    alt
                                    image
                                }
                            }
                            testimonials {
                                author
                                quote
                            }
                            full_image
                            pricing {
                                heading
                                description
                                plans {
                                    description
                                    items
                                    plan
                                    price
                                }
                            }
                            comparison_intro
                            products {
                                description
                                heading
                                product_image
                                links {
                                    link
                                    source
                                }
                            }
                            outro
                        }
                    }
                }
            }
        }
    `).then(result => {
        if (result.errors) {
            result.errors.forEach(e => console.error(e.toString()));
            return Promise.reject(result.errors);
        }

        return result.data.allMarkdownRemark.edges.forEach(({ node }) => {
            const pagePath = node.frontmatter.path;
            const safeTemplateKey = String(node.frontmatter.templateKey);
            const templatePath = `src/templates/${safeTemplateKey}.js`;
            const resolvedPath = path.resolve(templatePath);
            createPage({
                path: pagePath,
                component: resolvedPath,
                // additional data can be passed via context
                context: {
                    path: pagePath
                }
            });
        });
    });
};
