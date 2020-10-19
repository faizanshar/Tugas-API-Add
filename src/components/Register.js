import React, {Component} from 'react';
import {Image, Text, TextInput, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {styles} from './Styleregister';

export default class Register extends Component {
  render() {
    return (
      <LinearGradient
        style={styles.view1}
        colors={['#0efbeb', '#c0f1e8', '#d6c7ff']}>
        <View style={styles.view2}>
          <Text style={styles.register}>------- REGISTER -------</Text>

          <Text style={styles.name}>Name :</Text>
          <TextInput style={styles.textname} placeholder={' name'} />

          <Text style={styles.email}>Email :</Text>
          <TextInput style={styles.textemail} placeholder={' email'} />

          <Text style={styles.username}>Username :</Text>
          <TextInput style={styles.textusername} placeholder={' username'} />

          <Text style={styles.password}>Password :</Text>
          <TextInput style={styles.textpassword} placeholder={' password'} />

          <Text style={styles.password2}>Password Confirm :</Text>
          <TextInput style={styles.textpassword2} placeholder={' password'} />

          <TouchableOpacity
            style={styles.daftar}
            onPress={() =>this.props.navigation.navigate('Login')}>
            <Text style={styles.textdaftar}>Sign Up</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.view3}>
          <Text style={styles.signin}>Already have accounts?</Text>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
            <Text style={styles.textsignin}> Sign In</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    );
  }
}
