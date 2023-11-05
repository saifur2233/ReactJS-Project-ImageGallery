import React, { useCallback, useEffect, useState } from "react";
import galleryList from "./data.js";
import ImageCard from "./components/ImageCard.jsx";
import Swal from "sweetalert2";

const App = () => {
  const [flag, setFlag] = useState(false);
  const [images, setImages] = useState(galleryList);
  const [checkedImages, setCheckedImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const handleCheckedImages = (checkedImageId) => {
    setFlag(true);
    if (checkedImages.includes(checkedImageId)) {
      setCheckedImages(checkedImages.filter((id) => id !== checkedImageId));
    } else {
      setCheckedImages([...checkedImages, checkedImageId]);
    }
  };
  const handleDeleteAll = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setIsLoading(true);
        setTimeout(() => {
          setCheckedImages([]);
          setIsLoading(false);
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
          window.location.reload();
        }, 2000);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "Your file is safe :)", "error");
      }
    });
  };
  useEffect(() => {
    if (checkedImages.length === 0) {
      setFlag(false);
    }
  }, [checkedImages]);
  const moveImage = useCallback((dragIndex, hoverIndex) => {
    setImages((prevCards) => {
      const clonedCards = [...prevCards];
      const removedItem = clonedCards.splice(dragIndex, 1)[0];
      clonedCards.splice(hoverIndex, 0, removedItem);
      return clonedCards;
    });
  }, []);
  return (
    <main className="px-10 md:px-20 lg:px-40 py-10 bg-teal-50">
      <div className=" rounded-lg bg-white">
        {flag ? (
          <div className="mt-4 flex justify-between">
            <div className="text-xl px-10 pt-5  font-bold">
              {" "}
              <img
                className="w-5 inline"
                src="https://cdn0.iconfinder.com/data/icons/social-messaging-ui-color-shapes/128/check-square-blue-512.png"
                alt=""
              />{" "}
              {checkedImages.length} Files Selected
            </div>

            <div className="">
              <button
                onClick={handleDeleteAll}
                className="text-xl px-10 pt-5  font-medium text-red-700"
              >
                Delete files
              </button>
            </div>
          </div>
        ) : (
          <div className=" text-xl px-10 pt-5 font-bold">Gallery</div>
        )}

        <hr className="border-t-xs border-gray-400 my-8" />
        {isLoading ? (
          <div className="flex text-slate-600 items-center p-10 justify-center h-full">
            <div
              className="inline-block   h-12 w-12 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
              role="status"
            ></div>
            <span className="px-5">Loading... </span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5 px-10">
            {React.Children.toArray(
              images.map((image, index) => (
                <ImageCard
                  src={image.img}
                  title={image.title}
                  id={image.id}
                  index={index}
                  moveImage={moveImage}
                  handleCheckedImages={handleCheckedImages}
                />
              ))
            )}
          </div>
        )}
      </div>
    </main>
  );
};

export default App;
