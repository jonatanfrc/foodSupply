import { createContext, useState } from "react";

export const CartContext = createContext();

export default function CartProvider({ children }) {
  const [productsCart, setProductsCart] = useState([]);

  //{id: 1, qtd:1}

  function addProducToCart(id, idVendedor, preco, imagem) {
    const copyProductsCart = [...productsCart];

    const item = copyProductsCart.find((product) => product.id === id);

    if (!item) {
      copyProductsCart.push({ id: id, idVendedor: idVendedor, qtd: 1, value: preco, foto: imagem });
    } else{
      item.qtd = item.qtd + 1;
    }

    setProductsCart(copyProductsCart);
    localStorage.setItem('cart', copyProductsCart)
  }

  function removeProductToCart(id) {
    const copyProductsCart = [...productsCart];

    const item = copyProductsCart.find((product) => product.id === id);

    if (item && item.qtd > 1) {
      item.qtd = item.qtd - 1;
      setProductsCart(copyProductsCart);
    } else {
      const arrayFiltered = copyProductsCart.filter(
        (product) => product.id !== id
      );
      setProductsCart(arrayFiltered);
    }
  }

  function clearCart() {
    setProductsCart([]);
    localStorage.removeItem('cart');
  }

  return (
    <CartContext.Provider
      value={{ productsCart, addProducToCart, removeProductToCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}