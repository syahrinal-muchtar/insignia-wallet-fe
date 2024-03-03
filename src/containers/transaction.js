import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";

const Transaction = () => {
  const [cookies] = useCookies(["cookie-name"]);
  const [amount, setAmount] = useState();
  const [transactionTypeList, setTransactionTypeList] = useState([]);
  const [transactionType, setTransactionType] = useState();
  const [receiverList, setReceiverList] = useState([]);
  const [receiverId, setReceiverId] = useState();

  useEffect(() => {
    getReceiverList();
    getTransactionTypeList();
  }, []);

  const getReceiverList = () => {
    axios({
      method: "get",
      url: "http://localhost:3000/users",
      headers: { Authorization: "bearer " + cookies["auth"] },
    })
      .then((response) => {
        setReceiverList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getTransactionTypeList = () => {
    axios({
      method: "get",
      url: "http://localhost:3000/transaction-type",
    })
      .then((response) => {
        setTransactionTypeList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (transactionType === "1") {
      axios({
        method: "post",
        url: "http://localhost:3000/wallet/topup",
        headers: { Authorization: "Bearer " + cookies["auth"] },
        data: {
          balance: parseInt(amount),
        },
      })
        .then((response) => {
          toast("Topup success!");
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      axios({
        method: "post",
        url: "http://localhost:3000/wallet/transfer",
        headers: { Authorization: "Bearer " + cookies["auth"] },
        data: {
          balance: parseInt(amount),
          userId: parseInt(receiverId),
        },
      })
        .then((response) => {
          toast("Transfer Success!");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div className="auth-inner">
      <form onSubmit={handleSubmit}>
        <h3>Transaction E-Wallet</h3>
        <div className="mb-3">
          <label>Transaction type</label>
          <select
            className="form-control"
            id="inputGroupSelect01"
            onChange={(e) => setTransactionType(e.target.value)}
          >
            <option selected>Choose...</option>
            {transactionTypeList.map((item) => (
              <option value={item.id} id={item.name}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
        {transactionType === "2" && (
          <div className="mb-3">
            <label>Receiver</label>
            <select
              className="form-control"
              id="inputGroupSelect02"
              onChange={(e) => setReceiverId(e.target.value)}
            >
              <option selected>Choose...</option>
              {receiverList.map((item) => (
                <option value={item.id}>{item.name}</option>
              ))}
            </select>
          </div>
        )}
        <div className="mb-3">
          <label>Amount</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Transaction;
