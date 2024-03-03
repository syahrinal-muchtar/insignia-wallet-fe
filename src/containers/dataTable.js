import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { CDBCard, CDBCardBody, CDBDataTable, CDBContainer } from "cdbreact";
import Chart from "../components/chart";

const DataTable = () => {
  const [cookies] = useCookies(["cookie-name"]);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    getDataTable();
  }, []);

  const getDataTable = () => {
    axios({
      method: "get",
      url: "http://localhost:3000/transactions",
      headers: { Authorization: "bearer " + cookies["auth"] },
    })
      .then((response) => {
        const data = {
          sender: response.data.user.name,
          receiver: response.data.receiver.name,
          amount: response.data.amount,
          createdAt: response.data.createdAt,
        };
        console.log("cobaData", data);
        setTransactions(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const data = () => {
    return {
      columns: [
        {
          label: "Sender",
          field: "sender",
          width: 150,
        },
        {
          label: "Receiver",
          field: "receiver",
          width: 150,
        },
        {
          label: "Amount",
          field: "amount",
          width: 270,
        },
        {
          label: "Created At",
          field: "createdAt",
          width: 200,
        },
      ],
      rows: transactions,
    };
  };
  return (
    <div className="main-inner">
      <CDBContainer>
        <Chart />
        <br/>
        <CDBCard>
          <CDBCardBody>
            <CDBDataTable
              striped
              hover
              scrollY
              // maxHeight="50vh"
              data={data()}
              materialSearch
              borderless
              responsive
            />
          </CDBCardBody>
        </CDBCard>
      </CDBContainer>
    </div>
  );
};

export default DataTable;
