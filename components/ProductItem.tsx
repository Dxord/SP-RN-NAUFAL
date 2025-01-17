import React, {useCallback, useEffect, useState} from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {getCart} from '../storage/cartStorage';
import {Product} from '../types/product';
import {useFocusEffect} from '@react-navigation/native';

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
          <Text style={styles.badgeText}>{isSelected[0].quantity}</Text>
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
    position: 'absolute',
    right: 8,
    top: 8,
    backgroundColor: '#feac80',
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '500',
    color: 'white',
  },
});
export default ProductItem;
