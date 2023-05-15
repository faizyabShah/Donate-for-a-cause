import React, { useEffect, useState } from "react";
import { useUserContext } from "../hooks/userContextHook";
import { Button, Card } from "react-bootstrap";

const Wallet = () => {
  const [amount, setAmount] = useState(null);

  const { token, user } = useUserContext();

  const handleAddAmount = () => {
    setAmount(amount + 1);
  };

  useEffect(() => {
    const fetchAmount = async () => {
      const url = "http://localhost:5000/api/user/wallet";
      const options = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const res = await fetch(url, options);
      const data = await res.json();
      setAmount(data.wallet);
    };
    if (user) {
      fetchAmount();
    }
  }, [user]);

  return (
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
        <Card.Text>
          Current Amount: {amount != null ? amount : "loading"}
        </Card.Text>
        <Button variant="primary" onClick={handleAddAmount}>
          Add Amount
        </Button>
      </Card.Body>
    </Card>
  );
};

export default Wallet;
