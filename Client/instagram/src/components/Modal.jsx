import ReactDom from "react-dom";
import add from "../assets/images/add.png";
import axios from "axios";
import { useState } from "react";

function Modal() {
  const [file, setFile] = useState(null);
  const [caption, setCaption] = useState("");
  const [isShowCaption, setIsShowCaption] = useState(false);

  // Triggered when a file is selected
  const handleNext = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile); // Update the file state
      setIsShowCaption(true); // Show the caption input
    }
  };

  // Handles form submission and file upload
  const handleFileUpload = async (e) => {
    e.preventDefault(); // Prevent default form submission

    if (!file) {
      alert("Please select a file before submitting.");
      return;
    }

    const formData = new FormData(); // Create a new FormData instance
    formData.append("file", file); // Append the file
    formData.append("caption", caption); // Append the caption

    try {
      const response = await axios.post(
        "http://localhost:3000/api/posts",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Post created successfully:", response.data);
      alert("Post created successfully!");

      // Reset the state after successful upload
      setFile(null);
      setCaption("");
      setIsShowCaption(false);
    } catch (error) {
      console.error("Error creating post:", error.response?.data || error);
      alert("Failed to create post.");
    }
  };

  return ReactDom.createPortal(
    <div className="fixed top-0 left-0 w-full h-full z-50 flex items-center justify-center bg-[#0c0d0d9f]">
      <div className="w-[400px] rounded-l-lg h-[400px] bg-[#2f2f2f]" id="add">
        <h1 className="w-full p-3 bg-black text-white text-center">
          Create Post
        </h1>
        <form
          className="w-full flex justify-center items-center h-[90%]"
          onSubmit={handleFileUpload} // Connect the form submission to handleFileUpload
        >
          <div
            className="w-full h-full relative"
            style={{
              backgroundImage: `url(${file ? URL.createObjectURL(file) : add})`,
              backgroundSize: "60% auto",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center 30%",
            }}
          >
            <input
              type="file"
              onChange={handleNext}
              className="absolute z-10 top-0 bottom-0 opacity-0 w-full h-full cursor-pointer"
            />
            <button
              type="button" // Prevent this button from submitting the form
              className="-z-0 absolute bottom-10 bg-black p-2 px-5 rounded-lg mt-2 border border-gray-600 left-1/2 -translate-x-1/2 text-white"
            >
              Add file
            </button>
          </div>
        </form>
      </div>
      {isShowCaption && (
        <div className="w-[400px] rounded-r-lg h-[400px] border-l border-[#8886867d] bg-[#2f2f2f]">
          <h1 className="w-full p-3 bg-black text-white text-center">
            Add Caption
          </h1>
          <form className="p-6 mt-8" onSubmit={handleFileUpload}>
            <textarea
              className="w-full h-full bg-black text-white p-4 border-gray-600"
              placeholder="Write a caption..."
              rows={7}
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            ></textarea>
            <button
              type="submit" // Submit the form and trigger handleFileUpload
              className="w-full p-3 hover:bg-[#414141] active:bg-[#282727] rounded-lg mt-2 border border-gray-600 bg-black text-white"
            >
              Post
            </button>
          </form>
        </div>
      )}
    </div>,
    document.getElementById("modal")
  );
}

export default Modal;
