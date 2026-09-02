import React from "react";
import "./Orders.css";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { assets } from "../../assets/assets";

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(url + "/api/order/list");

      if (response.data.success) {
        setOrders(response.data.data);
        console.log(response.data.data);
      } else {
        toast.error("Error fetching orders");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error fetching orders");
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(url + "/api/order/status", {
        orderId,
        status: event.target.value,
      });

      if (response.data.success) {
        await fetchAllOrders();
        toast.success("Order status updated");
      } else {
        toast.error("Error updating order status");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error updating order status");
    }
  };

  // Delete order
  const deleteOrder = async (orderId) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this order?"
  );

  if (!confirmDelete) {
    return;
  }

  try {
    console.log("Deleting order:", orderId);
    console.log("Request URL:", url + "/api/order/delete");

    const response = await axios.post(
      url + "/api/order/delete",
      { orderId }
    );

    console.log("DELETE RESPONSE:", response);
    console.log("DELETE RESPONSE DATA:", response.data);
    console.log("DELETE RESPONSE STATUS:", response.status);

    if (response.data.success === true) {
      toast.success("Order deleted successfully");

      setOrders((prevOrders) =>
        prevOrders.filter((order) => order._id !== orderId)
      );
    } else {
      toast.error(
        response.data.message || "Server said deletion failed"
      );
    }
  } catch (error) {
    console.error("DELETE ERROR:", error);
    console.error("ERROR RESPONSE:", error.response);
    console.error("ERROR RESPONSE DATA:", error.response?.data);
    console.error("ERROR STATUS:", error.response?.status);

    toast.error(
      error.response?.data?.message || "Error deleting order"
    );
  }
};

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="order add">
      <h3>Order Page</h3>

      <div className="order-list">
        {orders.map((order, index) => {
          return (
            <div key={order._id || index} className="order-item">
              <img src={assets.parcel_icon} alt="" />

              <div>
                <p className="order-item-food">
                  {order.items.map((item, itemIndex) => {
                    if (itemIndex === order.items.length - 1) {
                      return item.name + " x " + item.quantity;
                    } else {
                      return item.name + " x " + item.quantity + ", ";
                    }
                  })}
                </p>

                <p className="order-item-name">
                  {order.address.firstName + " " + order.address.lastName}
                </p>

                <div className="order-item-address">
                  <p>{order.address.street + ","}</p>

                  <p>
                    {order.address.city +
                      ", " +
                      order.address.state +
                      ", " +
                      order.address.country +
                      ", " +
                      order.address.pincode}
                  </p>
                </div>

                <p className="order-item-phone">
                  {order.address.phone}
                </p>
              </div>

              <p>Items: {order.items.length}</p>

              <p>Amount: ₹{order.amount}</p>

              <select
                onChange={(event) =>
                  statusHandler(event, order._id)
                }
                value={order.status}
              >
                <option value="Food Processing">
                  Food Processing
                </option>

                <option value="Out for delivery">
                  Out for delivery
                </option>

                <option value="Delivered">
                  Delivered
                </option>
              </select>

              {/* Delete button */}
              <button
                className="delete-order-btn"
                onClick={() => deleteOrder(order._id)}
              >
                Delete
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Orders;