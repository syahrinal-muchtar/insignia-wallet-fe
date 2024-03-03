import React, { useEffect, useState } from "react";
import { Chart as ChartJS } from "chart.js/auto";
import { Line } from "react-chartjs-2";
import { CDBContainer } from "cdbreact";
import axios from "axios";
import { useCookies } from "react-cookie";

const Chart = () => {
  const [cookies] = useCookies(["cookie-name"]);
  const [data, setData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    getDataTable();
  }, []);

  const getDataTable = () => {
    axios({
      method: "get",
      url: "http://localhost:3000/transactions/sum_by_month",
      headers: { Authorization: "Bearer " + cookies["auth"] },
    })
      .then((response) => {
        console.log("cobaResponse", response.data);
        const debits = response.data.debits.map((item) => item.sum);
        const credits = response.data.credits.map((item) => item.sum);
        console.log("cobaDebits", debits);
        setData({
          ...data,
          labels: response.data.months,
          datasets: [
            {
              label: "Debits",
              backgroundColor: "rgba(194, 116, 161, 0.5)",
              borderColor: "rgb(194, 116, 161)",
              data: debits,
            },
            {
              label: "Credits",
              backgroundColor: "rgba(71, 225, 167, 0.5)",
              borderColor: "rgb(71, 225, 167)",
              data: credits,
            },
          ],
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <CDBContainer>
      <h3 className="mt-5">Line chart</h3>
      <Line data={data} options={{ responsive: true }} />
    </CDBContainer>
  );
};

export default Chart;
