import React,{ useState } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Container, Row, Col } from 'reactstrap';
import BlogCategory from './blogcategory'
import { BlogData } from './data'

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
  console.log(props)
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

function BlogPost(props) {

  const resultsArr = [
    {
      key:0,
      name:'View All',
    },
    {
      key:1,
      name:'Category 1',
    },
    {
      key:2,
      name:'Category 2',
    },
    {
      key:3,
      name:'Category 3',
    },
    {
      key:4,
      name:'Category 4',
    },
    {
      key:5,
      name:'Category 5',
    },
    {
      key:6,
      name:'Category 6',
    },
  ]

  const classes = useStyles();
  const [value, setValue] = useState(0);

  function handleChange(event, newValue) {
    console.log(newValue,"selected Table")
    setValue(newValue);
  }
  return (
    <div className={classes.root}>
      <div className="text-center py-5">
        <h4 className={classes.Heading}>The Mark Blog</h4>
      </div>
    <Tabs
      value={value}
      onChange={handleChange}
      indicatorColor="primary"
      textColor="primary"
      variant="scrollable"
      scrollButtons="auto"
      className={classes.tabPanel}
    >
      {resultsArr.map((resultType, index) => <Tab key={index} label={resultType.name} {...a11yProps(index)} />)}
    </Tabs>

    {resultsArr.map((resultType, index) => {
      return (
        <TabPanel value={value} index={index} key={index}>
             <BlogCategory props = {BlogData} tab={value}/>  
        </TabPanel>
      )
    })}
  </div>

  )
}

BlogPost.propTypes = {

}

export default BlogPost

