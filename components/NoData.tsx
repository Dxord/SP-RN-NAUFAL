import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function NoData(props: any) {
    return (
        <View style={styles.wrapper}>
            <Text style={styles.text}>{props.children}</Text>
        </View>
    );
}
const styles = StyleSheet.create({
    wrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        flex: 1,
        minHeight: 200,
    },
    text: {
        fontSize: 14,
        color: '#000',
    },
});
