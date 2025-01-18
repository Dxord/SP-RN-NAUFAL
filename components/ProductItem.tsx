import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import {getCart, updateCart} from '../storage/cartStorage';
import {Product} from '../types/product';
import {useFocusEffect} from '@react-navigation/native';
import {deleteData} from '../utils/SQLiteDatabase';

const ProductItem = ({item, onClick}: any) => {
  const [isSelected, setIsSelected] = useState<Product[]>([]);
  const [cart, setCart] = useState<any[]>([]);

  useFocusEffect(
    useCallback(() => {
      getDataCart();
    }, [getDataCart]),
  );
  const getDataCart = useCallback(async () => {
    let cartData = await getCart();
    let isExist = cartData.filter(c => c.product_id == item.id);
    setIsSelected(isExist);
    setCart(cartData);
  }, []);

  const minQty = (item: any) => {
    if (isSelected[0].quantity == 1) {
      Alert.alert('Confirm', 'Delete ' + item.title + ' from cart ?', [
        {
          text: 'No',
          onPress: () => {
            // Do nothing
          },
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: async () => {
            await deleteData('cart', `id='${item.id}'`);
            getDataCart();
          },
        },
      ]);
    } else {
      cart.map((i, index) => {
        if (i.product_id == item.id) {
          cart[index].quantity = cart[index].quantity - 1;
        //   isSelected[0].quantity = isSelected[0].quantity - 1;
        //   setIsSelected(isSelected);
          setCart([...cart]);
          updateCart(i, true);
        }
      });
    }
  };

  const plusQty = (item: any) => {
    cart.map((i, index) => {
      console.log('exist', i.product_id, item.id);
      if (i.product_id == item.id) {
        cart[index].quantity = cart[index].quantity + 1;
        // isSelected[0].quantity =isSelected[0].quantity+ 1;
        // setIsSelected(isSelected);
        setCart([...cart]);
        updateCart(i);
      }
    });
  };
  return (
    <TouchableOpacity
      style={[
        styles.grid,
        {
          backgroundColor:
            isSelected[0] && isSelected[0].id != null ? '#febc8020' : 'white',
        },
      ]}
      onPress={() => {
        onClick(item);
        if (isSelected[0]) {
          isSelected[0].quantity += 1;
          setIsSelected(isSelected);
        } else {
          item.quantity = 1;
          isSelected[0] = item;
          setIsSelected(isSelected);
        }
      }}>
      {isSelected[0] && (
        <View style={styles.badge}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-end',
              marginBottom: 4,
            }}>
            <TouchableOpacity
              disabled={item.quantity == 0}
              style={styles.roundButton}
              onPress={() => minQty(item)}>
              <Text style={styles.calc}>-</Text>
            </TouchableOpacity>
            <Text style={styles.badgeText}>{isSelected[0].quantity}</Text>
            <TouchableOpacity
              style={styles.roundButton}
              onPress={() => plusQty(item)}>
              <Text style={styles.calc}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      <Image source={{uri: item.images[0]}} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <Text>
        {item.description.length > 20
          ? item.description.substring(0, 20) + '...'
          : item.description}
      </Text>
      <Text style={styles.price}>{item.price}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  grid: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 8,
    margin: 4,
    minWidth: '48%',
    maxWidth: '48%',
    alignItems: 'center',
  },
  image: {width: 120, height: 120},
  title: {fontWeight: 800, textAlign: 'center'},
  price: {fontWeight: 500, textAlign: 'center'},
  badge: {
    zIndex: 100,
    position: 'absolute',
    right: 8,
    top: 12,
    // backgroundColor: '#f00',
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '500',
    color: 'black',
    marginHorizontal: 8,
  },
  calc: {
    color: 'black',
    fontSize: 16,
  },
  roundButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#febc80',
  },
  calcQty: {
    color: 'black',
    fontSize: 12,
  },
});
export default ProductItem;
