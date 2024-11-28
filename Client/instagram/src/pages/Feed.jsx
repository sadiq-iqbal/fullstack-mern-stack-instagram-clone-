function Feed() {
  return (
    <>
      <div className="feedContainer p-8 ">
        <div className="container flex flex-row w-[98%] ">
          <div className="master w-[35%] ">
            <div className="box w-[100%] bg-gray-600 border-2 h-full">1</div>
          </div>
          <div className="flex flex-grow  flex-wrap">
            <div className="box w-[50%] bg-gray-600 border-2 h-[300px] ">2</div>
            <div className="box w-[50%] bg-gray-600 border-2 h-[300px] ">3</div>
            <div className="box w-[50%] bg-gray-600 border-2 h-[300px] ">4</div>
            <div className="box w-[50%] bg-gray-600 border-2 h-[300px] ">5</div>
          </div>
        </div>
        <div className="container flex flex-row-reverse w-[98%] border-2">
          <div className="master w-[35%] ">
            <div className="box w-[100%] bg-gray-600 border-2 h-full">1</div>
          </div>
          <div className="flex flex-grow  flex-wrap">
            <div className="box w-[50%] bg-gray-600 border-2 h-[300px] ">2</div>
            <div className="box w-[50%] bg-gray-600 border-2 h-[300px] ">3</div>
            <div className="box w-[50%] bg-gray-600 border-2 h-[300px] ">4</div>
            <div className="box w-[50%] bg-gray-600 border-2 h-[300px] ">5</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Feed;
