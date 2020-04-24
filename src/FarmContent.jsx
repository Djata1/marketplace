import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Farms from "./Farms.jsx";
let FarmContent = props => {
  let dispatch = useDispatch();

  const farms = useSelector(state => {
    return state.farms;
  });
  console.log(farms);
  let load = async () => {
    let responseObject = await fetch("/farms");
    let responseBody = await responseObject.text();

    let parsed = JSON.parse(responseBody);
    if (parsed.success) {
      dispatch({ type: "all-farms", content: parsed.farms });
    }
  };
  useEffect(() => {
    load();
  });

  return (
    <div>
      {farms.map(farm => {
        return (
          <div>
            <Farms farm={farm} />
          </div>
        );
      })}
    </div>
  );
};
export default FarmContent;
