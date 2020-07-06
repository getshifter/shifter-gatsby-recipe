import React from 'react'
import { graphql } from 'gatsby'
import '../styles/category.css'

const CategoryTemplate = ({data}) => {
    const { name, count, description } = data.wordpress.category

    return <>
        <div className="category">
            <h2 dangerouslySetInnerHTML={{ __html: name }}></h2>
            <span className="cat-count">({count})</span>
        </div>
        <div>
            <p>{description}</p>
        </div>
    </>
} 

export const query = graphql`
  query CategoryQuery($id: ID!) {
    wordpress {
      category(id: $id, idType: DATABASE_ID) {
        name
        count
        description
      }
    }
  }
`

export default CategoryTemplate