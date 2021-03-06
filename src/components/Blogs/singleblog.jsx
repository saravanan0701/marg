import React,{ useEffect , useReducer } from 'react'
import { Row,Col } from 'reactstrap'
import styled from 'styled-components';

import FlatButton from "../commons/FlatButton";

const Blog = styled.div`
  padding : 0rem 6rem;
  .CategoryText{
    color: #ec1d24;
    font-family: Lato;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 1px;
    text-transform: uppercase;
  }
h6{
  color: #3a3a3a;
  font-family: Lato;
  font-size: 16px;
  font-weight: 400;
  letter-spacing: 0.59px;
  line-height: 23px;
}
.BlogTitle{
  color: #000000;
  font-family: Lato;
  font-size: 18px !important;
  font-weight: 700;
  letter-spacing: 0.66px;
  line-height: 23px;
}
.ReadPostLink{
  color: #ec1d24;
  font-family: Lato;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 3px;
  text-transform: uppercase;
}
.MobileAdjust{
  float:right;
  display : flex;
  flex-direction : row;
}
@media (max-width: 768px) {
  .tab-content{
    padding:0;
  }
  .MobileAdjust{
    width:100% !important;
  }
  padding : 0rem 2rem;
  }
}

`;

const data = {
  category:"Cartegory 1",
  title:'Title of the Blog Post',
  description:'Marg is a not-for-profit publisher whose mission is to encourage an understanding of Indian art in the broadest sense of the term.We strive to light up “many dark corners” in India’s cultural landscape and to spark debate on all aspects of heritage among academics, critics and…',
  postedAt:'12-12-2019',
  writtenBy:'Subhash Benny',
};

const INITIAL_STATE = {
  blog : {}
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case 'HANDLE_BLOG_DATA':
    return {
      ...state,
      blog : action.data
    }

    default:
      return state
  }
};

const SingleBlog = () => {

  const [ singleBlog , dispatch ] = useReducer(reducer, INITIAL_STATE);

  useEffect(() => {

    dispatch({ type : "HANDLE_BLOG_DATA", data })

  },[])

  return(
    <>
      <Blog>
        <Row>
          <Col md="12" className="mt-5">
            <img src="http://localhost:3000/static/media/timeline.96d45f64.jpg" style= {{ objectFit : "cover" }}  className="img-fluid"/>
            <div className="my-4">
              <div style={{float:'left',width:"50%",display:'flex',flexDirection:"column" }}>
                <h6 className="float-left">{singleBlog.blog.postedAt}<span> | </span>{singleBlog.blog.writtenBy}</h6>
                <FlatButton style={{paddingLeft:"0"}}>{singleBlog.blog.category}</FlatButton>
                <h3>{singleBlog.blog.title}</h3>
              </div>
            <br/>
            <div  className="MobileAdjust py-5">
              <p className="mb-0">{singleBlog.blog.description}</p>
            </div>
            </div>
            <br/>
         </Col>
        </Row>
      </Blog>
    </>
  )

}
export default SingleBlog
