const StarRating = ({ starHook, value, hover, onRate, onHover }) => {
  const rValue = starHook ? starHook.value : value;
  const rHover = starHook ? starHook.hover : hover;
  const rSetRating = starHook ? starHook.setRating : onRate;
  const rSetHover = starHook ? starHook.setHover : onHover;

  return (
    <div className="flex items-center gap-1.5 my-1">
      {[1, 2, 3, 4, 5].map((star) => {
        const isActive = star <= (rHover || rValue);

        return (
          <span
            key={star}
            className={`
              cursor-pointer text-3xl transition-all duration-300 transform 
              active:scale-90 select-none
              ${
                isActive
                  ? "text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.6)] scale-110"
                  : "text-gray-300 hover:text-gray-400"
              }
              hover:scale-125
            `}
            onClick={(e) => {
              e.stopPropagation();
              rSetRating(star);
            }}
            onMouseEnter={() => rSetHover(star)}
            onMouseLeave={() => rSetHover(0)}
          >
            ★
          </span>
        );
      })}
    </div>
  );
};

export default StarRating;
