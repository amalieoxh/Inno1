import * as React from 'react';
import { View, Text, Platform, FlatList, StyleSheet, Button, Alert } from 'react-native';
import firebase from 'firebase/compat';
import {useEffect, useState} from "react";

const ItemDetails = ({route,navigation}) => {
    const [item,setItem] = useState({});

    useEffect(() => {
        /*Henter item values og sætter dem*/
        setItem(route.params.item[1]);

        /*Når vi forlader screen, tøm object*/
        return () => {
            setItem({})
        }
    });

    const handleEdit = () => {
        // Vi navigerer videre til EditItem skærmen og sender brugeren videre med
        const item = route.params.item
        navigation.navigate('Edit Item', { item });
    };

    // Vi spørger brugeren om han er sikker
    const confirmDelete = () => {
        /*Er det mobile?*/
        if(Platform.OS ==='ios' || Platform.OS ==='android'){
            Alert.alert('Are you sure?', 'Do you want to delete the item?', [
                { text: 'Cancel', style: 'cancel' },
                // Vi bruger this.handleDelete som eventHandler til onPress
                { text: 'Delete', style: 'destructive', onPress: () => handleDelete() },
            ]);
        }
    };

    // Vi sletter den aktuelle bruger
    const  handleDelete = () => {
        const id = route.params.item[0];
        try {
            firebase
                .database()
                // Vi sætter brugerens ID ind i stien
                .ref(`/Items/${id}`)
                // Og fjerner data fra den sti
                .remove();
            // Og går tilbage når det er udført
            navigation.goBack();
        } catch (error) {
            Alert.alert(error.message);
        }
    };


    if (!item) {
        return <Text>No data</Text>;
    }

    //all content
    return (
        <View style={styles.container}>
            <Button title="Edit" onPress={ () => handleEdit()} />
            <Button title="Delete" onPress={() => confirmDelete()} />
            {
                Object.entries(item).map((item,index)=>{
                    return(
                        <View style={styles.row} key={index}>
                            {/*Vores item keys navn*/}
                            <Text style={styles.label}>{item[0]} </Text>
                            {/*Vores item values navne */}
                            <Text style={styles.value}>{item[1]}</Text>
                        </View>
                    )
                })
            }
        </View>
    );
}

export default ItemDetails;

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'flex-start' },
    row: {
        margin: 5,
        padding: 5,
        flexDirection: 'row',
    },
    label: { width: 100, fontWeight: 'bold' },
    value: { flex: 1 },
});