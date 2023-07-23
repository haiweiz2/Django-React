import { ProductProvider } from "./ProductContext";
import { ProductContext } from "./ProductContext";
import { ProductDispatchContext } from "./ProductContext";
import { useContext } from "react";

function useProduct() {
    return useContext(ProductContext);
}

function useProductDispatch() {
    return useContext(ProductDispatchContext);
}

export {
    useProduct,
    ProductProvider,
    useProductDispatch,
}