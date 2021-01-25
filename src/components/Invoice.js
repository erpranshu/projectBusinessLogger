import React, { Component, useState, useEffect } from "react";
import axios from "axios";
import { jsPDF } from "jspdf";
import { Link } from "react-router-dom";

function Invoice() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [quantity, setQuant] = useState("");
  const [rate, setRate] = useState("");
  const [subTotal, setSubTotal] = useState(0);
  const [services, setServices] = useState([]);
  const [totalExpenditure, setTotalExpenditure] = useState(0);
  const [profit, setProfit] = useState("");
  const [button, setButton] = useState(true);
  useEffect(() => {
    fetch("http://localhost:5000/investment/",{credentials:"include"})
      .then((resp) => resp.json())
      .then((data) => setServices(data));
  }, []);

  const addItem = () => {
    items.push({
      name: `${newItem}`,
      quantity: `${quantity}`,
      rate: `${rate}`,
      price: `${Number(rate) * Number(quantity)}`,
    });
    setItems([...items]);
    setNewItem("");
    setQuant("");
    setRate("");
  };
  const newItemChanged = (evt) => {
    setNewItem(evt.target.value);
  };
  const quantChanged = (evt) => {
    setQuant(evt.target.value);
  };
  const rateChanged = (evt) => {
    setRate(evt.target.value);
  };

  const amount = () => {
    let total = 0;
    let totalExpense = 0;
    items.map((item) => {
      total = total + Number(item.price);
      setSubTotal(total);
      services.map((service, idx) => {
        if (service.detail === item.name) {
          totalExpense =
            totalExpense + Number(service.expenditure) * Number(item.quantity);
          setTotalExpenditure(totalExpense);
        }
      });
    });
  };

  const saveToStats = () => {
    const profit = ((subTotal - totalExpenditure) / totalExpenditure) * 100;
    const data = {
      earning: subTotal,
      expenditure: totalExpenditure,
      profit: profit,
      date: new Date().toLocaleDateString(),
    };
    axios.post("http://localhost:5000/stats/add", data, {
      withCredentials: true,
    });
  };

  const deleteItem = (idx) => {
    items.splice(idx, 1);
    setItems([...items]);
  };

  const convertPdf = () => {
    const doc = new jsPDF();
    let totalAmount = 0;
    doc.text(20, 60, "INVOICE");
    // doc.text(20, 70, this.state.invoiceNumber);
    // doc.text(20, 80, this.state.date);

    //TOTAL
    doc.setDrawColor(0);
    doc.setFillColor(0, 0, 0);
    doc.rect(110, 50, 85, 30, "F");
    //ITEMS
    doc.text(20, 93, "Item");
    doc.text(95, 93, "Quantity");
    doc.text(135, 93, "Rate(INR)");
    doc.text(175, 93, "Amount(INR)");

    items.map((item, index) => {
      totalAmount += item.rate * item.quantity;
      doc.text(20, 110 + index * 8, `${item.name}`);
      doc.text(95, 110 + index * 8, `${item.quantity}`);
      doc.text(135, 110 + index * 8, `${item.rate}`);
      doc.text(175, 110 + index * 8, `${item.rate * item.quantity}`);
      doc.setLineWidth(12);
    });
    doc.text(20, 257, "Subtotal:  " + "INR " + totalAmount);
    doc.save("invoice.pdf");
  };

  return (
    <div>
      <form className="my-3">
        <div class="form-row">
          <div class="col">
            <div class="form-group">
              <select
                class="form-select col form-control"
                onChange={newItemChanged}
                value={newItem}
                aria-label="Default select example"
              >
                <option>select</option>
                {services.map((service, idx) => (
                  <option key={idx} value={service.detail}>
                    {service.detail}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div class="col">
            <input
              type="text"
              class="form-control"
              placeholder="Quantity"
              onChange={quantChanged}
              value={quantity}
            />
          </div>
          <div class="col">
            <input
              type="text"
              class="form-control"
              placeholder="Rate"
              onChange={rateChanged}
              value={rate}
            />
          </div>
        </div>
        <button
          className="btn btn-primary btn-sm"
          onClick={addItem}
          disabled={
            newItem.trim().length === 0 ||
            quantity.trim().length === 0 ||
            rate.trim().length === 0
          }
        >
          Add Items
        </button>

        <Link to="/Invoice">
          {" "}
          <button className="btn btn-sm btn-primary mx-2" onClick={amount}>
            SubTotal
          </button>
        </Link>

        <button
          className="btn btn-sm btn-primary mx-2"
          disabled={subTotal === 0}
          onClick={saveToStats}
        >
          Done
        </button>
        <Link to="/Invoice">
          <button
            className="btn btn-sm btn-primary"
            disabled={subTotal === 0}
            onClick={convertPdf}
          >
            create pdf
          </button>
        </Link>
      </form>
      <div className="container my-4 invoiceTexts">
        <h3>INVOICE</h3>
        <hr style={{ border: "solid 1px", marginRight: "40%" }} />
        <div className="row ">
          <div className="col-lg-2 col-sm-2 col-md-2">
            <strong>Item</strong>
          </div>
          <div className="col-lg-2 col-sm-2 col-md-2">
            <strong>Quantity</strong>
          </div>
          <div className="col-lg-2 col-sm-2 col-md-2">
            <strong>Rate</strong>
          </div>
          <div className="col-lg-2 col-sm-2 col-md-2">
            <strong>Amount</strong>
          </div>

          {items.map((item, idx) => (
            <div className="row container mb-1">
              <div className="col-sm-2 ">{item.name}</div>
              <div className="col-sm-2 mx-3">{item.quantity}</div>
              <div className="col-sm-2 mx-n2">{item.rate}</div>
              <div className="col-sm-2">{item.price}</div>
              <button
                onClick={() => deleteItem(idx)}
                className="btn-sm btn-danger"
              >
                Delete
              </button>
            </div>
          ))}
        </div>

        <h2>{subTotal}</h2>
      </div>
    </div>
  );
}

export default Invoice;
