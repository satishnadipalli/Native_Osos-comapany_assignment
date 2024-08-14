import { createSlice } from '@reduxjs/toolkit';

const productsSlice = createSlice({
    name: 'products',
    initialState: {
        cartProducts: [],
        homeProducts: [],
    },
    reducers: {
        addCardItem: (state, action) => {
            const product = action.payload;
            const existingProduct = state.cartProducts.find(item => item.id === product.id);
            
            if (existingProduct) {
                // Update the quantity of the existing product
                existingProduct.quantity = (existingProduct.quantity || 0) + (isNaN(product.quantity) || product.quantity <= 0 ? 1 : product.quantity);
            } else {
                // Add new product to the cart with a default quantity of 1
                state.cartProducts.push({
                    ...product,
                    quantity: isNaN(product.quantity) || product.quantity <= 0 ? 1 : product.quantity
                });
            }
        },
        deleteCartProduct: (state, action) => {
            const id = action.payload;
            state.cartProducts = state.cartProducts.filter(item => item.id !== id);
        },
        updateQuantity: (state, action) => {
            const { id, quantity } = action.payload;
            const product = state.cartProducts.find(item => item.id === id);
            if (product) {
                product.quantity = quantity;
            }
        },
        clearCart: (state) => {
            state.cartProducts = [];
        },
        addHomeProducts: (state, action) => {
            state.homeProducts = action.payload;
        },
    },
});

export const { addCardItem, deleteCartProduct, updateQuantity, clearCart, addHomeProducts } = productsSlice.actions;

export default productsSlice.reducer;
