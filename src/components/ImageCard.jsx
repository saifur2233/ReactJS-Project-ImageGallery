import { useRef, useState } from "react";
import PropTypes from "prop-types";
import { useDrag, useDrop } from "react-dnd";

const ImageCard = ({
  src,
  title,
  id,
  index,
  moveImage,
  handleCheckedImages,
}) => {
  const ref = useRef(null);
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    handleCheckedImages(id); // Pass the ID of the image to the parent component
  };
  const [, drop] = useDrop({
    accept: "image",
    hover: (item, monitor) => {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveImage(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });
  const [{ isDragging }, drag] = useDrag({
    type: "image",
    item: () => {
      return { id, index };
    },
    collect: (monitor) => {
      return {
        isDragging: monitor.isDragging(),
      };
    },
  });
  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));
  return (
    <>
      <div
        ref={ref}
        style={{ opacity }}
        className={`relative ${
          index === 0
            ? "lg:row-span-2 lg:col-span-2 "
            : "lg:col-span-1 sm:col-span-1"
        }`}
      >
        <div className=" rounded border border-gray-300  cursor-pointer">
          <label className="relative">
            <img
              src={src}
              alt={title}
              className="w-full h-full object-cover "
            />
            <div className="overlay transition duration-300 ease-in-out opacity-0 hover:opacity-25 bg-black absolute w-full h-full top-0 left-0 flex items-center justify-center"></div>
            <input
              type="checkbox"
              className="absolute top-4 left-4"
              checked={isChecked}
              onChange={handleCheckboxChange}
            />
          </label>
        </div>
      </div>
    </>
  );
};

ImageCard.propTypes = {
  src: PropTypes.string.isRequired, // Define the src prop as a required string
  title: PropTypes.string,
  id: PropTypes.number,
  index: PropTypes.number,
  moveImage: PropTypes.func,
  handleCheckedImages: PropTypes.func,
};

export default ImageCard;
