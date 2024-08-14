import { clearCart, deleteCartProduct, updateQuantity } from '../../productsSlice';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image, Button } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // Import FontAwesome for star icons

const CartPage = () => {
    const dispatch = useDispatch();
    const cartProducts = useSelector((state) => state.cartModal.cartProducts);

    const handleRemove = (id) => {
        dispatch(deleteCartProduct(id));
    };

    const handleUpdateQuantity = (id, quantity) => {
        if (quantity >= 0) {
            dispatch(updateQuantity({ id, quantity }));
        }
    };

    const handleClearCart = () => {
        dispatch(clearCart());
    };

    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <Image source={{ uri: item.image }} style={styles.itemImage} />
            <View style={styles.detailsContainer}>
                <Text style={styles.itemTitle} numberOfLines={1}>{item.title}</Text>
                <View style={styles.ratingContainer}>
                    {[...Array(Math.floor(item.rating.rate))].map((_, index) => (
                        <FontAwesome key={index} name="star" size={16} color="#FF9C01" />
                    ))}
                    {item.rating.rate % 1 > 0 && (
                        <FontAwesome name="star-half-o" size={16} color="#FF9C01" />
                    )}
                    <Text style={styles.itemRating}> {item.rating.count} reviews</Text>
                </View>
                <Text style={styles.itemPrice}> Price: ${item.price.toFixed(2)}</Text>
                <View style={styles.quantityContainer}>
                    <TouchableOpacity
                        style={styles.quantityButton}
                        onPress={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1} // Disable button if quantity is 1
                    >
                        <Text style={styles.quantityButtonText}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.quantity}>{item.quantity}</Text>
                    <TouchableOpacity
                        style={styles.quantityButton}
                        onPress={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                    >
                        <Text style={styles.quantityButtonText}>+</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.removeButton}
                        onPress={() => handleRemove(item.id)}
                    >
                        <Text style={styles.removeButtonText}>Remove</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Cart Items</Text>
            {cartProducts.length === 0 ? (
                <Text style={styles.emptyMessage}>Your cart is empty</Text>
            ) : (
                <FlatList
                    data={cartProducts}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={styles.listContainer}
                />
            )}
            {cartProducts.length > 0 && (
                <View style={styles.clearCartButtonContainer}>
                    <Button
                        title="Clear Cart"
                        style={styles.but}
                        onPress={handleClearCart}
                        color="#FF6F61" // Clear cart button color
                    />
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5', // Light gray background
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        marginTop:20
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 2,
    },
    itemImage: {
        width: 100,
        height: 140,
        borderRadius: 8,
        marginRight: 15,
    },
    detailsContainer: {
        flex: 1,
    },
    itemTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#333', // Title color
    },
    itemRating: {
        fontSize: 14,
        color: '#555',
        marginLeft: 5,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    itemPrice: {
        fontSize: 14,
        color: '#555',
        marginBottom: 10,
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    quantityButton: {
        padding: 10,
        backgroundColor: '#007BFF', // Color for quantity buttons
        borderRadius: 5,
        marginHorizontal: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    quantityButtonText: {
        color: '#fff',
        fontSize: 18,
    },
    quantity: {
        fontSize: 18,
        marginHorizontal: 10,
    },
    removeButton: {
        padding: 10,
        backgroundColor: '#FF6F61', // Color for remove button
        borderRadius: 5,
        marginLeft: 10, // Margin left to space out from quantity buttons
    },
    removeButtonText: {
        color: '#fff',
        fontSize: 14,
    },
    emptyMessage: {
        fontSize: 18,
        textAlign: 'center',
        marginTop: 50,
    },
    listContainer: {
        paddingBottom: 20,
    },
    clearCartButtonContainer: {
        marginTop: 20,
        alignItems: 'center',

    },
});

export default CartPage;
