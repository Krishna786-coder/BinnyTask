import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

import { RootState } from '../../store/Store/store';
import { addToCart} from '../../store/Reducer/cartReducer';
import Colors from '../../global/colors';
import { width } from '../../global/size';
import { APIProduct, Product } from '../../types/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigationTypes';





const ProductListScreen: React.FC = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const navigation = useNavigation<ProductScreen>();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

 type ProductScreen = NativeStackNavigationProp<RootStackParamList, "ProductListScreen">;

  const fetchProducts = async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/products');
      const data: APIProduct[] = await response.json();
      const dataWithQuantity: Product[] = data.map(item => ({ ...item, quantity: 0 }));
      setProducts(dataWithQuantity);
    } catch (error) {
      console.log('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useFocusEffect(
    useCallback(() => {
      navigation.setOptions({
        title: "Product List Screen",
        headerTitleStyle: {
          fontSize: width * 0.05,
        },
        headerRight: () => (
          <TouchableOpacity
            onPress={() => navigation.navigate("CartScreen")}
            style={{ marginRight: 10 }}
          >
            <View style={styles.cartContainer}>
              <Image
                source={require("../../assets/shopping-cart.png")} 
                style={styles.cartImage}
              />
              {cartItems.length > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{cartItems.length}</Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        ),
      });
    }, [navigation, cartItems])
  );


  const isInCart = (id: number) => cartItems.some(item => item.id === id);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color={Colors.black} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={item => item.id.toString()}
        numColumns={2} 
        columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: 10 }}
        renderItem={({ item }) => {
          const inCart = isInCart(item.id);
          return (
            <View style={styles.item}>
              <Image source={{ uri: item.image }} style={styles.image} resizeMode="contain" />
              <Text style={styles.title} numberOfLines={2}>
                {item.title}
              </Text>
              <Text style={styles.price}>${item.price}</Text>

              <TouchableOpacity
                style={[styles.button, inCart && styles.disabledButton]}
                disabled={inCart}
                onPress={() => dispatch(addToCart(item))}
              >
                <Text style={styles.buttonText}>{inCart ? 'Added' : 'Add to Cart'}</Text>
              </TouchableOpacity>
            </View>
          );
        }}
      />

    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.grayBackground,padding:10},
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  item: {
    backgroundColor: Colors.white,
    width: width/ 2 - 15,
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  image: { width: '100%', height: 120, marginBottom: 10 },
  title: { fontSize: 14, fontWeight: '600', color: Colors.black, marginBottom: 5 },
  price: { fontSize: 13, color: Colors.grayMedium, marginBottom: 10 },
  button: { backgroundColor: Colors.black, padding: 8, borderRadius: 5, alignItems: 'center', width: '100%' },
  disabledButton: { backgroundColor: Colors.grayMedium },
  buttonText: { color: Colors.white, fontWeight: 'bold', fontSize: 14 },
  cartButton: { backgroundColor: Colors.black, padding: 12, borderRadius: 5, alignItems: 'center', marginTop: 10 },
  cartButtonText: { color: Colors.white, fontWeight: 'bold' },
  cartContainer: {
    width: 30,
    height: 30,
  },
  cartImage: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
  badge: {
    position: "absolute",
    right: -5,
    top: -5,
    backgroundColor: "red",
    borderRadius: 8,
    paddingHorizontal: 4,
    paddingVertical: 1,
    minWidth: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeText: {
    color: "white",
    fontSize: width * 0.025,
    fontWeight: "bold",
  },
});

export default ProductListScreen;
