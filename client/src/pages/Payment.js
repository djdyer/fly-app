import React from "react";
import { useLazyQuery } from "@apollo/client";
import { loadStripe } from "@stripe/stripe-js";
import { idbPromise } from "../utils/helpers";
import { QUERY_CHECKOUT} from "../utils/queries";

// const stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");


function Payment() {
      // const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);
      
  // useEffect(() => {
  //   if (data) {
  //     stripePromise.then((res) => {
  //       res.redirectToCheckout({ sessionId: data.checkout.session });
  //     });
  //   }
  // }, [data]);
  // function submitCheckout() {
  //   const flightId = auctionId;
  //   getCheckout({
  //     variables: { flight: flightId },
  //   });
  // }
  return (
    <div>
        
      <h2>PAYMENT PAGE</h2> 
    </div>
  );
}

export default Payment;
