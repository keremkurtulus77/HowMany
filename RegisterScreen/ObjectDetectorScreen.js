import React, { useRef, useState } from 'react';
import { Text, TouchableOpacity, View, StyleSheet, ActivityIndicator } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as FileSystem from 'expo-file-system';

export default function ObjectDetectorScreen() {
    const [permission, requestPermission] = useCameraPermissions();
    const [isProcessing, setIsProcessing] = useState(false);
    const [objectCount, setObjectCount] = useState(null);
    const cameraRef = useRef(null);

    const callGoogleVisionAsync = async (base64) => {
        const body = JSON.stringify({
            requests: [
                {
                    image: { content: base64 },
                    features: [{ type: "OBJECT_LOCALIZATION", maxResults: 10 }]
                }
            ]
        });

        const response = await fetch(
            process.env.EXPO_PUBLIC_API_URL,
            {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                body: body,
            }
        );

        const result = await response.json();
        console.log("Google Vision API response:", result);

        // API yanıtının beklenen yapıda olup olmadığını kontrol edelim
        if (
            result.responses &&
            Array.isArray(result.responses) &&
            result.responses.length > 0 &&
            result.responses[0].localizedObjectAnnotations
        ) {
            return result.responses[0].localizedObjectAnnotations;
        } else {
            console.error("Unexpected API response structure:", result);
            return [];
        }
    };

    const handleTakePicture = async () => {
        if (!cameraRef.current) return;

        setIsProcessing(true);

        try {
            // Fotoğrafı dosya olarak çekiyoruz (base64: false)
            const photo = await cameraRef.current.takePictureAsync({ base64: false, quality: 0.5 });
            console.log("Photo taken:", photo);

            // photo.uri var mı kontrol edelim.
            if (!photo || !photo.uri) {
                console.error("Fotoğraf çekilemedi veya uri alınamadı.");
                return;
            }

            // Fotoğrafı base64'e dönüştürüyoruz.
            const base64 = await FileSystem.readAsStringAsync(photo.uri, { encoding: FileSystem.EncodingType.Base64 });
            console.log("Base64 string (ilk 30 karakter):", base64.substring(0, 30) + "...");

            // Google Vision servisine gönderiyoruz.
            const objects = await callGoogleVisionAsync(base64);
            setObjectCount(objects.length);
        } catch (error) {
            console.error("Error processing image:", error);
        } finally {
            setIsProcessing(false);
        }
    };

    if (!permission) return <View />;
    if (!permission.granted) {
        return (
            <View style={styles.container}>
                <Text style={{ color: '#fff', marginBottom: 10 }}>Kamera izni gerekiyor.</Text>
                <TouchableOpacity style={styles.button} onPress={requestPermission}>
                    <Text style={styles.buttonText}>İzin Ver</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <CameraView
                style={styles.camera}
                ref={cameraRef}
                facing="back"
            />
            <TouchableOpacity style={styles.button} onPress={handleTakePicture} disabled={isProcessing}>
                <Text style={styles.buttonText}>Fotoğraf Çek ve Say</Text>
            </TouchableOpacity>
            {isProcessing && <ActivityIndicator size="large" color="#fff" />}
            {objectCount !== null && (
                <Text style={styles.resultText}>Tespit edilen nesne sayısı: {objectCount}</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    camera: {
        flex: 1,
        width: '100%',
    },
    button: {
        position: 'absolute',
        bottom: 30,
        alignSelf: 'center',
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        zIndex: 2,
    },
    buttonText: { fontSize: 16, color: '#000' },
    resultText: {
        position: 'absolute',
        top: 50,
        alignSelf: 'center',
        color: '#fff',
        fontSize: 18,
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: 10,
        borderRadius: 10,
    },
});