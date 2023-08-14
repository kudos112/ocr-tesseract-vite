import { useEffect, useState } from "react";
import Tesseract from "tesseract.js";
import "./App.css";

function App() {
  const [image, setImage] = useState();
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("");

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      // You may add additional validations for the image here
      setImage(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    const extractText = async () => {
      try {
        setLoading(true);
        const {
          data: { text },
        } = await Tesseract.recognize(image, "eng");
        setText(text);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error.message);
      }
    };
    if (image) extractText();
  }, [image]);

  return (
    <>
      <div className="card">
        <label htmlFor="image-upload">Upload an Image:</label>
        <br />
        <br />
        <input
          type="file"
          id="image-upload"
          accept="image/png, image/jpeg, image/gif"
          onChange={handleImageChange}
        />
        {image && <img src={image} alt="Preview" />}
        <h2>Extracted text</h2>
        {loading ? (
          <h3>Loading...</h3>
        ) : (
          <p className="extracted-text">{text}</p>
        )}
      </div>
    </>
  );
}

export default App;
