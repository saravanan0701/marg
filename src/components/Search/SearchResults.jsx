import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Link, withRouter } from 'react-router-dom'
import ProductCard from '../ProductList/ProductListWrapper/ProductCard';
import { Container, Row, Col } from 'reactstrap';

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

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
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

function SearchResults({ resultsArr }) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  return (
    <div className={classes.root}>
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
            <Row>
              {resultType.items.map(item => {
                if (resultType.name == 'Editors') {
                  return (
                    <div className="d-block col-12 col-lg-4 my-3 text-center">
                      <Link
                      to={item.url} 
                      id={item.id} 
                      key={item.id}
                      >
                        <h3 className="search-result editor">{item.name}</h3>
                      </Link>
                    </div>
                  )
                } else if (resultType.name == 'Magazines') {
                  return <ProductCard key={item.id} className="col-6 col-lg-4" {...item} />
                } else if (resultType.name == 'Articles') {
                  return <ProductCard key={item.id} className="col-6 col-lg-4" {...item} />
                } else if (resultType.name == 'Books') {
                  return <ProductCard key={item.id} className="col-6 col-lg-4" {...item} />
                }
                
              })}
            </Row>
          </TabPanel>
        )
      })}
    </div>
  );
}

export default withRouter(SearchResults);