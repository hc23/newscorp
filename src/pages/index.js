/*
  home page for the website
  It displays the list of news articles retrieved from Contentful as a card
*/
import * as React from "react";
import { useStaticQuery, graphql, Link } from "gatsby";
import Layout from "../components/layout";
import Seo from "../components/seo";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

const IndexPage = ({ location }) => {
  const localeToSet = ((location !== undefined && location !== null) ?
    ((location.state !== undefined && location.state !== null) ? location.state.locale : 'en-US') : 'en-US');
  const data = useStaticQuery(
    graphql`
      query {
        allContentfulNews(sort: { fields: updatedAt, order: DESC }) {
          edges {
            node {
              title
              id
              slug
              updatedAt(formatString: "Do MMMM, YYYY")
              node_locale
              thumbnail {
                gatsbyImageData(
                  width: 225
                  height:225
                )
            }
            }
          }
        }
      }
    `
  )
  return (
    <Layout>
      <Seo title="News Home" />
      {console.log("location", location)}
      <section className="py-5 text-center container">
        <div className="row py-lg-5">
          <div className="col-lg-6 col-md-8 mx-auto">
            <h1 className="fw-light">News from around the world</h1>
          </div>
        </div>
      </section>
      <div className="py-5 bg-light">
        <div className="container">
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
            {data.allContentfulNews.edges.filter(x => x.node.node_locale === localeToSet).map(edge => {
              return (
                <div className="col" key={edge.node.id}>
                  <div className="card shadow-sm">
                    <GatsbyImage
                      className="featured"
                      image={getImage(edge.node.thumbnail)}
                      alt={edge.node.title}
                    />
                    <div className="card-body">
                      <h2>
                        {edge.node.title}
                      </h2>
                      <p className="card-text">{edge.node.title}</p>
                      <div className="d-flex justify-content-between align-items-center">
                        <small className="text-muted float-left"> {edge.node.updatedAt}</small>
                        <div className="btn-group">
                          <Link className="btn btn-primary stretched-link float-right" to={`/news/${edge.node.slug}/`}>Read More</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default IndexPage;
