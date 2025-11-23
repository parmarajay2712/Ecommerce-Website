import { createContext, useContext, useState } from "react"; // React hooks for state and context
import { toast } from "react-toastify"; // Import toast notifications

// ✅ Create CartContext with default null value
export const CartContext = createContext(null);

// ✅ CartProvider component to wrap the app and provide cart state
export const CartProvider = ({ children }) => {
  const [cartitem, setCartitem] = useState([]); // State to hold cart items

  // ✅ Function to add product to cart
  const addToCart = (product) => {
    setCartitem((prevCart) => {
      const itemInCart = prevCart.find((item) => item.id === product.id);

      if (itemInCart) {
        // ✅ If item already exists, increase its quantity
        const updatedCart = prevCart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + (product.quantity || 1),
              }
            : item
        );
        toast.success("Product quantity updated in cart");
        return updatedCart;
      } else {
        // ✅ If new item, add it with default quantity 1
        const newItem = {
          ...product,
          image: product.image || product.thumbnail || product.images?.[0],
          quantity: product.quantity || 1,
        };
        toast.success("Product added to cart");
        return [...prevCart, newItem];
      }
    });
  };

  // ✅ Function to update quantity of a product in cart
  const updatequantity = (productId, action) => {
    setCartitem(
      (prevCart) =>
        prevCart
          .map((item) => {
            if (item.id === productId) {
              let newunit = item.quantity;
              if (action === "increase") {
                newunit += 1;
                toast.success("Quantity increased");
              } else if (action === "decrease") {
                newunit -= 1;
                toast.success("Quantity decreased");
              }
              return newunit > 0 ? { ...item, quantity: newunit } : null;
            }
            return item;
          })
          .filter((item) => item !== null) // Remove items with 0 quantity
    );
  };

  // ✅ Function to delete an item from the cart
  const deleteitem = (productId) => {
    setCartitem((prevCart) => prevCart.filter((item) => item.id !== productId));
    toast.success("Product deleted from cart");
  };

  // ✅ Provide cart state and actions to children components
  return (
    <CartContext.Provider
      value={{ cartitem, setCartitem, addToCart, updatequantity, deleteitem }}
    >
      {children}
    </CartContext.Provider>
  );
};

// ✅ Custom hook to consume CartContext easily
export const useCart = () => useContext(CartContext);
