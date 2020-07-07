import React from "react"
import { graphql, Link } from "gatsby"
// import '../styles/index.css'

function Posts(props) {
  const items = props.items
  const listItems = items.map(item => {
    return (
      <li key={item.id}>
        <Link to={`/blog/${item.slug}`}>{item.title}</Link>
      </li>
    )
  })
  return <ul>{listItems}</ul>
}

const IndexTemplate = ({ data }) => {
  const posts = data.allWordpressPost.nodes

  return (
    <>
      <div className="posts">
        <h2 dangerouslySetInnerHTML={{ __html: "posts" }}></h2>
        <div>
          <Posts items={posts} />
        </div>
      </div>
    </>
  )
}

export const query = graphql`
  query IndexQuery {
    allWordpressPost {
      nodes {
        id
        title
        slug
        link
      }
    }
  }
`

export default IndexTemplate
