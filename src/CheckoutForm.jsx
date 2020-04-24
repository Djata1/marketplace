import React, { Component } from "react";
import { CardElement, injectStripe } from "react-stripe-elements";

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
  }
  handleSubmit = async (event) => {
    event.preventDefault();

    const { token } = await this.props.stripe.createToken();

    let data = new FormData();
    data.append("amount", "500");
    data.append("source", token.id);
    data.append("receipt_email", "customer@example.com");

    let response = await fetch("/payment", {
      method: "POST",
      body: data,
    });
    const body = await response.text();
    console.log(body);
  };
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            <h5> Card details</h5>
            <CardElement />
          </label>
        </form>
      </div>
    );
  }
}
export default injectStripe(CheckoutForm);
