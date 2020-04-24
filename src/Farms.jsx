import React, { useState, useEffect } from "react";
import { useSelect, useDispatch } from "react-redux";

let Farms = props => {
  const { _id, size, description, location, image } = props.farm;
  return (
    <div>
      <div>{size}</div>
      <div>{description}</div>

      <div>
        <img src={image} />
      </div>
      <div>{location}</div>
      <div></div>
    </div>
  );
};
export default Farms;
