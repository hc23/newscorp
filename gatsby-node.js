/* 
  this file defines the template generator for youtube video and individual article
*/
const path = require("path");

const fetch = require('node-fetch');


exports.sourceNodes = async ({
  actions: { createNode },
  createContentDigest
}) => {

  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/playerlistitems?part=id&id=VafTMsrnSTU&key=AIzaSyA7jTz8dTvb9BHpv5ISLblZZDcYNK62bMA`
  );

  const data = await response.json();

  data.response.docs.forEach((item) => {
    createNode({
      ...item,
      id: item._id,
      internal: {
        type: 'NyTimesArticles',
        contentDigest: createContentDigest(item)
      }
    });
  });
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const response = await graphql(`
    query {
      allContentfulNews {
        edges {
          node {
            slug
          }
        }
      }
    }
  `)
  response.data.allContentfulNews.edges.forEach(edge => {
    createPage({
      path: `/news/${edge.node.slug}`,
      component: path.resolve("./src/templates/article.js"),
      context: {
        slug: edge.node.slug,
      },
    })
  })
};