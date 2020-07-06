import React from 'react'
import { graphql, Link } from 'gatsby'
import '../styles/index.css'

function Pages(props) {
  const items = props.items
  const listItems = items.map(item => {
    return (
      <li key={item.id}>
        <Link to={item.uri}>{item.title}</Link>
      </li>
    )
  })
  return (
    <ul>
      {listItems}
    </ul>
  )
}

function Posts(props) {
  const items = props.items
  const listItems = items.map(item => {
    return (
      <li key={item.id}>
        <Link to={`/blog/${item.slug}`}>{item.title}</Link>
      </li>
    )
  })
  return (
    <ul>
      {listItems}
    </ul>
  )
}

const IndexTemplate = ({data}) => {
    const posts = data.wordpress.posts.nodes
    const pages = data.wordpress.pages.nodes

    console.log(posts)
    console.log(pages)
    return <>
        <div className="pages">
            <h2 dangerouslySetInnerHTML={{ __html: 'pages' }}></h2>
            <div>
              <Pages items={pages} />
            </div>
        </div>
        <div className="posts">
            <h2 dangerouslySetInnerHTML={{ __html: 'posts' }}></h2>
            <div>
              <Posts items={posts} />
            </div>
        </div>
    </>
} 

export const query = graphql`
  query IndexQuery {
    wordpress {
      posts {
        nodes {
          id
          title
          slug
          link
          uri
        }
      }
      pages {
        nodes {
          id
          title
          slug
          uri
        }
      }
    }
  }
`

export default IndexTemplate