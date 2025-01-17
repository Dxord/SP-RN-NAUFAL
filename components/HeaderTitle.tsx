import {useNavigation} from '@react-navigation/native';
import React, {useCallback} from 'react';
import {Image, StatusBar, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

type Props = {
  title: string;
};

export default function HeaderTitle(props: Props) {
  const navigation = useNavigation();

  const goToListTransaction =()=>{
    navigation.navigate("ListTransactions")
  }
  return (
    <>
      <View style={styles.container}>
        {props.title != null && (
          <View style={styles.content}>
            <Text 
            style={styles.titleHeader}>
              {props.title}
            </Text>
          </View>
        )}
        <TouchableOpacity onPress={goToListTransaction}>
            <Image source={require("../assets/file.png")} style={styles.icon}/>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor:"#fff",
    width: '100%',
    height: 60,
    flexDirection: 'row',
    justifyContent:"space-between",
    paddingHorizontal: 12,
    paddingVertical: 8,
    alignItems: 'center',
  },
  content:{

  },
  icon:{
    width:24, height:24
  },
  titleHeader:{textAlign:'center', color:"black", fontSize:20, fontWeight:"400"}
});
