import React from 'react'
import ChildBlogPost from './Childblog'

const BlogCategory = (props) => {
  console.log(props)
  return(
    <>
      <ChildBlogPost {...props} />
    </>
  )

} 
export default BlogCategory