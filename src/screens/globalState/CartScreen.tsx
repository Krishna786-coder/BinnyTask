import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/Store/store';
import { incrementQuantity, decrementQuantity} from '../../store/Reducer/cartReducer';
import Colors from '../../global/colors';
import { Product } from '../../types/types';

const { width } = Dimensions.get('window');

const CartScreen: React.FC = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const renderItem = ({ item }: { item: Product }) => {
    return (
      <View style={styles.card}>
        <Image source={{ uri: item.image }} style={styles.image} resizeMode="contain" />
        <View style={styles.info}>
          <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
          <Text style={styles.description} numberOfLines={1}>{item.description}</Text>

          <View style={styles.qtyContainer}>
            <TouchableOpacity
              style={styles.qtyButton}
              onPress={() => dispatch(decrementQuantity(item.id))}
            >
              <Text style={styles.qtyText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.qtyValue}>{item.quantity}</Text>
            <TouchableOpacity
              style={styles.qtyButton}
              onPress={() => dispatch(incrementQuantity(item.id))}
            >
              <Text style={styles.qtyText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.price}>${(item.price * item.quantity).toFixed(2)}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {cartItems.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyText}>Your cart is empty</Text>
        </View>
      ) : (
        <FlatList
          data={cartItems}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.grayBackground, padding: 10 },
  empty: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { fontSize: 16, color: Colors.grayMedium },

  card: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  image: { width: 70, height: 70, marginRight: 10, borderRadius: 5 },
  info: { flex: 1 },
  title: { fontSize: 14, fontWeight: '600', color: Colors.black },
  description: { fontSize: 12, color: Colors.grayMedium, marginVertical: 2 },
  
  qtyContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 5 },
  qtyButton: {
    backgroundColor: Colors.black,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 5,
  },
  qtyText: { color: Colors.white, fontWeight: 'bold', fontSize: 16 },
  qtyValue: { marginHorizontal: 8, fontSize: 14, fontWeight: '600' },

  price: { fontSize: 14, fontWeight: '600', color: Colors.black, marginLeft: 10 },
});

export default CartScreen;
