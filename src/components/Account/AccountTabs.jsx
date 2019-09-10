import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { Link, withRouter } from "react-router-dom";
import ProductCard from "../ProductList/ProductListWrapper/ProductCard";
import { Container, Row, Col } from "reactstrap";

import Library from "./Library.jsx";
import Profile from "./Profile.jsx";
import Orders from "./Orders.jsx";

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper
  },

  tabPanel: {
    "& .MuiTabs-scroller": {
      display: "flex",
      justifyContent: "center"
    },
    "& button": {
      outline: "none"
    },
    "& span": {
      fontFamily: "Lato",
      color: "#ec1d24",
      fontSize: 14,
      fontWeight: 700,
      letterSpacing: 3,
      textTransform: `uppercase`
    },
    "& span.MuiTabs-indicator": {
      backgroundColor: "#ec1d24"
    }
  }
}));

function AccountTabs({
  isLoading,
  orders,
  client,
  addNewAddress,
  addresses,
  id,
  firstName,
  lastName,
  email,
  updateUserName,
  updateUserEmail
}) {
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
        className={`${classes.tabPanel} mt-4 mb-5`}
      >
        <Tab label="My Digital Library" {...a11yProps(0)} />
        <Tab label="My Orders" {...a11yProps(1)} />
        <Tab label="My Profile" {...a11yProps(2)} />
      </Tabs>

      <Library orders={orders} value={value} index={0} />
      <Orders orders={orders} value={value} index={1} />
      <Profile
        value={value}
        index={2}
        client={client}
        addNewAddress={addNewAddress}
        addresses={addresses}
        firstName={firstName}
        lastName={lastName}
        email={email}
        id={id}
        updateUserName={updateUserName}
        updateUserEmail={updateUserEmail}
      />
    </div>
  );
}

export default withRouter(AccountTabs);
