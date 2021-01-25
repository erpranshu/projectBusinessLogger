import React, { Component, useState, useEffect } from "react";
import axios from "axios";

const YourInvestment = () => {
  const [services, setServices] = useState([]);
  const [newService, setNewService] = useState("");
  const [investment, setInvestment] = useState("");
  // const[id,setId]=useState("set")
  useEffect(() => {
    axios
      .get("http://localhost:5000/investment/", { withCredentials: true })
      .then((resp) => setServices(resp.data));
  });
  const addService = () => {
    const data = {
      detail: `${newService}`,
      expenditure: `${investment}`,
    };

    services.push(data);
    axios.post("http://localhost:5000/investment/add", data, {
      withCredentials: true,
    });

    setServices([...services]);
    setInvestment("");
    setNewService("");
  };

  const newServiceChange = (evt) => {
    setNewService(evt.target.value);
  };

  const investmentChange = (evt) => {
    setInvestment(evt.target.value);
  };

  return (
    <div className="container my-2 main-div">
      <button
        className="btn-primary btn-sm"
        disabled={
          newService.trim().length === 0 || investment.trim().length === 0
        }
        onClick={addService}
      >
        Add Details
      </button>
      <form>
        <div class="form-row">
          <div class="col">
            <input
              type="text"
              class="form-control"
              placeholder="Items/services"
              onChange={newServiceChange}
              value={newService}
            />
          </div>
          <div class="col">
            <input
              type="text"
              class="form-control"
              placeholder="Your Investment"
              onChange={investmentChange}
              value={investment}
            />
          </div>
        </div>
      </form>
      <div className="container details invoiceAndInvestTexts my-4">
        <div className="row">
          <div className="col-sm-4">
            <strong>Service/Items</strong>
            <hr style={{marginRight:"40%"}}/>
          </div>
          <div className="col-sm-4">
            <strong>Your Investment</strong>
            <hr style={{marginRight:"40%"}}/>
          </div>
        </div>
        {services.map((service, idx) => (
          <div className="row">
           
            <div className="col-sm-4 mx-1n">{`${idx+1}`+". "+`${service.detail}`}</div>
            <div className="col-sm-4">{service.expenditure}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default YourInvestment;
