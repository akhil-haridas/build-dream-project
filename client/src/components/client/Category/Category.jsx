import React,{useState} from "react";

const Category = (props) => {
    const [displayCount, setDisplayCount] = useState(4);

    const handleLoadMore = () => {
      setDisplayCount(displayCount + 4);
    };

    const remainingItems = props.data.length - displayCount;
    const showLoadMoreButton = remainingItems > 0;

  return (
    <>
      {/* Professional Section */}
      <h2 className="md:ml-[0] ml-[86px] mr-[871px] mt-[50px] text-gray_900 font-normal md:text-3xl sm:text-[28px] text-[32px]">
        {props.title}
      </h2>
      {/* professional content */}
      <div className="md:gap-5 gap-[15px] grid sm:grid-cols-1 md:grid-cols-2 grid-cols-4 justify-center max-w-[1106px] min-h-[auto] mt-[38px] mx-auto md:px-5 w-full mb-[6rem]">
        {props.data.slice(0, displayCount).map((data) => (
          <div
            key={data._id}
            className="category border border-black_900_1f border-solid flex flex-1 flex-col gap-[15px] items-center justify-start p-1.5 rounded-[16px] w-full"
          >
            <img
              src={`http://localhost:4000/uploads/${data.image.replace(
                "\\",
                "/"
              )}`}
              className="h-[151px] md:h-auto object-cover rounded-[9px] w-full"
              alt={data.name}
            />
            <h6 className="mb-4 text-center text-gray_900 font-normal text-base">
              {data.name}
            </h6>
          </div>
        ))}
      </div>
      {showLoadMoreButton && (
        <div
          className="mb-[2rem]"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <button className="btn btn-theme-outline" onClick={handleLoadMore}>
            Load More
          </button>
        </div>
      )}
    </>
  );
};

export default Category;
