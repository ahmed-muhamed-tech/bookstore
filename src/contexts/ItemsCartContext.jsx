import { createContext, useState } from "react";

const itemsCartContext = createContext();

const ItemsCartProvider = ({ children }) => {
  const [items, setItems] = useState(() => {
    const itemsInLocal = localStorage.getItem("items");
    return itemsInLocal ? JSON.parse(itemsInLocal) : [];
  });

  const addNewItem = (image, title, author, price, category) => {
    const newItems = [
      ...items,
      {
        image,
        title,
        author,
        price,
        category,
      },
    ];

    setItems(newItems);

    localStorage.setItem("items", JSON.stringify(newItems));
  };

  let countItems = items?.length || 0;

  let totalPrice =
    items
      ?.map(({ price }) => Number(price))
      .reduce((acc, cur) => acc + cur, 0) || 0;

  const deleteCurrentBookFromCart = (currentIndex) => {
    const newItems = items.filter((_, index) => index !== currentIndex);
    setItems(newItems);

    localStorage.setItem("items", JSON.stringify(newItems));
  };

  return (
    <itemsCartContext.Provider
      value={{
        items,
        addNewItem,
        countItems,
        totalPrice,
        deleteCurrentBookFromCart,
      }}
    >
      {children}
    </itemsCartContext.Provider>
  );
};
export default ItemsCartProvider;
export { itemsCartContext };
