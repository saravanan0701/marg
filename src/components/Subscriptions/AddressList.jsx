import React, { useState, useEffect } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles';
import { RaisedButton, FlatButton } from "./../commons";
import AddressBox from "./../Checkout/CheckoutAddress/AddressBox";
import AddressEditForm from "./../Checkout/CheckoutAddress/AddressEditForm.jsx";

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  paper: {
    width: '80%',
    height: '80%',
  },
}));

export const AddressList = ({open, hidePopup, addresses, selectedAddress, selectAddress, showPaymentLink, addNewAddress}) => {

  const [ showForm, setShowForm ] = useState(false)
  const theme = useTheme();
  const classes = useStyles();
  console.log(theme.breakpoints.down('md'));
  console.log(useMediaQuery(theme.breakpoints.down('md')));
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  useEffect(() => {
    if(selectedAddress) {
      return;
    }
    if(addresses.length > 0) {
      setShowForm(false);
      return selectAddress(addresses[0]);
    }
    setShowForm(true);
  }, [addresses]);
  return (
    <Dialog
      maxWidth={false}
      fullScreen={fullScreen}
      open={open}
      aria-labelledby="responsive-dialog-title"
      classes={{
        paper: fullScreen? null: classes.paper,
      }}
    >
      <DialogTitle id="responsive-dialog-title">{"Select an address"}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <div className="row">
          {
            addresses.map(
              (address) => (
                <AddressBox
                  key={address && address.id}
                  {...address}
                  selected={selectedAddress && selectedAddress.id === address.id}
                  onClick={() => selectAddress(address)}
                />
              )
            )
          }
          </div>
          {
            !showForm && <RaisedButton onClick={() => setShowForm(true)}>Add new address</RaisedButton>
          }
          {
            showForm && 
              <div className="row">
                <AddressEditForm
                  className="col-md-4"
                  toggleAddressForm={() => setShowForm(false)}
                  saveAddress={(address) => {
                    addNewAddress(address);
                    selectAddress(address);
                    setShowForm(false);
                  }} />
              </div>
          }
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <RaisedButton autoFocus disabled={!selectedAddress} onClick={(e) => showPaymentLink()}>Pay now</RaisedButton>
        <FlatButton onClick={(e) => hidePopup()}>Cancel</FlatButton>
        </DialogActions>
    </Dialog>
  );
}