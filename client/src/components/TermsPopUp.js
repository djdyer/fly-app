import React, { useState } from "react";
import Popup from "reactjs-popup";
import "../style/popup.css";


export default (props) => {
  // const [agreeToTerms, setAgreeToTerms] = useState(false);

  const handleAgreeToTerms = (e) => {
    const { checked } = e.target;
    props.setAgreeToTerms(checked);
  };

  return (
    <Popup
      // agreeToTerms={agreeToTerms}
      trigger={
        <button id="termsLink" className="button">
          {" "}
          <h3>Terms+Conditions</h3>
        </button>
      }
      modal
      nested
    >
      {(close) => (
        <div className="modal fade-in fade-out">
          <button className="close" onClick={close}>
            &times;
          </button>
          <div className="header">
            <h2>TERMS + CONDITIONS</h2>
          </div>
          <div className="content">
            {" "}
            <br></br>
            <h5>
              I HEREBY AGREE TO BE BOUND BY THE FOLLOWING TERMS AND CONDITIONS:
            </h5>
            <br></br>
            <div 
            className="termsContainer" // something is wrong with this "termsContainer"
            >
              <input
                type="checkbox"
                id="termsConfirm"
                checked={props.agreeToTerms}
                onChange={handleAgreeToTerms}
              ></input>
              <label htmlFor="termsConfirm">
                <h5>AGREE TO TERMS</h5>
              </label>
            </div>
            <br></br>
            <br></br>
            <h6>BIDDING</h6>
            <br></br>
            You must be a registered user to bid on items. By bidding, you are
            stating that you are ready and willing to purchase the listed flight
            for your bid amount. If you are outbid, or your bid does not meet the
            reserve price, you are under no obligation to buy. But in all other
            cases, you are entering a contract to book the flight, a hold will be
            placed on your account until full amount is captured at close of
            auction. Your bids are final and non-retractable.
            <br></br>
            <br></br>
            <h6>REGISTRATION</h6>
            <br></br>
            All persons who wish to bid in the auction or want to purchase must
            register by creating an online account. To register, the Bidder must
            provide all of the registration information requested, and sign the
            Agreement by checking the 'I AGREE' box. By checking this box, you
            acknowledge that you are binding yourself to this contractual
            agreement. Bidders must be 18 years of age or older and have a valid
            driver's license. Fly App reserves the right to refuse to register or
            admit any person at its sole discretion. Invoices and correspondence
            relating to purchases will be sent in accordance with the information
            on the bidder's registration. Your registration will be accepted but
            your information will be verified and your account may be disabled
            until the necessary information is provided to verify the account.
            <br></br>
            <br></br>
            <h6>RESERVE</h6>
            <br></br>
            All flights are being sold with a “reserve” price, which if not met,
            the flight will not be booked. Any bid submitted below the reserve
            price may not result in winning said auction. Reserves may be
            decreased or removed at any time.
            <br></br>
            <br></br>
            <h6>BIDDER RIGHTS</h6>
            <br></br>
            All rights granted herein are personal and exclusive to the registered
            bidder, and may not be assigned or transferred to another person or
            entity, by operation of law or otherwise. Any attempt to assign or
            transfer any such rights shall be void and unenforceable. No third
            party may rely on any benefit or right conferred herein or granted to
            any Bidder. If you have any questions, please contact Community
            Auctions immediately.
            <br></br>
            <br></br>
            <h6>DISPUTES</h6>
            <br></br>In case of any dispute between bidders, Fly App, at its sole
            and complete discretion, may reopen the bidding pursuant to specific
            terms determined by Fly App between the two highest bidders only,
            until the flight is booked. If a dispute arises after the closing of
            any auction, Fly App' records shall be deemed conclusive in all
            respects.
            <br></br>
            <br></br>
            <h6>INTERNET BIDDING</h6>
            <br></br>
            (A) Buyer acknowledges that Fly App does not have any responsibility
            or liability for the website(s) used for Internet bidding. Seller
            acknowledges that the Fly App may not have any control over the
            website(s) and cannot guarantee its operation or performance. There
            are occasional interruptions and delays relating to the use of the
            Internet and the Website. Furthermore, Community Auctions shall not be
            held liable (for lost profits or special damages) or responsible for
            the function of the website or its inability to function. Buyer
            acknowledges that hardware malfunctions, software malfunctions,
            viruses, and similar issues do occur and are beyond the knowledge,
            scope, and control of Fly App. (B) The website is administered by Fly
            App from its offices in the United States of America. Individuals must
            reside within the United States of America to register to bid online.
            Fly App will not accept bids from individuals who reside outside of
            the United States of America and its territories. If you access the
            website from a location outside of the United States of America and
            its territories, Buyer consents to exclusive and continuing
            jurisdiction in the United States of America and agrees to be bound by
            and comply with all applicable laws. (C) Fly App reserves the right to
            deny any person for any reason permission or access to bid online. (D)
            Winning bidders will be notified via email at the auction close.
            <br></br>
            <br></br>
            <h6>STOP PAYMENT/INSUFFICIENT FUNDS</h6>
            <br></br>
            Upon making payment for booking, no stop payment of funds will be
            honored. Any stop payment order shall be deemed by the parties to be
            prima facie evidence of fraud existing at the time the transaction was
            consummated and shall be construed by the parties as intent to
            defraud.
            <br></br>
            <br></br>
            <h6>SALE BY FLIGHT</h6>
            <br></br>
            Fly App reserves the right to include in the auction any flight and
            the right to withdraw any flight prior to posting for bids at the
            beginning of the auction. Fly App may combine, subdivide, regroup or
            reorganize any flight auctions.
            <br></br>
            <br></br>
            <h6>PAYMENT</h6>
            <br></br>
            Payment in full must be paid by Buyer in the form of direct wire,
            major credit card or cypto currency exchange. Buyer shall pay the
            winning bid amount, including any additional service packages
            selected, plus any and all applicable taxes unless such taxes are
            exempted by law (proof of exemption must be provided). If any
            Bidder/Buyer does not pay Fly App for any Item(s) within forty-eight
            (48) hours after the end of an Auction, Fly App has the right to offer
            the item(s) to the 2nd highest bidder for payment. If Auction does not
            have a 2nd highest bidder, the item may be relisted for sale online or
            added to another auction lot in the future. Failure to fulfill Buyer's
            payment obligations will affect future bidding privileges.
            <br></br>
            <br></br>
            <h6>LIMITATION OF LIABILITY</h6>
            <br></br>
            IN NO EVENT SHALL FLY APP BE LIABLE TO BUYER FOR ANY INDIRECT,
            SPECIAL, OR CONSEQUENTIAL DAMAGES OR LOST PROFITS ARISING OUT OF OR
            RELATED TO THIS AUCTION OR THE PERFORMANCE OR BREACH THEREOF. FLY APP'
            LIABILITY TO A BIDDER SHALL IN NO EVENT EXCEED THE TOTAL OF THE
            PURCHASE PRICE, BUYER'S PREMIUM, AND TAXES PAID BY BIDDER TO FLY APP,
            REGARDLESS OF WHETHER BUYER'S CLAIM IS BASED ON CONTRACT, TORT, STRICT
            LIABILITY, OR OTHERWISE.
            <br></br>
            <br></br>
          </div>
        </div>
      )}
    </Popup>
  );
}
