import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProductList from './screens/ProductList';
import { initDB } from './utils/SQLiteDatabase';
import Cart from './screens/Cart';
import Payment from './screens/Payment';
import ListTransactions from './screens/ListTransaction';
import DetailTransactions from './screens/DetailTransaction';

export default function App() {
  const Stack = createNativeStackNavigator();

React.useEffect(()=>{
  initDB()
},[])

function RootStack() {
  return (
    <Stack.Navigator initialRouteName="ProductList" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ProductList" component={ProductList} />
      <Stack.Screen name="Cart" component={Cart} />
      <Stack.Screen name="Payment" component={Payment} />
      <Stack.Screen name="ListTransactions" component={ListTransactions} />
      <Stack.Screen name="DetailTransactions" component={DetailTransactions} />
    </Stack.Navigator>
  );
}

  return (
    <NavigationContainer>
      <RootStack/>
    </NavigationContainer>
  );
}