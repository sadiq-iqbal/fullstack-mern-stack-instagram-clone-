import React from "react";
import ReactDom from "react-dom";
import add from "../assets/images/add.png";
function Modal({ children }) {
  return ReactDom.createPortal(
    <div className="fixed top-0 left-0 w-full h-full z-50 flex items-center justify-center bg-[#3435357e]">
      <div className="w-[400px] h-[400px]  rounded-2xl bg-[#2f2f2f]" id="add">
        <h1 className="w-full p-3 bg-black text-white text-center">
          Create Post
          <button className="float-right text-blue-800 ">Next</button>
        </h1>
        <form
          action=""
          className="w-full flex justify-center items-center h-[90%]"
        >
          <div
            className="w-full h-full  relative"
            style={{
              backgroundImage: `url(${add})`,
              backgroundSize: "50% auto",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center 30%",
            }}
          >
            <input
              type="file"
              className=" absolute z-10 top-0 bottom-0 opacity-0 w-full h-full cursor-pointer"
            />
            <button className="-z-0 absolute bottom-10 bg-black p-2 px-5 border-[0.5px] border-gray-800 rounded-lg left-1/2 -translate-x-1/2 text-white">
              Add file
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.getElementById("modal")
  );
}

export default Modal;
