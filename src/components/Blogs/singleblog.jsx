import React,{ useState,useEffect } from 'react'
import { Row,Col } from 'reactstrap'
import styled from 'styled-components';

import FlatButton from "../commons/FlatButton";

const Blog = styled.div`

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
  width:60%
}
@media (max-width: 768px) {
  .tab-content{
    padding:0;
  }
  .MobileAdjust{
    width:100% !important;
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

const SingleBlog = () => {
  

  return(
    <>
      <Blog>
        <Row>
          <Col md="12" className="mt-5">
            <img src="http://localhost:3000/static/media/timeline.96d45f64.jpg"  className="img-fluid"/>
            <div className="my-4">
              <div style={{float:'left',width:"40%",display:'flex',flexDirection:"column" }}>
              <h6 className="float-left">{data.postedAt}<span> | </span>{data.writtenBy}</h6>
              <FlatButton style={{paddingLeft:"0"}}>{data.category}</FlatButton>
            <h3>{data.title}</h3>
            </div>
            <div  className="MobileAdjust">
              <p className="mb-0">{data.description}</p> 
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