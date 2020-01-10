import React,{ useState,useEffect } from 'react'
import { Row,Col } from 'reactstrap'
import styled from 'styled-components';

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

const ChildBlogPost = (props) => {
  console.log(props.tab)
  const [Data, setData] = useState([]);
  
  useEffect(() => {

    switch ((props.tab)) {
      case 0:
        setData(props.props)
        console.log(Data)
        break;
      case 1:
        let res = props.props.filter( prop => prop.category === "Cartegory 1");
        console.log(res)
        setData(res);
        break;
      case 2:
         res = props.props.filter( prop => prop.category === "Cartegory 2");
        setData(res);
        break;
      case 3:
      res = props.props.filter( prop => prop.category === "Cartegory 3");
      setData(res);
      break;
      case 4:
         res = props.props.filter( prop => prop.category === "Cartegory 4");
        setData(res);
        break;
      case 5:
         res = props.props.filter( prop => prop.category === "Cartegory 5");
        setData(res);
        break;
      case 6:
       res = props.props.filter( prop => prop.category === "Cartegory 6");
      setData(res);
      break;
      default:
        break;
    }
  
  }, [props.tab])

  return(
    <>
      <SingleBlog>
        <Row>
        {Data.map((prop,i) => 
          <Col md={i === 0?"12":"6"} className="mt-5">
            <img src="http://localhost:3000/static/media/timeline.96d45f64.jpg"  className="img-fluid"/>
            <div className="my-4">
            {i === 0?"":<p className="BlogTitle">{prop.title}</p>}
              <div style={{float:'left',width:`${i === 0}?40%:100%`,display:'flex',flexDirection:`${i === 0?"column":"row"}`}}>
                  <h6 className="float-left">{prop.postedAt}<span> | </span>{prop.writtenBy}</h6>
                  <FlatButton style={{paddingLeft:`${i === 0?"0":"2rem"}`}}>{prop.category}</FlatButton>
            {i === 0?<h3>{prop.title}</h3>:''}
            </div>
            {i === 0?"":<a href="#" className="ReadPostLink mt-4" style={{position:'absolute',left:'1rem'}}>Read Post</a>}
            {i === 0?
            <div  className="MobileAdjust">
              <p className="mb-0">{prop.description}</p> 
              <a href="#" className="ReadPostLink">Read Post</a>
            </div>
            :''}
            </div>
            <br/>
         </Col>
          )}
        </Row>
      </SingleBlog>
    </>
  )

}
export default ChildBlogPost