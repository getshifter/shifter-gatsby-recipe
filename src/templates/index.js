import React from 'react'
import { graphql, Link } from 'gatsby'
import '../styles/index.css'

function Items(props) {
  const items = props.items
  const listItems = items.map(item => {
    <li>
      <Link to={item.url}>{item.title}</Link>
    </li>
  })
  return (
    <ul>
      {listItems}
    </ul>
  )
}

const IndexTemplate = ({data}) => {
    const { posts } = data.wordpress.posts.nodes
    const { pages } = data.wordpress.pages.nodes

    console.log(posts)
    console.log(pages)
    return <>
        <div className="pages">
            <h2 dangerouslySetInnerHTML={{ __html: 'pages' }}></h2>
            <div>
              <Items props={pages} />
            </div>
        </div>
        <div className="pages">
            <h2 dangerouslySetInnerHTML={{ __html: 'posts' }}></h2>
            <div>
              <Items props={posts} />
            </div>
        </div>
    </>
} 

export default IndexTemplate