import { useState } from "react";
import { Link } from "react-router-dom";
import "./pages.css";

function Home() {
  const [productName, setPorductName] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);

  const handleInputChange = (event) => {
    switch (event.target.name) {
      case "product_name":
        setPorductName(event.target.value);
        break;
      case "description":
        setDescription(event.target.value);
        break;
      default:
        console.error("case doesn;t exist");
    }
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  async function handleSubmit(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    const formData = new FormData();
    formData.append("product_name", productName);
    formData.append("description", description);
    formData.append("image", file);

    try {
      const response = await fetch("http://localhost:8000/api/products/", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(response);
      }
    } catch (error) {
      // Handle errors if any
      console.error("Error:", error);
    }
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h2>Add a Product</h2>
        <div className="input-container">
          <label htmlFor="product_name">Product Name</label>
          <input
            type="text"
            id="product_name"
            name="product_name"
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="input-container">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            rows="5"
            onChange={handleInputChange}
          ></textarea>
        </div>
        <div className="input-container">
          <label htmlFor="image_upload">Upload Product Image</label>
          <input
            type="file"
            id="image_upload"
            name="image_upload"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
        <div className="submit-container">
          <input type="submit" value="Submit" />
        </div>
        <Link to="/products" className="return-link">
          All products
        </Link>
      </form>
    </div>
  );
}

export default Home;
