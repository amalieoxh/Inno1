import * as React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Button,
    Alert,
    ScrollView,
    SafeAreaView,
} from 'react-native';
import firebase from 'firebase/compat';
import {useEffect, useState} from "react";

const Add_edit_Item = ({navigation,route}) => {

    const initialState = {
        ItemType: '',
        Size: '',
        Describtion: '',
        Price: ''
    }

    const [newItem,setNewItem] = useState(initialState);

    /*Returnere true, hvis vi er på edit item*/
    const isEditItem = route.name === "Edit Item";

    useEffect(() => {
        if(isEditItem){
            const item = route.params.item[1];
            setNewItem(item)
        }
        /*Fjern data, når vi går væk fra screenen*/
        return () => {
            setNewItem(initialState)
        };
    }, []);

    const changeTextInput = (name,event) => {
        setNewItem({...newItem, [name]: event});
    }

    const handleSave = () => {

        const { ItemType, Size, Describtion, Price } = newItem;

        if(ItemType.length === 0 || Size.length === 0 || Describtion.length === 0 || Price.length === 0 ){
            return Alert.alert('Et af felterne er tomme!');
        }

        if(isEditItem){
            const id = route.params.item[0];
            try {
                firebase
                    .database()
                    .ref(`/Items/${id}`)
                    // Vi bruger update, så kun de felter vi angiver, bliver ændret
                    .update({ ItemType, Size, Describtion, Price });
                // Når brugeen er ændret, går vi tilbage.
                Alert.alert("Din info er nu opdateret");
                const item = [id,newItem]
                navigation.navigate("Item Details",{item});
            } catch (error) {
                console.log(`Error: ${error.message}`);
            }

        }else{

            try {
                firebase
                    .database()
                    .ref('/Items/')
                    .push({ ItemType, Size, Describtion, Price });
                Alert.alert(`Saved`);
                setNewItem(initialState)
            } catch (error) {
                console.log(`Error: ${error.message}`);
            }
        }

    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                {
                    Object.keys(initialState).map((key,index) =>{
                        return(
                            <View style={styles.row} key={index}>
                                <Text style={styles.label}>{key}</Text>
                                <TextInput
                                    value={newItem[key]}
                                    onChangeText={(event) => changeTextInput(key,event)}
                                    style={styles.input}
                                />
                            </View>
                        )
                    })
                }
                {/*Hvis vi er inde på edit item, vis save changes i stedet for add item*/}
                <Button title={ isEditItem ? "Save changes" : "Add Item"} onPress={() => handleSave()} />
            </ScrollView>
        </SafeAreaView>
    );
}

export default Add_edit_Item;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    row: {
        flexDirection: 'row',
        height: 30,
        margin: 10,
    },
    label: {
        fontWeight: 'bold',
        width: 100
    },
    input: {
        borderWidth: 1,
        padding:5,
        flex: 1
    },
});