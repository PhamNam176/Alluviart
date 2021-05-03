import React from "react";
import { HIGHEST_RATING } from "../config";

const ProductRatings = function ({ value, color, text }) {
  const starValues = getStars(value);
  return (
    <div className="rating">
      <span>
        {starValues.map((value) => (
          <i
            style={{ color }}
            className={
              value >= 1
                ? "fas fa-star"
                : value >= 0.5
                ? "fas fa-star-half-alt"
                : "far fa-star"
            }
          ></i>
        ))}
      </span>
      <span> {text && text} </span>
    </div>
  );
};

// function to get arrays number of rating
const getStars = function (value) {
  let resStar = [];
  if (value <= 1) {
    resStar.push(value);
  } else {
    for (let i = 0; i < HIGHEST_RATING; i++) {
      i < value ? resStar.push(Math.min(1, value - i)) : resStar.push(0);
    }
  }
  return resStar;
};

export default ProductRatings;
