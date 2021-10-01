import React, { useEffect, useState } from "react";
import { View, StyleSheet, Image, ActivityIndicator } from "react-native";
import Swiper from 'react-native-swiper'

export default function ImageList({ breed }) {
    const [listURL, setListURL] = useState({});
    const [isLoading, setLoading] = useState(true);
    const [nameBreed, setNameBreed] = useState(breed);

    const getByBreed = async () => {
        try {
            if(nameBreed !== null){
                setLoading(true);
                const response = await fetch(`https://dog.ceo/api/breed/${nameBreed}/images/random/5`);

                if (response.status != 200) {
                    console.log(`Erro: ${response.status}`);
                    return;
                }
                const json = await response.json();
                setListURL(json.message);
            }

        } catch (error) {
            console.log(error);

        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getByBreed();
        setNameBreed(breed);
    }, [breed])

    return (
        <View style={styles.container}>
            {listURL !== null &&
                <Swiper showsButtons loop={false}>
                    <View testID="0" style={styles.swiperViews}>
                        {isLoading && <ActivityIndicator size="large" color="blue" />}
                        {!isLoading &&
                            <Image source={{ uri: listURL[0] }} style={styles.img} />
                        }
                    </View>
                    <View testID="1" style={styles.swiperViews}>
                        {isLoading && <ActivityIndicator size="large" color="blue" />}
                        {!isLoading &&
                            <Image source={{ uri: listURL[1] }} style={styles.img} />
                        }
                    </View>
                    <View testID="2" style={styles.swiperViews}>
                        {isLoading && <ActivityIndicator size="large" color="blue" />}
                        {!isLoading &&
                            <Image source={{ uri: listURL[2] }} style={styles.img} />
                        }
                    </View>
                    <View testID="3" style={styles.swiperViews}>
                        {isLoading && <ActivityIndicator size="large" color="blue" />}
                        {!isLoading &&
                            <Image source={{ uri: listURL[3] }} style={styles.img} />
                        }
                    </View>
                    <View testID="4" style={styles.swiperViews}>
                        {isLoading && <ActivityIndicator size="large" color="blue" />}
                        {!isLoading &&
                            <Image source={{ uri: listURL[4] }} style={styles.img} />
                        }
                    </View>
                </Swiper>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        borderRadius: 10,
        borderWidth: 1,
        padding: 5,
        margin: 5
    },
    swiperViews: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 2
    },
    img: {
        width: 320,
        height: 320,
    }
});