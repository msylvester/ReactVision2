import React from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';

interface WeatherProps {
    route: {
        params: {
            weatherData: {
                coord: {
                    lon: number;
                    lat: number;
                };
                weather: {
                    id: number;
                    main: string;
                    description: string;
                    icon: string;
                }[];
                main: {
                    temp: number;
                    feels_like: number;
                    temp_min: number;
                    temp_max: number;
                    pressure: number;
                    humidity: number;
                };
                wind: {
                    speed: number;
                    deg: number;
                };
                name: string;
                sys: {
                    country: string;
                };
            };
        };
    };
}

const SetScreen: React.FC<WeatherProps> = ({ route }) => {
    const { weatherData } = route.params;

    // Handler for the button press
    const handleButtonPress = () => {
        Alert.alert('Button Pressed', 'You pressed the button!');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>{weatherData.name}, {weatherData.sys.country}</Text>
            <Text style={styles.temp}>Temperature: {weatherData.main.temp}°C</Text>
            <Text style={styles.feelsLike}>Feels Like: {weatherData.main.feels_like}°C</Text>
            <Text style={styles.weather}>Weather: {weatherData.weather[0].description}</Text>
            <Text style={styles.wind}>Wind Speed: {weatherData.wind.speed} m/s</Text>
            <Button title="Press Me" onPress={handleButtonPress} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 20,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    temp: {
        fontSize: 18,
        marginBottom: 5,
    },
    feelsLike: {
        fontSize: 18,
        marginBottom: 5,
    },
    weather: {
        fontSize: 18,
        marginBottom: 5,
    },
    wind: {
        fontSize: 18,
        marginBottom: 20,
    },
});

export default SetScreen;
