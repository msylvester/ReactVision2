/**
 * attribution: react-native-vision-camera/package/src/

 */

import React, { useCallback, useEffect, useState } from 'react';
import { ImageRequireSource, Linking } from 'react-native';
import { setUser } from './store';
import { StyleSheet, View, Text, Image } from 'react-native'
import { Camera, CameraPermissionStatus } from 'react-native-vision-camera'
import { CONTENT_SPACING, SAFE_AREA_PADDING } from './Constants';
import { useDispatch, useSelector } from 'react-redux';
import type { Routes } from './Routes';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const BANNER_IMAGE = require('./img/phone.png') as ImageRequireSource

const NO_PERMISSIONS_CAMERA = 'LeggoMyEggo needs '
const NO_PERMISSIONS_PHOTO_LIBRARY = 'LeggoMyEggo needs permision to add images to your library Permission'
const PERMISSIONS_CAMERA = 'LeggoMyEggo has Camera Permission'
const PERMISSIONS_PHOTO_LIBRARY = 'LeggoMyEggo has permission to add images to your library Permission'

// type Props = NativeStackScreenProps<Routes, 'PermissionsPage'>
function PermissionsPage({ navigation }: Props): React.ReactElement {
    const user = useSelector((state) => state.user.user);
    const dispatch = useDispatch();
    const [cameraPermissionStatus, setCameraPermissionStatus] = useState<CameraPermissionStatus>('not-determined')
    const [microphonePermissionStatus, setMicrophonePermissionStatus] = useState<CameraPermissionStatus>('not-determined')


    const requestMicrophonePermission = useCallback(async () => {
        console.log('Requesting microphone permission...')
        const permission = await Camera.requestMicrophonePermission()
        console.log(`Microphone permission status: ${permission}`)

        // if (permission === 'denied') await Linking.openSettings()
        // setMicrophonePermissionStatus(permission)
    }, [])

    const requestCameraPermission = useCallback(async () => {
        console.log('Requesting camera permission...')
        const permission = await Camera.requestCameraPermission()
        console.log(`Camera permission status: ${permission}`)
        if (permission !== 'denied') {
            dispatch(setUser({
                ...user, cameraPermissionStatus: true
            }));
            console.log(`Camera permission status: ${permission}`)
        }
        // if (permission === 'denied') await Linking.openSettings()
        // setCameraPermissionStatus(permission)
    }, [])

    useEffect(() => {
        if (cameraPermissionStatus === 'granted' && microphonePermissionStatus === 'granted') navigation.replace('CameraPage')
    }, [cameraPermissionStatus, microphonePermissionStatus, navigation])

    return (
        <View style={styles.container}>
            <Image source={BANNER_IMAGE} style={styles.banner} />
            <Text style={styles.welcome}>Welcome to{'\n'}LeggoMyEggo.</Text>
            <View style={styles.permissionsContainer}>
                {cameraPermissionStatus === 'granted' ? <Text style={styles.permissionText}>
                    {PERMISSIONS_CAMERA}<Text style={styles.bold}>Camera permission</Text>.{' '}
                    <Text>
                        {PERMISSIONS_CAMERA}
                    </Text>
                </Text> : (
                    <Text style={styles.permissionText}>
                        {NO_PERMISSIONS_CAMERA}<Text style={styles.bold}>Camera permission</Text>.{' '}
                        <Text style={styles.hyperlink} onPress={requestCameraPermission}>
                            Grant
                        </Text>
                    </Text>
                )}
                {microphonePermissionStatus !== 'granted' && (
                    <Text style={styles.permissionText}>
                        Vision Camera needs <Text style={styles.bold}>Microphone permission</Text>.{' '}
                        <Text style={styles.hyperlink} onPress={requestMicrophonePermission}>
                            Grant
                        </Text>
                    </Text>
                )}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    welcome: {
        fontSize: 38,
        fontWeight: 'bold',
        maxWidth: '80%',
    },
    banner: {
        position: 'absolute',
        opacity: 0.4,
        bottom: 0,
        left: 0,
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
        ...SAFE_AREA_PADDING,
    },
    permissionsContainer: {
        marginTop: CONTENT_SPACING * 2,
    },
    permissionText: {
        fontSize: 17,
    },
    hyperlink: {
        color: '#007aff',
        fontWeight: 'bold',
    },
    bold: {
        fontWeight: 'bold',
    },
})

export default PermissionsPage