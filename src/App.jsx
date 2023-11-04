import React, { useCallback, useEffect, useState } from "react";
import galleryList from "./data.js";
import ImageCard from "./components/ImageCard.jsx";

const App = () => {
  const [flag, setFlag] = useState(false);
  const [images, setImages] = useState(galleryList);
  const [checkedImages, setCheckedImages] = useState([]);
  const handleCheckedImages = (checkedImageId) => {
    setFlag(true);
    if (checkedImages.includes(checkedImageId)) {
      setCheckedImages(checkedImages.filter((id) => id !== checkedImageId));
    } else {
      setCheckedImages([...checkedImages, checkedImageId]);
    }
  };
  const handleDeleteAll = () => {
    setCheckedImages([]);
    window.location.reload();
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
              {" "}
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
      </div>
    </main>
  );
};

export default App;
