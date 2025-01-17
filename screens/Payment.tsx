import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from 'react-native';
import HeaderBack from '../components/HeaderBack';
import InputModal from '../components/InputModal';
import {insertData, insertTransaction} from '../utils/SQLiteDatabase';
import {resetCart} from '../storage/cartStorage';
const Payment = ({route}: any) => {
  const navigation = useNavigation();
  const {totalPrice, cartItems} = route.params;
  const [cardNumber, setCardNumber] = useState<string>('');
  const [showInput, setShowInput] = useState<boolean>(false);
  useEffect(() => {}, []);
  const makeid = (length: number) => {
    let result = '';
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  };

  const payTransaction = () => {
    let transactionId = makeid(3);
    console.log(cartItems);
    let carts = cartItems;
    carts.map(async (item: any) => {
      let data = {
        product_id: item.id,
        title: item.title,
        price: item.price,
        quantity: item.quantity,
        transaction_id: transactionId,
        image: item.image,
      };
      await insertData('transaction_items', data);
    });
    insertTransaction(transactionId, totalPrice, cardNumber);
    resetCart();
    setShowInput(false);
    navigation.navigate('ProductList');
    ToastAndroid.show('Payment successfully !', ToastAndroid.SHORT);
  };
  const inputCardNumber = () => {
    setShowInput(true);
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <HeaderBack title="Payment" onBack={() => navigation.goBack()} />
      <View style={styles.content}>
        <Text style={styles.calc}>
          Total Price: {'' + totalPrice.toFixed(2)}
        </Text>
        <Button
          title="Cash Payment"
          color={'#febc80'}
          onPress={payTransaction}
        />
        <Button title="Card Payment" onPress={inputCardNumber} />
      </View>
      <InputModal
        modalVisible={showInput}
        onClose={() => setShowInput(false)}
        onSave={payTransaction}
        setValue={(value: string) => setCardNumber(value)}
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  content: {
    gap: 12,
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  calc: {
    color: 'black',
    fontSize: 16,
    fontWeight: '700',
  },
});
export default Payment;
