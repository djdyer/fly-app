import React, { useState } from "react";
import Auth from '../utils/auth';
import { useMutation } from "@apollo/client";
import { UPDATE_BID, SAVE_FLIGHT } from "../utils/mutations";


function AuctionButton(props) {
    const pathArray = window.location.pathname.split("/");
    const auctionId = pathArray[pathArray.length - 1];

    const [bid, setBid] = useState("");

    const [updateBid, { error }] = useMutation(UPDATE_BID);

    const handleInputChange = (e) => {
        // Getting the value and name of the input which triggered the change
        const { target } = e;
        // const inputType = target.name;
        const inputValue = target.value;
        setBid(inputValue);

        console.log(bid);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!+bid) {
                console.log("Not a number");
                setBid("");
                return;
            }
            if ((+bid) <= props.currentBid) {
                console.log("You cant bid lower");
                return;

            }
            const response = await updateBid({
                variables: { currentBid: +bid, _id: auctionId },
            });

            if (!response) {
                throw new Error("something went wrong!");
            }
        } catch (err) {
            console.error(err);
        }

        setBid("");
    };
    console.log('4', props)

    console.log('1', props.auctionData.auctionEndDate < (new Date()))
    console.log('2', props.auctionEndDate)
    console.log('3', (new Date()))

    if (Auth.loggedIn() && (props.auctionData.auctionEndDate > (new Date()))) {
        return (
            <div className="enterBid">
                <input
                    id="enterBid"
                    placeholder="enter your bid"
                    value={bid}
                    name="number"
                    onChange={handleInputChange}
                />
                <button
                    className="shadow-pop-br"
                    id="submitBtn"
                    type="submit"
                    onClick={handleFormSubmit}
                >
                    <h1>PLACE BID</h1>
                </button>
            </div>
        )
    } else if ((Auth.loggedIn() && (props.auctionData.auctionEndDate < (new Date())))) {
        return (
            <div className="enterBid btnTerms" >
            <a
                className="shadow-pop-br"
                id="submitBtn"
                type="submit"
                href="/login"
            >
                <h1>MAKE PAYMENT</h1>
            </a>

        </div>
        )
    } else {
        return (
            <div className="enterBid">
                <a
                    className="shadow-pop-br"
                    id="submitBtn"
                    type="submit"
                    href="/login"
                >
                    <h1>LOGIN TO BID</h1>
                </a>
                {error ? <div>
                    <p className="error-text" style={{ color: "red" }}>BID ERROR</p>
                </div> : null
                }
            </div>

        )
    }




    // return (
    //     <>
    //         {Auth.loggedIn() ? (

    //             <div className="enterBid">
    //                 <input
    //                     id="enterBid"
    //                     placeholder="enter your bid"
    //                     value={bid}
    //                     name="number"
    //                     onChange={handleInputChange}
    //                 />
    //                 <button
    //                     className="shadow-pop-br"
    //                     id="submitBtn"
    //                     type="submit"
    //                     onClick={handleFormSubmit}
    //                 >
    //                     <h1>PLACE BID</h1>
    //                 </button>
    //             </div>
    //         ) : (
    //             <div className="enterBid">
    //                 <a
    //                     className="shadow-pop-br"
    //                     id="submitBtn"
    //                     type="submit"
    //                     href="/login"
    //                 >
    //                     <h1>LOGIN TO BID</h1>
    //                 </a>
    //                 {error ? <div>
    //                     <p className="error-text" style={{ color: "red" }}>BID ERROR</p>
    //                 </div> : null
    //                 }
    //             </div>
    //         )}

    //     </>
    // )


}
export default AuctionButton;