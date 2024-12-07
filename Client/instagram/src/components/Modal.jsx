import ReactDom from "react-dom";
import add from "../assets/images/add.png";
import { useState } from "react";
function Modal() {
  const [file, setFile] = useState(null);
  const [caption, setCaption] = useState("");
  const [isShowCaption, setIsShowCaption] = useState(caption);
  const handleNext = (e) => {
    e.preventDefault();
    console.log("my name s");
    setFile(e.target.files[0]);
    setIsShowCaption(true);
  };

  return ReactDom.createPortal(
    <div className="fixed top-0 left-0 w-full h-full z-50 flex items-center justify-center bg-[#0c0d0d9f]">
      <div className="w-[400px] rounded-l-lg h-[400px] bg-[#2f2f2f]" id="add">
        <h1 className="w-full p-3 bg-black text-white text-center">
          Create Post
        </h1>
        <form
          action=""
          className="w-full flex justify-center items-center h-[90%]"
        >
          <div
            className="w-full h-full  relative"
            style={{
              backgroundImage: `url(${file ? URL.createObjectURL(file) : add})`,
              backgroundSize: "50% auto",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center 30%",
            }}
          >
            <input
              type="file"
              onChange={(e) => handleNext(e)}
              className=" absolute z-10 top-0 bottom-0 opacity-0 w-full h-full cursor-pointer"
            />
            <button className="-z-0 absolute bottom-10 bg-black p-2 px-5 rounded-lg mt-2 border border-gray-600 left-1/2 -translate-x-1/2 text-white">
              Add file
            </button>
          </div>
        </form>
      </div>
      {isShowCaption ? (
        <div className="w-[400px] rounded-r-lg  h-[400px] border-l border-[#8886867d]  bg-[#2f2f2f] ">
          <h1 className="w-full p-3 bg-black text-white text-center ">
            Add caption
          </h1>
          <form
            action=""
            className="p-6 mt-8"
            onSubmit={(e) => e.preventDefault()}
          >
            <textarea
              className="w-full h-full bg-black text-white p-4 border-gray-600"
              placeholder="Write a caption..."
              rows={7}
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            ></textarea>
            <button className="w-full p-3 hover:bg-[#414141] active:bg-[#282727] rounded-lg mt-2 border border-gray-600 bg-black text-white ">
              Post
            </button>
          </form>
        </div>
      ) : (
        ""
      )}
    </div>,
    document.getElementById("modal")
  );
}

export default Modal;
