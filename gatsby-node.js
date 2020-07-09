const path = require("path");
const slash = require("slash");
const _ = require("lodash");

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;
  const result = await graphql(`
    {
      allWordpressPost {
        edges {
          node {
            slug
            wordpress_id
          }
        }
      }
      allWordpressPage {
        edges {
          node {
            slug
            wordpress_id
          }
        }
      }
      allWordpressCategory {
        edges {
          node {
            slug
            wordpress_id
          }
        }
      }
      allWordpressTag {
        edges {
          node {
            slug
            wordpress_id
          }
        }
      }
      allWordpressWpUsers {
        edges {
          node {
            slug
            wordpress_id
          }
        }
      }
    }
  `);

  console.log(result);

  // Handle errors
  if (result.errors) {
    console.error(result.errors);
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }

  // Create an indexe page
  const indexTemplate = path.resolve(`./src/templates/index.js`);
  createPage({
    path: `/`,
    component: slash(indexTemplate),
  });

  // Create pages for each WordPress page
  const pageTemplate = path.resolve(`./src/templates/page.js`);
  _.each(result.data.allWordpressPage.edges, (edge) => {
    const { node } = edge;
    const page = node;
    createPage({
      path: `/${page.slug}`,
      component: slash(pageTemplate),
      context: {
        id: page.wordpress_id,
      },
    });
  });

  // Create posts for each WordPress post
  const postTemplate = path.resolve(`./src/templates/post.js`);
  _.each(result.data.allWordpressPost.edges, (edge) => {
    const { node } = edge;
    const post = node;
    createPage({
      path: `/blog/${post.slug}`,
      component: slash(postTemplate),
      context: {
        id: post.wordpress_id,
      },
    });
  });

  // Create pages for each WordPress category
  const catTemplate = path.resolve(`./src/templates/category.js`);
  _.each(result.data.allWordpressCategory.edges, (edge) => {
    const { node } = edge;
    const cat = node;
    createPage({
      path: `/categories/${cat.slug}`,
      component: slash(catTemplate),
      context: {
        id: cat.wordpress_id,
      },
    });
  });

  // Create pages for each WordPress tag
  const tagTemplate = path.resolve(`./src/templates/tag.js`);
  _.each(result.data.allWordpressTag.edges, (edge) => {
    const { node } = edge;
    const tag = node;
    createPage({
      path: `/tags/${tag.slug}`,
      component: slash(tagTemplate),
      context: {
        id: tag.wordpress_id,
      },
    });
  });

  // Create pages for each published WordPress user
  const userTemplate = path.resolve(`./src/templates/user.js`);
  _.each(result.data.allWordpressWpUsers.edges, (edge) => {
    const { node } = edge;
    const user = node;
    createPage({
      path: `/user/${user.slug}`,
      component: slash(userTemplate),
      context: {
        id: user.wordpress_id,
      },
    });
  });
};

exports.onCreateNode = ({ node }) => {
  console.log(node.internal.type);
};
