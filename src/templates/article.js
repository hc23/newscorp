/*
    article template shows individual article retrived from Contentful 
    To-Do: commented this as it throws errors {renderRichText(props.data.contentfulNews.content.raw, {})} 
*/
import React from "react";
import { graphql, Link } from "gatsby";
import Layout from "../components/layout";
import Seo from "../components/seo";
import { renderRichText } from 'gatsby-source-contentful/rich-text';
import { GatsbyImage, getImage } from "gatsby-plugin-image";

export const query = graphql`
  query($slug: String!) {
    contentfulNews(slug: { eq: $slug }) {
      title
      updatedAt(formatString: "Do MMMM, YYYY")
        thumbnail {
            gatsbyImageData(
            width: 500
            height:500
            )
        }
      content {
        raw
      }
    }
  }
`

const NewsArticle = props => {
    const image = getImage(props.data.contentfulNews.thumbnail);
    return (
        <Layout>
            <Seo title={props.data.contentfulNews.title} />
            <section className="py-5 container">
                <div className="row py-lg-5">
                    <h1 className="fw-light">{props.data.contentfulNews.title}</h1>
                    <h6 className="float-right">
                        {props.data.contentfulNews.updatedAt}
                    </h6>
                </div>
            </section>
            <div className="container">
                <div className="row">
                    {<div>
                        {props.data.contentfulNews.thumbnail && (
                            <GatsbyImage
                                className="featured"
                                image={image}
                                alt={props.data.contentfulNews.title}
                            />
                        )}
                    </div>}
                    {/* {renderRichText(props.data.contentfulNews.content.raw, {})} */}
                </div>
            </div>
        </Layout>
    )
}

export default NewsArticle;