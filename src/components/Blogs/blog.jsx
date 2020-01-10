
import React, { useState,useEffect } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import styled from 'styled-components'
import { BlogData } from './data'
import BlogCategory from './blogcategory' 


const NavBarStyle =  styled.div `

padding:4rem 2rem;
@media (max-width: 768px) {
  padding:1%;
  }
.nav-tabs{
  border-bottom:none;
  .nav-item{
    margin:0 0.2rem;  
  .nav-link{
    p{
      color: #3a3a3a;
      font-family: Lato;
      font-size: 16px;
      font-weight: 700;
      letter-spacing: 3px;
      text-transform: uppercase;
    }
  }
  .nav-link.active{
    border:none;
    border-bottom:2px solid red;
  }
  .nav-link:hover{
    border:none;
    border-bottom:2px solid red;
  }
}
}
.tab-content{
  padding:2.5rem;
}


`

const Blogs = (props) => {

  const [activeTab, setActiveTab] = useState('1');
  const [Data, setData] = useState(BlogData);


  const toggle = tab => {
    if(activeTab !== tab) setActiveTab(tab);
  }

  return (
    <div>
      <NavBarStyle>
      <Nav tabs className="justify-content-center">
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '1' })}
            onClick={() => { toggle('1'); }}
            href="#pablo"
          >
            <p>VIEW ALL</p>

          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '2' })}
            onClick={() => { toggle('2'); }}
            href="#pablo"
          >
            <p>CATEGORY 1</p>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '3' })}
            onClick={() => { toggle('3'); }}
            href="#pablo"
          >
            <p>CATEGORY 2</p>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '4' })}
            onClick={() => { toggle('4'); }}
            href="#pablo"
          >
            <p>CATEGORY 3</p>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '5' })}
            onClick={() => { toggle('5'); }}
            href="#pablo"
          >
            <p>CATEGORY 4</p>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '6' })}
            onClick={() => { toggle('6'); }}
            href="#pablo"
          >
            <p>CATEGORY 5</p>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '7' })}
            onClick={() => { toggle('7'); }}
            href="#pablo"
          >
            <p>CATEGORY 6</p>
          </NavLink>
        </NavItem>
       
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId={activeTab}>
            <BlogCategory props = {BlogData} tab={activeTab}/>
        </TabPane>
      </TabContent>
      </NavBarStyle>
    </div>
  );
}

export default Blogs;