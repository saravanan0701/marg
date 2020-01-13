import React,{ useEffect } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Container, Row, Col } from 'reactstrap';
import BlogCategory from './blogcategory'
import { BlogData } from './data';
import RaisedButton from "../commons/RaisedButton";

const useStyles = makeStyles(theme => ({
  root: {
    padding:"2rem",
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  Heading:{
    color: "#000000",
    fontFamily: "Cormorant Medium",
    fontSize: "42px",
    fontWeight: "500",
    letterSpacing: "1px",
    lineHeight: "57px",
  },
  tabPanel: {
    '& .MuiTabs-scroller': {
      display: 'flex',
      justifyContent: 'center',
    },
    '& button': {
      outline: 'none'
    },
    '& span': {
      fontFamily: "Lato",
      color: '#ec1d24',
      fontSize: 14,
      fontWeight: 700,
      letterSpacing: 3,
      textTransform: `uppercase`
    },
    '& span.MuiTabs-indicator': {
      backgroundColor: '#ec1d24'
    }
  }
}));
function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

function BlogPost({
  tab,
  currentIndex,
  handleCurrentIndex,
  data,
  view_more
}) {


  const classes = useStyles();


  useEffect( () => {
    handleCurrentIndex( { currentIndex : 0 ,toggle : false })
  },[])

  console.log(data,"data");

  return (
    <div className={classes.root}>
      <div className="text-center py-5">
        <h4 className={classes.Heading}>The Mark Blog</h4>
      </div>
    <Tabs
      value={currentIndex}
      onChange={(e,currentIndex)=>{ handleCurrentIndex( { currentIndex , toggle : false }) }}
      indicatorColor="primary"
      textColor="primary"
      variant="scrollable"
      scrollButtons="auto"
      className={classes.tabPanel}
    >
      {tab.map((blogType, index) => <Tab key={index} label={blogType.name} {...a11yProps(index)} />)}
    </Tabs>

    {tab.map((blogType, index) => {
      return (
        <TabPanel value={currentIndex} index={index} key={index}>
             <BlogCategory data = {data} handleCurrentIndex = {handleCurrentIndex} tab = {tab} />
             <br/><br/>
             {
               view_more ?
               <center><RaisedButton onClick={()=>{handleCurrentIndex( { currentIndex ,toggle : true })}}>VIEW MORE</RaisedButton></center>
               :
               null
             }
        </TabPanel>
      )
    })}
  </div>

  )
}

BlogPost.propTypes = {

}

export default BlogPost
