import React, { useState } from "react";
import {
  List,
  ListItem,
  Button,
  Typography,
  ListItemText,
} from "@material-ui/core";
import Spinner from "../Spinner";

const BookingDetails = ({ user, checkoutData, handleBackStep, handleNextStep, handleCheckout }) => {

  const [orderProgress, setOrderProgress] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();

    const orderData = {
      payment: {
        gateway: 'test_gateway',
        card: {
          number: '4242424242424242',
          expiry_month: '02',
          expiry_year: '24',
          cvc: '123',
          postal_zip_code: '94107',
        },
      },
      shipping: {
        name: "standard",
        street: user.address,
        town_city: user.city,
        county_state: user.shippingSubdivision.code,
        postal_zip_code: user.postCode,
        country: user.shippingCountry.code,
      },
      customer: {
        firstname: user.firstName,
        lastname: user.lastName,
        email: user.email,
        phone: user.phone,
      },
      extra_fields: {
        extr_O3bR5XD4k5nzdj: user.email,
        extr_RyWOwmGA95nEa2:  user.phone      
      },
      line_items: checkoutData.line_items,
      fulfillment: { shipping_method: "ship_RyWOwmzJ9onEa2" },
    };

    setOrderProgress(true);
    await handleCheckout(checkoutData.id, orderData);
    setOrderProgress(false);
    handleNextStep(e, "confirmation");

  };


  if(orderProgress === true) return <Spinner/>

  return(
    <>
    <List>
      {checkoutData.line_items.map((item) => (
        <ListItem key={item.id}>
          <ListItemText
            primary={item.name}
            secondary={`Quantity: ${item.quantity}`}
          />
          <Typography variant="body2">
            {item.line_total.formatted_with_symbol}
          </Typography>
        </ListItem>
      ))}
      <ListItem>
        <ListItemText primary="Total price" />
        <Typography variant="body2">
          {checkoutData.subtotal.formatted_with_code}
        </Typography>
      </ListItem>
    </List>

    <div className="actions">
      <Button
        size="medium"
        onClick={(e) => handleBackStep(e, "order-address")}
        variant="contained"
      >
        Go Back
      </Button>
      <Button
        size="medium"
        color="secondary"
        variant="contained"
        onClick={handleSubmit}
      >
        Place Order
      </Button>
    </div>
  </>
  );
}

export default BookingDetails;