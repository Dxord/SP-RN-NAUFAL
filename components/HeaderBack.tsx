import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';

type Props = {
  title?: string;
  onBack?: () => void;
  children?: any;
};

export default function HeaderBack(props: Props) {
  const {title, onBack, children} = props;

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <TouchableOpacity
          style={{
            height: 20,
            width: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          activeOpacity={0.8}
          onPress={() => {
            onBack != null && onBack();
          }}>
          <Image source={require('../assets/back.png')} style={styles.icon} />
        </TouchableOpacity>

        <View style={{flex: 1, marginLeft:20}}>
          {title != null && <Text style={styles.title}>{title}</Text>}
        </View>

        <View>{children}</View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 48,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#e0e0e0',
  },
  title: {color: '#000', fontSize: 16, fontWeight: '700'},
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  content: {
    marginTop: 20,
  },
  button: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  icon: {width: 24, height: 24},
  subtitle: {
    textAlign: 'center',
    fontSize: 12,
  },
});
