import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    try {
      const response = await fetch(`https://dummyjson.com/products?limit=100`);
      if (!response.ok) {
        throw new Error("respone failed");
      }
      const data = await response.json();
      console.log(data);
      setProducts(data.products);
    } catch (error) {
      setError(true);
      console.log("Error occured while fetching", error.message);
    }
  }

  return (
    <div className="container">
      {error ? (
        <h1>! Server not working ! try again later ! </h1>
      ) : (
        products.map((product) => {
          const { discountPercentage, id, images, price, stock, title } =
            product;
          return (
            <div className="card" key={id}>
              {stock <= 50 ? (
                <span className="message">hurry! only a few left</span>
              ) : (
                ""
              )}
              <div className="imgBox">
                <img
                  src={images[0]}
                  alt="product image"
                  className="productImage"
                />
              </div>

              <div className="contentBox">
                <h3 className="title">{title}</h3>
                <span className="discountPercentage">
                  {discountPercentage}%{" "}
                </span>
                <span className="price">${price}</span>
                <span className="mrp">{`${(
                  price /
                  (1 - discountPercentage / 100)
                ).toFixed(2)}`}</span>
                <button>Buy Now</button>
              </div>
            </div>
          );
        })
      )}
      {}
    </div>
  );
}

export default App;
