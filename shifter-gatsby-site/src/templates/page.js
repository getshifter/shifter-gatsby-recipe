import React from "react"
import { graphql } from "gatsby"

const PageTemplate = ({ data }) => {
  console.log(data)
  const { title, content } = data.wordpressPage
  // console.log(title)

  return (
    <>
      <div className="page">
        <h2 dangerouslySetInnerHTML={{ __html: title }}></h2>
        <div
          className="page-content"
          dangerouslySetInnerHTML={{ __html: content }}
        ></div>
      </div>
    </>
  )
}

export const data = graphql`
  query PageQuery($id: Int!) {
    wordpressPage(wordpress_id: { eq: $id }, type: { eq: "page" }) {
      id
      content
      title
      wordpress_id
      slug
    }
  }
`

export default PageTemplate
