import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';

const DetailTransactionItem = ({item}: any) => {
  return (
    <View style={styles.content}>
      <Image source={{uri: item.image}} style={styles.image} />

      <View style={{marginLeft: 8}}>
        <Text style={styles.item}>{item.title}</Text>
        <Text style={styles.qty}>Price: {item.price}</Text>
        <Text style={styles.qty}>Qty: {item.quantity}</Text>
      </View>

      <View style={{flex: 1, alignItems: 'flex-end'}}>
        <Text style={styles.price}>{""+(item.price * item.quantity).toFixed(2)}</Text>
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
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
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
export default DetailTransactionItem;
