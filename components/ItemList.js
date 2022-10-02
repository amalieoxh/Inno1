import * as React from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet, Image} from 'react-native';
import firebase from 'firebase/compat';
import {useEffect, useState} from "react";

const ItemList = ({navigation}) => {

    const [items,setItems] = useState()

    useEffect(() => {
        if(!items) {
            firebase
                .database()
                .ref('/Items')
                .on('value', snapshot => {
                    setItems(snapshot.val())
                });
        }
    },[]);

    // Vi viser ingenting hvis der ikke er data
    if (!items) {
        return <Text>Loading...</Text>;
    }

    const handleSelectItem = id => {
        /*Her søger vi direkte i vores array af brugere og finder bruger objektet som matcher idet vi har tilsendt*/
        const item = Object.entries(items).find( item => item[0] === id /*id*/)
        navigation.navigate('Item Details', { item });
    };

    // Flatlist forventer et array. Derfor tager vi alle values fra vores items objekt, og bruger som array til listen
    const itemArray = Object.values(items);
    const itemKeys = Object.keys(items);

    return (
        <FlatList
            data={itemArray}
            // Vi bruger itemKeys til at finde ID på den aktuelle bruger og returnerer dette som key, og giver det med som ID til ItemListItem
            keyExtractor={(item, index) => itemKeys[index]}
            renderItem={({ item, index }) => {
                console.log(item)
                return(
                    <TouchableOpacity style={styles.container} onPress={() => handleSelectItem(ItemKeys[index])}>
                        <Text>
                            Tøj: {item.ItemType} 
                            {'\n'}
                            Str. {item.Size}
                            {'\n'}
                            Describtion: {item.Describtion}
                            {'\n'}
                            Price: {item.Price}
                        </Text>
                    </TouchableOpacity>
                ) 
            }}
        />
    );
}

export default ItemList;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderWidth: 1,
        borderRadius:10,
        margin: 5,
        padding: 5,
        height: 100,
        justifyContent:'center'
    },
    label: { fontWeight: 'bold' },
});