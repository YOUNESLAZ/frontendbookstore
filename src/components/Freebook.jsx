import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import Cards from "./Cards";

function Freebook() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://localhost:4001/book");
        const data = response.data.filter((book) => book.category === "Free");
        setBooks(data);
      } catch (error) {
        console.error("Error fetching free books:", error);
      }
    };

    fetchBooks();
  }, []);

  const handleDeleteBook = async (bookId) => {
    try {
      await axios.delete(`http://localhost:4001/book/${bookId}`);
      setBooks((prevBooks) => prevBooks.filter((book) => book._id !== bookId));
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="max-w-screen-2xl container mx-auto md:px-20 px-4">
      <div>
        <h1 className="font-semibold text-xl pb-2">Free Offered Courses</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium
          veritatis alias pariatur ad dolor repudiandae eligendi corporis nulla
          non suscipit, iure neque earum?
        </p>
      </div>

      <div>
        <Slider {...settings}>
          {books.map((book) => (
            <div key={book._id}>
              <Cards item={book} />
              <button
                onClick={() => handleDeleteBook(book._id)}
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700 duration-300"
              >
                Delete Book
              </button>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default Freebook;
