import React from "react";
import axios from "axios";
import Book from "../../../Backend/model/book.model";

function Cards({ item, onDelete }) {
  const handleDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:4001/book/delete/${item._id}`);
      console.log(response.status)
    } catch (error) {
      console.error("Error deleting book:", error);
      // You can add further error handling logic here
    }
  };

  const handleBuyNow = () => {
    // Add your logic for buy now functionality here
    alert("you buy this book")
  };

  return (
    <div className="mt-4 my-3 p-3">
      <div className="card w-92 bg-base-100 shadow-xl hover:scale-105 duration-200 dark:bg-slate-900 dark:text-white dark:border">
        <figure>
          <img src={item.image} alt="Book Cover" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {item.name}
            <div className="badge badge-secondary">{item.category}</div>
          </h2>
          <p>{item.title}</p>
          <div className="card-actions justify-between">
            <div className="badge badge-outline">${item.price}</div>
            <div className="space-x-2">
              <button
                onClick={handleBuyNow}
                className="cursor-pointer px-2 py-1 rounded-full border-[2px] bg-green-500 text-white hover:bg-green-600 duration-200"
              >
                Buy Now
              </button>
              <button
                onClick={handleDelete}
                className="cursor-pointer px-2 py-1 rounded-full border-[2px] bg-red-500 text-white hover:bg-red-600 duration-200"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cards;
