import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {getCart} from '../storage/cartStorage';

type Props = {
  data: any[];
};

export default function CartFloatButton(props: Props) {
  const navigation = useNavigation();
  const [totalPrice, setTotalPrice] = useState<string>('0');
  useEffect(() => {
    if (props.data != null && props.data.length > 0) {
      let price = 0;
      props.data.map((pr, i) => {
        console.log(i, pr.price);
        let pricePerItem = pr.price * pr.quantity;
        price += pricePerItem;
        setTotalPrice('' + price.toFixed(2));
      });
    }
  }, [props.data]);
  return (
    <TouchableOpacity style={styles.container} onPress={()=> navigation.navigate("Cart")}>
      {props.data != null && (
        <View style={styles.content}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              source={require('../assets/shopping-cart.png')}
              style={styles.icon}
            />
            <Text style={[{marginLeft: 8}, styles.item]}>
              {props.data.length} Item
            </Text>
          </View>
          <Text style={styles.price}>{totalPrice}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    width: '100%',
    height: 60,
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignItems: 'center',
    position: 'absolute',
    bottom: 60,
    left: 20,
    right: 20,
  },
  icon: {
    width: 24,
    height: 24,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
    width: '90%',
    height: 60,
    backgroundColor: '#febc80',
    borderRadius: 30,
  },
  price: {
    textAlign: 'center',
    color: 'black',
    fontSize: 20,
    fontWeight: '500',
  },
  item: {
    color: 'black',
    fontSize: 20,
  },
});
