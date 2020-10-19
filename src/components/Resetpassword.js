import React, { Component } from 'react'
import { Text, View } from 'react-native'
import {Styles} from './Stylereset'
import LinearGradient from 'react-native-linear-gradient';


export default class Resetpassword extends Component {
    render() {
        return (
            <LinearGradient style={Styles.view1} colors={['#0efbeb', '#c0f1e8', '#d6c7ff']} >
                <Text> Reset Password </Text>
            </LinearGradient>
        )
    }
}
