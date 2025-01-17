import React, {useEffect, useState} from 'react';
import {
  Alert,
  Button,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import HeaderBack from '../components/HeaderBack';
import {getCart, updateCart} from '../storage/cartStorage';
import {deleteData} from '../utils/SQLiteDatabase';

const Cart = ({navigation}: any) => {
  const [cartItems, setCartItems] = useState<any[]>([]);

  useEffect(() => {
    getCartData();
  }, []);
  const getCartData = async () => {
    let data = await getCart();
    console.log('getCartData', data);
    setCartItems(data);
  };
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
  const minQty = (item: any) => {
    if (item.quantity == 1) {
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
            getCartData();
          },
        },
      ]);
    } else {
      cartItems.map((i, index) => {
        if (i.id == item.id) {
          cartItems[index].quantity = cartItems[index].quantity - 1;
          setCartItems([...cartItems]);
          updateCart(i, true);
        }
      });
    }
  };

  const plusQty = (item: any) => {
    cartItems.map((i, index) => {
      if (i.id == item.id) {
        cartItems[index].quantity = cartItems[index].quantity + 1;
        setCartItems([...cartItems]);
        updateCart(i);
      }
    });
  };
  const renderCartItem = (item: any) => {
    return (
      <View style={styles.content}>
        <Image source={{uri: item.image}} style={styles.image} />

        <View style={{marginLeft: 8}}>
          <Text style={styles.item}>{item.title}</Text>
          <Text style={styles.qty}>Price: {item.price}</Text>
          <Text style={styles.qty}>Qty: {item.quantity}</Text>
        </View>

        <View style={{flex: 1, alignItems: 'flex-end'}}>
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
            <Text style={[styles.calcQty, {marginHorizontal: 8}]}>
              {item.quantity}
            </Text>
            <TouchableOpacity
              style={styles.roundButton}
              onPress={() => plusQty(item)}>
              <Text style={styles.calc}>+</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.price}>
            {'' + (item.price * item.quantity).toFixed(2)}
          </Text>
        </View>
      </View>
    );
  };
  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <HeaderBack title="Cart" onBack={() => navigation.goBack()} />
      <FlatList
        data={cartItems}
        renderItem={({item}) => {
          return renderCartItem(item);
        }}
        keyExtractor={item => item.id.toString()}
      />
      <View style={{alignSelf: 'flex-end', marginRight: 8}}>
        <Text>Total Price: {'' + totalPrice.toFixed(2)}</Text>
      </View>
      <View style={{paddingHorizontal: 16, paddingVertical: 12}}>
        <Button
          title="Payment"
          color={'#febc80'}
          onPress={() =>
            navigation.navigate('Payment', {totalPrice, cartItems})
          }
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  roundButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#febc80',
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomColor:"#f0f0f0",
    borderBottomWidth:1
  },
  price: {
    textAlign: 'center',
    color: 'black',
    fontSize: 12,
    fontWeight: '500',
  },
  qty: {
    color: 'black',
    fontSize: 10,
  },
  calc: {
    color: 'black',
    fontSize: 16,
  },

  calcQty: {
    color: 'black',
    fontSize: 12,
  },
  item: {
    color: 'black',
    fontSize: 12,
    fontWeight: '600',
  },
  image: {
    width: 40,
    height: 40,
  },
});
export default Cart;
