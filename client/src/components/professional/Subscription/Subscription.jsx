import React, { useState,useEffect } from "react";
import "./Subscription.css";
import StripeCheckout from "react-stripe-checkout";
import { PROFESSIONALAPI } from "utils/api";
import Axios from "axios";
import { useNavigate, useParams } from "react-router-dom";


const Subscription = () => {
  const navigate = useNavigate()
  const { id } = useParams();
  
const stripeKey =
  "pk_test_51NGJfDSFVO01dJRlHD9wEPOuSFB4YIlzTsfr914chmYjO8jSTNgzj0v45mDSaLkrHvY7Ir6p80vnvHZDseEw6JGK00oj6j4wHH";
  const handlePaymentSuccess = async (token, amount) => {
  try {
    const response = await Axios.post(
      `${PROFESSIONALAPI}process-payment`,
      {
        token: token.id,
        amount: amount.toString(),
        currency: "INR",
        userid: id,
      },
      { withCredentials: true }
    );

    console.log(response, "response");
    if (response.status === 200) {
      // if (response.data.requiresAction) {
       
      //   window.open(response.data.stripeSdkUrl, "_blank");
      // } else {
        console.log("Payment succeeded!");
        console.log(response.data.message);
      alert("Payment succeeded!");
      navigate('/professional')
      // }     
    } else {
      console.error("Payment failed!");
      console.error(response.data.message);
      alert("Payment failed!"); // Show payment failure alert
    }
  } catch (error) {
    console.error("Payment failed!");
    console.error(error);
    alert("Payment failed!"); // Show payment failure alert
  }
}; 

  return (
    <div className="price" id="price">
      <div className="container">
        <div
          className="section-header text-center wow zoomIn"
          data-wow-delay="0.1s"
        >
          <p>Pricing Plan</p>
          <h2>Affordable Price</h2>
        </div>
        <div className="rowsubs">
          <div
            className="col-md-4 wow fadeInUp w-[320px]"
            data-wow-delay="0.5s"
          >
            <div className="price-item">
              <div className="price-header">
                <div className="price-title">
                  <h2>Basic</h2>
                </div>
                <div className="price-prices">
                  <h2>
                    <small>₹</small>49<span>/ 1 mo</span>
                  </h2>
                </div>
              </div>
              <div className="price-body">
                <div className="price-description">
                  <ul>
                    <li>Add Contributions</li>
                    <li>Share ideas</li>
                    <li>Connect with people</li>
                    <li>Get Requirements</li>
                  </ul>
                </div>
              </div>
              <div className="price-footer">
                <div className="price-action">
                  <StripeCheckout
                    token={(token) => handlePaymentSuccess(token, 4900)}
                    stripeKey={stripeKey}
                    amount={4900} // Amount in cents (49 INR)
                    currency="INR"
                    name="Basic Plan"
                    description="Bootstrap 4, Font Awesome 5, Responsive Design, Browser Compatibility, Easy To Use"
                    image="/images/LogoBlack.png"
                    allowRememberMe={false}
                    email="buildream@gmail.com"
                    billingAddress
                    shippingAddress
                    panelLabel="Order Now"
                    locale="auto"
                    opened={() => {
                      console.log("Stripe Checkout opened");
                    }}
                    closed={() => {
                      console.log("Stripe Checkout closed");
                    }}
                    payment_method_types={["card", "upi", "netbanking"]}
                  >
                    <button className="btn">Order Now</button>
                  </StripeCheckout>
                </div>
              </div>
            </div>
          </div>
          <div
            className="col-md-4 wow fadeInUp w-[320px]"
            data-wow-delay="0.0s"
          >
            <div className="price-item featured-item">
              <div className="price-header">
                <div className="price-title">
                  <h2>Standard</h2>
                </div>
                <div className="price-prices">
                  <h2>
                    <small>₹</small>99<span>/ 2 mo</span>
                  </h2>
                </div>
              </div>
              <div className="price-body">
                <div className="price-description">
                  <ul>
                    <li>Add Contributions</li>
                    <li>Share ideas</li>
                    <li>Connect with people</li>
                    <li>Get Requirements</li>
                  </ul>
                </div>
              </div>
              <div className="price-footer">
                <div className="price-action">
                  <StripeCheckout
                    token={(token) => handlePaymentSuccess(token, 9900)}
                    stripeKey={stripeKey}
                    amount={9900} // Amount in cents (49 INR)
                    currency="INR"
                    name="Basic Plan"
                    description="Bootstrap 4, Font Awesome 5, Responsive Design, Browser Compatibility, Easy To Use"
                    image="/images/LogoBlack.png"
                    allowRememberMe={false}
                    email="buildream@gmail.com"
                    billingAddress
                    shippingAddress
                    panelLabel="Order Now"
                    locale="auto"
                    opened={() => {
                      console.log("Stripe Checkout opened");
                    }}
                    closed={() => {
                      console.log("Stripe Checkout closed");
                    }}
                    payment_method_types={["card", "upi", "netbanking"]}
                  >
                    <button className="btn">Order Now</button>
                  </StripeCheckout>
                </div>
              </div>
            </div>
          </div>
          <div
            className="col-md-4 wow fadeInUp w-[320px]"
            data-wow-delay="0.5s"
          >
            <div className="price-item">
              <div className="price-header">
                <div className="price-title">
                  <h2>Premium</h2>
                </div>
                <div className="price-prices">
                  <h2>
                    <small>₹</small>149<span>/ 3 mo</span>
                  </h2>
                </div>
              </div>
              <div className="price-body">
                <div className="price-description">
                  <ul>
                    <li>Add Contributions</li>
                    <li>Share ideas</li>
                    <li>Connect with people</li>
                    <li>Get Requirements</li>
                  </ul>
                </div>
              </div>
              <div className="price-footer">
                <div className="price-action">
                  <StripeCheckout
                    token={(token) => handlePaymentSuccess(token, 14900)}
                    stripeKey={stripeKey}
                    amount={14900} // Amount in cents (49 INR)
                    currency="INR"
                    name="Basic Plan"
                    description="Bootstrap 4, Font Awesome 5, Responsive Design, Browser Compatibility, Easy To Use"
                    image="/images/LogoBlack.png"
                    allowRememberMe={false}
                    email="buildream@gmail.com"
                    billingAddress
                    shippingAddress
                    panelLabel="Order Now"
                    locale="auto"
                    opened={() => {
                      console.log("Stripe Checkout opened");
                    }}
                    closed={() => {
                      console.log("Stripe Checkout closed");
                    }}
                    payment_method_types={["card", "upi", "netbanking"]}
                  >
                    <button className="btn">Order Now</button>
                  </StripeCheckout>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscription;
