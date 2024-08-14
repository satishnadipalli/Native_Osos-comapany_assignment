import { StyleSheet, Text, View, Image, FlatList, TextInput, TouchableOpacity, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addCardItem, addHomeProducts } from '../../productsSlice';
import { FontAwesome } from '@expo/vector-icons'; // Import FontAwesome for star icons
import RNModal from 'react-native-modal'; // Alias the Modal from react-native-modal

const Home = () => {
  const { homeProducts } = useSelector(state => state.cartModal);
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        dispatch(addHomeProducts(response.data));
      } catch (error) {
        console.log("Error occurred:", error.message);
      }
    }
    fetchProducts();
  }, [dispatch]);

  const toggleModal = (product) => {
    setSelectedProduct(product);
    setModalVisible(!isModalVisible);
  };

  const handleAddtoCart = (product) => {
    const updatedProduct = {
      ...product,
      quantity: isNaN(product.quantity) || product.quantity <= 0 ? 1 : product.quantity
    };
    dispatch(addCardItem(updatedProduct));
  };

  const renderProductItem = ({ item }) => (
    <View style={styles.productItem}>
      <Image
        source={{ uri: item.image }}
        style={styles.productImage}
        resizeMode="cover"
      />
      <Text style={styles.productTitle} numberOfLines={2}>{item.title}</Text>
      <Text style={styles.productDescription} numberOfLines={2}>{item.description}</Text>
      <View style={styles.productFooter}>
        <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
        <View style={styles.ratingContainer}>
          {[...Array(Math.floor(item.rating.rate))].map((_, index) => (
            <FontAwesome key={index} name="star" size={14} color="#FF9C01" />
          ))}
          {item.rating.rate % 1 > 0 && (
            <FontAwesome name="star-half-o" size={14} color="#FF9C01" />
          )}
          <Text style={styles.productRating}> ({item.rating.count})</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.viewButton} onPress={() => toggleModal(item)}>
        <Text style={styles.viewButtonText}>View Details</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchBarContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for products..."
          placeholderTextColor="#999"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity style={styles.searchButton} onPress={() => setSearchQuery('')}>
          <Text style={styles.searchButtonText}>Clear</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={homeProducts.filter(product => product.title.toLowerCase().includes(searchQuery.toLowerCase()))}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.productList}
      />
      {selectedProduct && (
        <RNModal
          isVisible={isModalVisible}
          onBackdropPress={() => setModalVisible(false)}
          style={styles.modal}
        >
          <View style={styles.modalContent}>
            <Pressable style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <FontAwesome name="times" size={18} color="#333" />
            </Pressable>
            <Image
              source={{ uri: selectedProduct.image }}
              style={styles.modalImage}
              resizeMode="cover"
            />
            <Text style={styles.modalTitle}>{selectedProduct.title}</Text>
            <Text style={styles.modalDescription}>{selectedProduct.description}</Text>
            <View style={styles.modalFooter}>
              <Text style={styles.modalPrice}>${selectedProduct.price.toFixed(2)}</Text>
              <View style={styles.ratingContainer}>
                {[...Array(Math.floor(selectedProduct.rating.rate))].map((_, index) => (
                  <FontAwesome key={index} name="star" size={16} color="#FF9C01" />
                ))}
                {selectedProduct.rating.rate % 1 > 0 && (
                  <FontAwesome name="star-half-o" size={16} color="#FF9C01" />
                )}
                <Text style={styles.modalRating}> ({selectedProduct.rating.count})</Text>
              </View>
              <TouchableOpacity style={styles.addButton} onPress={() => handleAddtoCart(selectedProduct)}>
                <Text style={styles.addButtonText}>Add to Cart</Text>
              </TouchableOpacity>
            </View>
          </View>
        </RNModal>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0', // Updated background color
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#fff', // Background color of the search bar container
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    padding: 10,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  searchButton: {
    padding: 10,
    backgroundColor: '#FF6F61', // Different color for the search button
    borderRadius: 10,
  },
  searchButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  productList: {
    paddingBottom: 20,
  },
  productItem: {
    flex: 1,
    margin: 5,
    borderRadius: 8,
    backgroundColor: '#fff', // Background color of product items
    overflow: 'hidden',
    elevation: 3,
  },
  productImage: {
    width: '100%',
    height: 150,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    margin: 10,
  },
  productDescription: {
    fontSize: 14,
    color: '#555',
    marginHorizontal: 10,
  },
  productFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
    marginHorizontal: 10,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  productRating: {
    fontSize: 14,
    color: '#555',
    marginLeft: 5,
  },
  viewButton: {
    backgroundColor: '#007BFF', // Different color for the view button
    padding: 10,
    borderRadius: 5,
    margin: 10,
    alignItems: 'center',
  },
  viewButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '90%',
    maxWidth: 400,
    elevation: 5,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  modalImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#28a745', // Different color for the add to cart button
    padding: 10,
    borderRadius: 5,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Home;
