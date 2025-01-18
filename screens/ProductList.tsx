import {useFocusEffect, useNavigation} from '@react-navigation/native';
import axios from 'axios';
import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, SafeAreaView, View} from 'react-native';
import CartFloatButton from '../components/CartFloatButton';
import HeaderTitle from '../components/HeaderTitle';
import ProductItem from '../components/ProductItem';
import {addToCart, getCart, resetCart} from '../storage/cartStorage';
import {Product} from '../types/product';
const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [carts, setCarts] = useState<Product[]>([]);
  const navigation = useNavigation();

  useEffect(() => {
    fetchProducts();
    // resetCart();
  }, []);
  useFocusEffect(
    useCallback(() => {
      fetchProducts();
    }, [fetchProducts])
  );
  const getCartData = async () => {
    let data = await getCart();
    setCarts(data);
  };
  const fetchProducts = useCallback(async () => {
    getCartData();
    setLoading(true);
    const response = await axios.get('https://dummyjson.com/products?limit=20');
    setLoading(false);
    console.log(response.data.products[0]);
    setProducts(response.data.products);
  }, []);

  const handleProductClick = async (product: Product) => {
    addToCart(product);
    let cart = await getCart();
    setCarts([...cart]);
  };

  return (
    <SafeAreaView>
      <HeaderTitle title="Product List" />
      <View
        style={{
          backgroundColor: '#f4f4f4',
          marginHorizontal: 8,
          paddingBottom: 120,
        }}>
        <FlatList
          data={products}
          refreshing={loading}
          onRefresh={fetchProducts}
          renderItem={({item}) => {
            return <ProductItem item={item} onClick={handleProductClick} />;
          }}
          keyExtractor={item => item.id.toString()}
          numColumns={2}
        />
      </View>
      {carts.length > 0 && <CartFloatButton data={carts} />}
    </SafeAreaView>
  );
};

export default ProductList;
