import React, { useState } from "react";
import styled from "styled-components";
import CategoryContent from "./CategoryContent.jsx";
const Wrapper = styled.div`
  @media (max-width: 760px) {
    & {
      display: none;
    }
  }
  margin-top: 100px;
  padding: 50px;
  background-color: beige;
  position: fixed;
`;
const categories = [
  {
    name: "Fruits",
    types: [
      "Oranges",
      "Pears",
      "Mangoes",
      "Pineapple",
      "Strawberries",
      "Bananas",
      "Grapes",
      "Apples",
      "Papaya",
    ],
  },
  {
    name: "Vegetables",
    types: [
      "Tomatoes",
      "Cabbages",
      "Carrots",
      "Onions",
      "Garlic",
      "Pepper",
      "Hot Pepper",
    ],
  },
  { name: "Meat", types: ["Beef", "Sheep"] },
  {
    name: "Chicken",
    types: ["Entire Chicken", "Breasts", "Thighs", "Legs", "Wings"],
  },
  { name: "Fish", types: ["Edouare", "Erwan", "Maquero"] },
  { name: "Cheese", types: ["Organic", "Waldemar"] },
];
let Menu = () => {
  const [openItemsList, setOpenItemsList] = useState("");
  return (
    <Wrapper>
      {categories.map((category) => (
        <CategoryContent
          category={category}
          setOpenItemsList={setOpenItemsList}
          isOpen={category.name === openItemsList}
        />
      ))}
    </Wrapper>
  );
};

export default Menu;
