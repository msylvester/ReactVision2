import React from 'react';
import { AppleButton } from 'react-native-apple-authentication';

function AppleSignIn() {
    return (
        <AppleButton
            buttonStyle={AppleButton.Style.WHITE}
            buttonType={AppleButton.Type.SIGN_IN}
            style={{
                width: 160,
                height: 45,
            }}
            onPress={() => console.log('Apple sign-in complete!')}
        />
    );
}

export default AppleSignIn;