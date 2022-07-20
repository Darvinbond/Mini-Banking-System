import React, {Fragment} from 'react';
import {Text, View, StyleSheet } from '@react-pdf/renderer';


const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: "20px",
        borderTopColor: "#28b582",
        borderTop: "2px",
        paddingTop: "7px"
    },
    description: {
        width: '60%',
        fontWeight: "900",
        color: "#28b582"
    },
    xyz: {
        width: '40%',
    }
  });


const TableRow = ({items}) => {
    const rows = items.map( item => 
        <View style={styles.row} key={item}>
            <Text style={styles.description}>{item.desc}</Text>
            <Text style={styles.xyz}>{item.xyz}</Text>
        </View>
    )
    return (<Fragment>{rows}</Fragment> )
};
  
export default TableRow