import React from "react";
import { StripeProvider, Elements } from "react-stripe-elements";
import CheckoutForm from "./CheckoutForm.jsx";

let Checkout = () => {
  return (
    <StripeProvider apiKey="pk_test_O0LwD4x9QHxsiuIIdRzj95UM006HpcXP4w">
      <Elements>
        <CheckoutForm />
      </Elements>
    </StripeProvider>
  );
};

export default Checkout;
