import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";

const List = styled.ul`
  list-style-type: none;
`;
const Header = styled.div`
  &:hover {
    cursor: pointer;
  }
`;
const ListItem = styled.li`
  margin: 10px 0;
  &:hover {
    cursor: pointer;
    color: blue;
  }
`;

const CategoryContent = (props) => {
  const dispatch = useDispatch();
  let handleSetOpenItemsList = () => {
    props.setOpenItemsList(props.category.name);
    dispatch({ type: "categoryChange", category: props.category.name });
  };

  const handleCategoryChange = (type) => {
    dispatch({
      type: "categoryChange",
      category: type,
    });
  };
  return (
    <div>
      <Header onClick={handleSetOpenItemsList}>{props.category.name}</Header>
      <List>
        {props.isOpen &&
          props.category.types.map((type) => (
            <ListItem onClick={() => handleCategoryChange(type)}>
              {type}
            </ListItem>
          ))}
      </List>
    </div>
  );
};
export default CategoryContent;
