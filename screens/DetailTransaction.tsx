import React, {useEffect, useState} from 'react';
import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import HeaderBack from '../components/HeaderBack';
import {getTransactions} from '../storage/transactionStorage';
import {readTable} from '../utils/SQLiteDatabase';
import DetailTransactionItem from '../components/DetailTransactionItem';

const DetailTransactions = ({navigation, route}: any) => {
  const [listTransactionsItems, setDetailTransactionsItems] = useState<any[]>(
    [],
  );
  const {transaction_id, card_number} = route.params;
  useEffect(() => {
    getDetailTransactionsData();
  }, []);
  const getDetailTransactionsData = async () => {
    let data = await readTable(
      'transaction_items',
      `transaction_id='${transaction_id}'`,
    );
    console.log('getDetailTransactionsData', data);
    setDetailTransactionsItems(data);
  };
  const totalPrice = listTransactionsItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <HeaderBack
        title="Detail Transactions"
        onBack={() => navigation.goBack()}
      />
      <View style={{flex: 2, height: 'auto'}}>
        <FlatList
          data={listTransactionsItems}
          renderItem={({item}) => <DetailTransactionItem item={item} />}
          keyExtractor={item => item.id.toString()}
        />
      </View>
      <View style={styles.footer}>
        <Text style={styles.text}>
          Payment: {card_number.length > 0 ? 'Card' : 'Cash'}
        </Text>
        <Text>Total Price: {'' + totalPrice.toFixed(2)}</Text>
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
  text: {
    textAlign: 'right',
    color: 'black',
    fontWeight: '700',
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
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
  footer: {
    backgroundColor: '#febc8040',
    width: '100%',
    alignItems: 'flex-end',
    paddingRight: 8,
    paddingVertical: 12,
  },
});
export default DetailTransactions;
