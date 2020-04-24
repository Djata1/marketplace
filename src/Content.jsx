import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Items from "./Items.jsx";
import styled from "styled-components";
import Menu from "./Menu.jsx";
const Wr = styled.div`
  display: grid;
  grid-template-columns: 15% 1fr;
`;
const Image = styled.img`
  width: 96%;
  height: 400px;
  object-fit: cover;
  border-radius: 21px 21px 21px 21px;
  margin-top: 110px;
  margin-left: 30px;
  margin-right: 0px;
`;

const Wrapper = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 10px;
  margin: 50px;
  margin-top: 88px;
  & > h1 {
    grid-column-start: span 4;
  }
`;
const MenuWrapper = styled.div``;
let Content = (props) => {
  let dispatch = useDispatch();
  const items = useSelector((state) => {
    return state.items;
  });
  const category = useSelector((state) => {
    return state.category;
  });
  const searchQuery = useSelector((state) => {
    return state.searchQuery;
  });
  console.log(items);
  let load = async () => {
    let responseObject = await fetch("/items");
    let responseBody = await responseObject.text();
    let parsed = JSON.parse(responseBody);
    if (parsed.success) {
      dispatch({ type: "all-items", content: parsed.items });
    }
  };
  useEffect(() => {
    load();
  }, []);
  let result = [];
  let fruits = [];
  let cheese = [];
  let meat = [];
  let fish = [];
  let chickens = [];
  let vegetables = [];
  if (!searchQuery && !category) {
    items.forEach((item) => {
      switch (item.categories[0]) {
        case "Fruits":
          fruits.push(item);
          break;
        case "Meat":
          meat.push(item);
          break;
        case "Vegetables":
          vegetables.push(item);
          break;
        case "Cheese":
          cheese.push(item);
          break;
        case "Chicken":
          chickens.push(item);
          break;
        case "Fish":
          fish.push(item);
          break;
      }
    });
  } else {
    result = items.filter((item) => {
      return (
        item.description.includes(searchQuery) &&
        (!category || item.categories.includes(category))
      );
    });
  }
  console.log("result:", result);
  return (
    <Wr>
      <MenuWrapper>
        <Menu />
      </MenuWrapper>
      <div>
        <div>{category === "Chicken" && <Image src="/images/chik.jpg" />}</div>
        <div>{category === "Fruits" && <Image src="/images/orange.jpg" />}</div>
        <div>
          {category === "Fish" && <Image src="/images/fishermen.jpg" />}
        </div>
        <div>
          {category === "Vegetables" && <Image src="/images/veget.jpg" />}
        </div>
        <div>
          {category === "Cheese" && <Image src="/images/chessess.jpg" />}
        </div>
        <div>{category === "Meat" && <Image src="/images/beef.jpg" />}</div>

        <Wrapper>
          {items.length === 0 ? (
            <img src="/images/tomato_loading.gif" />
          ) : !category && !searchQuery ? (
            <>
              <h1>Fruits</h1>
              {fruits.map((item) => (
                <Items key={item._id} item={item} />
              ))}
              <h1>Meat</h1>
              {meat.map((item) => (
                <Items key={item._id} item={item} />
              ))}
              <h1>Vegetables</h1>
              {vegetables.map((item) => (
                <Items key={item._id} item={item} />
              ))}
              <h1>Cheese</h1>
              {cheese.map((item) => (
                <Items key={item._id} item={item} />
              ))}
              <h1>Chicken</h1>
              {chickens.map((item) => (
                <Items key={item._id} item={item} />
              ))}
            </>
          ) : (
            result.map((item) => <Items key={item._id} item={item} />)
          )}
        </Wrapper>
      </div>
    </Wr>
  );
};
export default Content;
