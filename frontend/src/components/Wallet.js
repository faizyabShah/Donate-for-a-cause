import React, { useEffect, useState } from "react";
import { useUserContext } from "../hooks/userContextHook";
import { Button, Card } from "react-bootstrap";
import AddAmountModal from "./AddAmountModal";

const Wallet = () => {
  const [amount, setAmount] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const { token, user, dispatch } = useUserContext();

  const updateAmount = async () => {
    const url = "http://localhost:5000/api/user/addtowallet";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ amount: amount }),
    };
    const res = await fetch(url, options);
    if (!res.ok) {
      return console.log("Something went wrong while adding to wallet");
    }
    const data = await res.json();
    setAmount(data.wallet);
    dispatch({ type: "ADDAMOUNT", payload: { amount: amount } });
  };

  const handleClick = (e) => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    updateAmount();
  };

  return (
    <>
      <Card
        style={{
          margin: "auto",
          marginTop: "3rem",
          width: "20rem",
          height: "15rem",
        }}
      >
        <Card.Body>
          <Card.Title>Wallet</Card.Title>
          <Card.Text>Current Amount: {user.wallet}</Card.Text>
          <Button variant="primary" onClick={(e) => handleClick(e)}>
            Add Amount
          </Button>
        </Card.Body>
      </Card>
      {showModal ? (
        <AddAmountModal handleClose={handleModalClose} setAmount={setAmount} />
      ) : null}
    </>
  );
};

export default Wallet;
