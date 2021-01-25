import axios from "axios";
import React, { Component, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Stats = () => {
  const [statsData, setStatsData] = useState([]);
  const [date, setDate] = useState(null);
  const [month, setMonth] = useState(null);
  const [year,setYear] = useState(null);
  const [displayData, setDisplayData] = useState({});
  const [displayTitle, setDisplayTitle] = useState("");
  const [displayMonthData, setDisplayMonthData] = useState({});
  const [displayMonthTitle, setDisplayMonthTitle] = useState("");
  const [displayYearData, setDisplayYearData] = useState({});
  const [displayYearTitle, setDisplayYearTitle] = useState("");
  useEffect(() => {
    axios
      .get("http://localhost:5000/stats",{withCredentials: true})
      .then((resp) => setStatsData(resp.data));
  });

  const newYearChange = (evt) => {
    setYear(evt.target.value);
  };

  const newMonthchange = (evt) => {
    setMonth(evt.target.value);
  };

  const onSearchByDate = () => {
    let totalEarning = 0;
    let totalExpenditure = 0;
    let flag = true;
    statsData.map((data, idx) => {
      // console.log(data.date);
      if (data.date == date.toLocaleDateString()) {
        totalEarning = data.earning + totalEarning;
        totalExpenditure = totalExpenditure + data.expenditure;
        flag = false;
        const profit =
          ((totalEarning - totalExpenditure) / totalExpenditure) * 100;
        setDisplayTitle("Here is your Stats !");
        setDisplayData({
          earning: totalEarning,
          expenditure: totalExpenditure,
          profit: profit.toFixed(2) + "%",
        });
      }
      if (flag == true || data.date === undefined) {
        setDisplayTitle("No Data Available");
        setDisplayData({ earning: "", expenditure: "", profit: "" });
      }
      // console.log(date.toLocaleDateString());
      // console.log(flag);
    });

    setDate(null);
  };

  const onSearchByMonth = () => {
    let totalEarning = 0;
    let totalExpenditure = 0;
    statsData.map((data, idx) => {
      let flag = true;
      // console.log(data.date);
      if (new Date(data.date).getMonth() == month - 1) {
        totalEarning = data.earning + totalEarning;
        totalExpenditure = totalExpenditure + data.expenditure;
        flag = false;
        const profit =
          ((totalEarning - totalExpenditure) / totalExpenditure) * 100;
        setDisplayMonthTitle("Here is your Stats !");
        setDisplayMonthData({
          earning: totalEarning,
          expenditure: totalExpenditure,
          profit: profit.toFixed(2) + "%",
        });
      }
      if (flag == true) {
        setDisplayMonthTitle("No Data Available");
        setDisplayMonthData({ earning: "", expenditure: "", profit: "" });
      }
    });
    setMonth(null);
  };

  const onSearchByYear=()=>{
    let totalEarning = 0;
    let totalExpenditure = 0;
    let flag = true;
    statsData.map((data, idx) => {
      
      // console.log(data.date);
      if (new Date(data.date).getFullYear() == year) {
        totalEarning = data.earning + totalEarning;
        totalExpenditure = totalExpenditure + data.expenditure;
        flag = false;
        const profit =
          ((totalEarning - totalExpenditure) / totalExpenditure) * 100;
        setDisplayYearTitle("Here is your Stats !");
        setDisplayYearData({
          earning: totalEarning,
          expenditure: totalExpenditure,
          profit: profit.toFixed(2) + "%",
        });
      }
      if (flag == true) {
        setDisplayYearTitle("No Data Available");
        setDisplayYearData({ earning: "", expenditure: "", profit: "" });
      }
    });
    setYear(null);
  }


  return (
    <div className="container my-5">
      <div className="card" style={{ width: "18rem", display: "inline-block" }}>
        <div className="card-body">
          <h3>{displayTitle}</h3>
          <hr />
          <h4>Earning:-{displayData.earning}</h4>
          <h4>Expenditure:-{displayData.expenditure}</h4>
          <h4>Profit:-{displayData.profit}</h4>
          <div className="progress" style={{ height: "20px" }}>
            <div
              className="progress-bar progress-bar-striped bg-success"
              role="progressbar"
              style={{ width: `${displayData.profit}%` }}
              aria-valuenow="25"
              aria-valuemin="0"
              aria-valuemax="100"
            >
              {displayData.profit}
            </div>
          </div>
          <DatePicker
            className="my-3 form-control"
            selected={date}
            onChange={(date) => setDate(date)}
          />
          <button
            className="btn-sm btn-primary my-2"
            onClick={onSearchByDate}
            disabled={date == null}
          >
            Serach By Date
          </button>
        </div>
      </div>

      <div
        className="card mx-5 my-2"
        style={{ width: "18rem", display: "inline-block" }}
      >
        <div className="card-body">
          <h3>{displayMonthTitle}</h3>
          <hr />
          <h4>Earning:-{displayMonthData.earning}</h4>
          <h4>Expenditure:-{displayMonthData.expenditure}</h4>
          <h4>Profit:-{displayMonthData.profit}</h4>
          <div className="progress" style={{ height: "20px" }}>
            <div
              className="progress-bar progress-bar-striped bg-success"
              role="progressbar"
              style={{ width: `${displayMonthData.profit}%` }}
              aria-valuenow="25"
              aria-valuemin="0"
              aria-valuemax="100"
            >
              {displayMonthData.profit}
            </div>
          </div>

          <form>
            <div class="form-group">

              <select
                class="form-control my-3"
                id="exampleFormControlSelect1"
                onChange={newMonthchange}
                value={month}
              > <option>Select Month</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
                <option>7</option>
                <option>8</option>
                <option>9</option>
                <option>10</option>
                <option>11</option>
                <option>12</option>
              </select>
            </div>
          </form>

          <button
            className="btn-sm btn-primary my-2"
            onClick={onSearchByMonth}
            disabled={month == null}
          >
            Serach By Month
          </button>
        </div>
      </div>

      <div className="card" style={{ width: "18rem", display: "inline-block" }}>
        <div className="card-body">
          <h3>{displayYearTitle}</h3>
          <hr />
          <h4>Earning:-{displayYearData.earning}</h4>
          <h4>Expenditure:-{displayYearData.expenditure}</h4>
          <h4>Profit:-{displayYearData.profit}</h4>
          <div className="progress" style={{ height: "20px" }}>
            <div
              className="progress-bar progress-bar-striped bg-success"
              role="progressbar"
              style={{ width: `${displayYearData.profit}%` }}
              aria-valuenow="25"
              aria-valuemin="0"
              aria-valuemax="100"
            >
              {displayYearData.profit}
            </div>
          </div>
          <form>
            <div className="form-group">
              
              <input
                type="text"
                class="form-control my-3"
                id="formGroupExampleInput"
                placeholder="Year"
                onChange={newYearChange}
              />
            </div>
          </form>
          <button
            className="btn-sm btn-primary my-2"
            onClick={onSearchByYear}
            disabled={year == null}
          >
            Serach By Year
          </button>
        </div>
      </div>
    </div>
  );
};

export default Stats;
