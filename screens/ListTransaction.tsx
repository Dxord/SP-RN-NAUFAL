import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Button,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import HeaderBack from '../components/HeaderBack';
import {getTransactions} from '../storage/transactionStorage';
import TransactionItem from '../components/TransactionItem';
import NoData from '../components/NoData';

const ListTransactions = ({navigation}: any) => {
  const [listTransactionsItems, setListTransactionsItems] = useState<any[]>([]);

  useEffect(() => {
    getListTransactionsData();
  }, []);
  const getListTransactionsData = async () => {
    let data = await getTransactions();
    setListTransactionsItems(data);
  };
  const goToDetail = (item: any) => {
    navigation.navigate('DetailTransactions', {
      transaction_id: item.transaction_id,
      card_number: item.card_number,
    });
  };
  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <HeaderBack
        title="List Transactions"
        onBack={() => navigation.goBack()}
      />
      <FlatList
        data={listTransactionsItems}
        renderItem={({item}) => (
          <TransactionItem item={item} onClick={goToDetail} />
        )}
        ListEmptyComponent={<NoData>Data is empty</NoData>}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

export default ListTransactions;
