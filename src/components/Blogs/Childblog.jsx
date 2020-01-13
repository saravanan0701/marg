import React,{ useState,useEffect } from 'react'
import { Row,Col } from 'reactstrap';
import { Link } from "react-router-dom";
import styled from 'styled-components';
import RaisedButton from "../commons/RaisedButton";
import FlatButton from "../commons/FlatButton";

const SingleBlog = styled.div`

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

const ChildBlogPost = ({ blogs , handle_selected_category , categories , showCounter , handle_view_more }) => {

  return(
    <>
      <SingleBlog>
        <Row>
        {blogs.map((blog,i) =>
          i < showCounter ?
          <Col md={i === 0?"12":"6"} className="mt-5">
            <img src="http://localhost:3000/static/media/timeline.96d45f64.jpg" style= {{ objectFit : "cover" }}  className="img-fluid"/>
            <div className="my-4">
              {
                i === 0?
                "":
                <p className="BlogTitle">{blog.title}</p>
              }
              <div style={{float:'left',width:`${i === 0}?40%:100%`,display:'flex',flexDirection:`${i === 0?"column":"row"}`}}>
                <h6 className="float-left">{blog.postedAt}<span> | </span>{blog.writtenBy}</h6>
                <FlatButton onClick={()=>{handle_selected_category(categories.findIndex(x => x.name === blog.category))}} style={{paddingLeft:`${i === 0?"0":"2rem"}`}}>{blog.category}</FlatButton>
                {
                  i === 0?
                  <h3>{blog.title}</h3>
                  :
                  ''
                }
              </div>
            {
              i === 0?
              "":
              <React.Fragment>
                <br/><br/>
                <p className="mb-0">{blog.description}</p>
                <Link to="/blog/1" ><FlatButton className="pt-1">Read Post</FlatButton></Link>
              </React.Fragment>
            }
            {
              i === 0?
              <div  className="MobileAdjust">
                <p className="mb-0">{blog.description}</p>
                <Link to="/blog/1" ><FlatButton className="pt-1">Read Post</FlatButton></Link>
              </div>
              :''
            }
            </div>
            <br/>
         </Col>
         :
         null
          )}
        </Row>
        {
          showCounter < blogs.length  ?
          <center><RaisedButton onClick={handle_view_more}>VIEW MORE</RaisedButton></center>
          :
          null
        }
      </SingleBlog>
    </>
  )

}
export default ChildBlogPost
