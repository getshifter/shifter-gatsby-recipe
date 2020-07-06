import React from 'react'
import { graphql } from 'gatsby'
import '../styles/tag.css'

const TagTemplate = ({data}) => {
    const { name, description, count } = data.wordpress.tag

    return <>
        <div className="tag">
            <h2 dangerouslySetInnerHTML={{ __html: name }}></h2>
            <span className="tag-count">({count})</span>
        </div>
        <div>
            <p>{description}</p>
        </div>
    </>
} 

export const query = graphql`
  query TagQuery($id: ID!) {
    wordpress {
      tag(id: $id, idType: DATABASE_ID) {
        name
        count
        description
      }
    }
  }
`
export default TagTemplate