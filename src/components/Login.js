import React, {Component} from 'react';
import {Image, Text, TextInput, TouchableOpacity, View,Button} from 'react-native';
import {styles} from './Stylelogin';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-community/async-storage';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bebas: true,
      email: '',
      password: '',
    };
   AsyncStorage.getItem('token').then((value) => {
      if (value !== null) {
        this.props.navigation.navigate('Home');
      } else {
        this.props.navigation.navigate('Login');
      }
    })
    .catch((err) => console.log(err));
  }
  Login = () => {
    const {email, password} = this.state;
    var dataToSend = {email: email, password: password, mobile: true};
    //making data to send on server
    var formBody = [];
    for (var key in dataToSend) {
      var encodedKey = encodeURIComponent(key);
      var encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');
    //POST request
    fetch('http://restful-api-laravel-7.herokuapp.com/api/login', {
      method: 'POST', //Request Type
      body: formBody, //post body
      headers: {
        //Header Defination
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
    })
      .then((response) => response.json())
      //If response is in json then in success
      .then((responseJson) => {
        console.log(responseJson);
        const {token, error} = responseJson;
        if (token) {
          AsyncStorage.setItem('token',token)
          this.props.navigation.navigate('Home');
        } else {
          alert('Pastikan Email dan Password BENAR!');
        }
      })
      //If response is not in json then in error
      .catch((error) => {
        alert('Pastikan Email dan Password BENAR!');
      });
  };
  render() {
    return (
      <LinearGradient
        style={styles.view1}
        colors={['#0efbeb', '#c0f1e8', '#d6c7ff']}>
        <View style={styles.view2}>
          <View>
            <Image
              style={styles.image1}
              source={require('../assets/progad.png')}
            />
          </View>
          <View style={styles.view3}>
            <Text style={styles.username}>Username :</Text>
            <TextInput style={styles.textusername} placeholder={'   username'} keyboardType="email-address"
                onChangeText={(email) => this.setState({email})}/>
            
            <Text style={styles.password}>Password :</Text>
            <TextInput style={styles.textpassword} placeholder={' password'} secureTextEntry={this.state.bebas}
                onChangeText={(password) => this.setState({password})}/>

            <Button color={'red'} title={'ShowPassword'} onPress={()=>this.setState({bebas:!this.state.bebas})} />

            <TouchableOpacity style={styles.buttonlogin} onPress={() => this.Login()}>
              <Text style={styles.login}>login</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonpassword} onPress={()=>this.props.navigation.navigate('Reset')}>
              <Text style={styles.forgotpassword}>Forgot your password?</Text>
            </TouchableOpacity> 
          
          </View>
          
        </View>
          <View style={styles.view4}>
            <Text style={styles.notregister}>Not Registered?</Text>
            <TouchableOpacity onPress={()=>this.props.navigation.navigate('Register')}>
              <Text style={styles.signup}> Sign Up</Text>
            </TouchableOpacity>
          </View>
      </LinearGradient>
    );
  }
}
