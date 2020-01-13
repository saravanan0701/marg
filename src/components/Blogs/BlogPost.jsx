import React,{ useEffect , useReducer } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Container, Row, Col } from 'reactstrap';
import BlogCategory from './blogcategory';
import axios from 'axios';
import { blogData , categoryData } from './data';

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

const INITIAL_STATE = {
  current_category : 0,
  showCounter : 5,
  categories : [],
  blogs : [],
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case 'HANDLE_CHANGE_CATEGORY':
      console.log(action);
      if(action.selected_category !== state.current_category)
      {
        return {
          ...state,
          current_category : action.selected_category,
          showCounter : 5,
        };
      }

    case 'HANDLE_VIEW_MORE':

      return {
        ...state,
        showCounter : state.showCounter + 4,
      };

    case 'HANDLE_BLOG_DATA' :
      return {
        ...state,
        blogs : action.blogs
      };

    case 'HANDLE_CATEGORY_DATA' :
      return {
        ...state,
        categories : action.categories
      };

    default:
      return state
  }
};


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

function BlogPost() {


  const classes = useStyles();

  const [ blogState, dispatch ] = useReducer(reducer, INITIAL_STATE);

  useEffect( () => {
    {/*axios.get("/src/components/Blogs/data.json")
    .then((response) => {
      console.log("response",response);
    })*/}
    let blogs = blogData;
    let categories = categoryData;

    dispatch({ type: 'HANDLE_BLOG_DATA', blogs });
    dispatch({ type: 'HANDLE_CATEGORY_DATA', categories });

  },[])

  console.log(blogState.data,"data");

  return (
    <div className={classes.root}>
      <div className="text-center py-5">
        <h4 className={classes.Heading}>The Marg Blog</h4>
      </div>
    <Tabs
      value={blogState.current_category}
      onChange={(e,selected_category)=> { dispatch({ type: 'HANDLE_CHANGE_CATEGORY', selected_category }) } }
      indicatorColor="primary"
      textColor="primary"
      variant="scrollable"
      scrollButtons="auto"
      className={classes.tabPanel}
    >
      {blogState.categories.map((blogType, index) => <Tab key={index} label={blogType.name} {...a11yProps(index)} />)}
    </Tabs>

    {blogState.categories.map((blogType, index) => {
      return (
        <TabPanel value={blogState.current_category} index={index} key={index}>
             <BlogCategory
              blogs =
              {
                blogState.current_category == 0?
                blogState.blogs
                :
                blogState.blogs.filter(blog => blog.category === blogState.categories[blogState.current_category].name)
              }
              handle_selected_category = { (selected_category)=>{ dispatch({ type: 'HANDLE_CHANGE_CATEGORY', selected_category }) } }
              categories = {blogState.categories}
              showCounter = {blogState.showCounter}
              handle_view_more = { () => {dispatch({ type : "HANDLE_VIEW_MORE"})} }
              />
        </TabPanel>
      )
    })}
  </div>

  )
}


export default BlogPost
