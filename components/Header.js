import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import ImageList from './ImageList';

const uriListAll = "https://dog.ceo/api/breeds/list/all";

export default function Header(){
    const [selectedValue, setSelectedValue] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [list, setList] = useState([]);

    const getAllBreeds = async () => {
        try {
            if(isLoading){
                const response = await fetch(uriListAll);

                if (response.status != 200) {
                    console.log(`Erro: ${response.status}`);
                    return;
                }

                const json = await response.json();
                setList(json);
            }
        } catch (error) {
            console.log(error)
        }finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        getAllBreeds();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>DOG API</Text>
            <View style={styles.select}>
                <Picker
                    selectedValue={selectedValue}
                    onValueChange={(itemValue) => setSelectedValue(itemValue)}>
                    <Picker.Item label="Selecione uma raça..." value={null} />
                    {!isLoading &&
                        Object.keys(list.message).map((item) => { 
                            return <Picker.Item label={item} value={item} /> 
                        })
                    }
                </Picker>
            </View>

            <View style={{ flex: 1, margin: 5 }}>
                {selectedValue !== null &&
                    <ImageList breed={selectedValue} />
                }
            </View>
            <StatusBar style="default" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    title: {
        padding: 12,
        fontSize: 20,
        color: 'white',
        backgroundColor: '#1E90FF',
        textAlign: 'center',
        fontWeight: 'bold'
    },
    select: {
        borderBottomColor: 'black',
        borderRadius: 10,
        borderWidth: 1,
        padding: 5,
        margin: 5,
    }
});
