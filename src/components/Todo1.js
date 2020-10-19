import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  Image,
  Alert,
  Modal,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
// 1. install dan import libbray
import ImagePicker from 'react-native-image-picker';
import {ScrollView} from 'react-native-gesture-handler';
import { Styles } from './Styletodo1';

// 2. buat variabel option
const options = {
  title: 'Select Avatar editan',
  storageOptions: {
    skipBackup: false,
    path: 'images',
  },
};

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      dataListTodo: [],
      modal: false,
      modalEdit: false,
      // add todo
      avatarSource: {
        uri:
          'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.ouOFcEHOYh7Dj3JCmDUfhwAAAA%26pid%3DApi&f=1',
      },
      fileName: '',
      fileSize: '',
      type: '',
      uri: '',
      task: '',
      desc: '',
      is_done: 0,
      // untuk edit
      image: '',
      id: '',
      token: '',
      loading: true,
    };
  }

  getListTodo = () => {
    const {token} = this.state;
    console.log(token + 'token getlisttodo function');
    fetch('http://restful-api-laravel-7.herokuapp.com/api/todo/', {
      method: 'GET', //Request Type
      headers: {
        //Header Defination
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((res) => {
        const {status} = res;
        console.log(status);
        if (status) {
          this.setState({
            dataListTodo: [],
          });
        } else {
          this.setState({
            dataListTodo: res,
            loading: false,
          });
        }
      })
      .catch((err) => console.log(err));
  };

  componentDidMount() {
    AsyncStorage.getItem('token').then((value) => {
      console.log(value);
      if (value !== null) {
        this.setState({token: value});
      }
    });
    setTimeout(() => {
      this.getListTodo();
    }, 3000);
  }

  hapusTodo = (id) => {
    const {token} = this.state;
    fetch(`http://restful-api-laravel-7.herokuapp.com/api/todo/${id.id}`, {
      method: 'DELETE', //Request Type
      headers: {
        //Header Defination
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((res) => {
        alert(res);
        this.getListTodo();
      })
      .catch((err) => console.log(err));
  };

  modalAdd = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  modalEdit = (dataEdit) => {
    const avatarSource = {
      uri: `${dataEdit.image}`,
    };

    this.setState({
      task: dataEdit.task,
      desc: dataEdit.desc,
      image: dataEdit.image,
      is_done: dataEdit.is_done == false ? 0 : 1,
      id: dataEdit.id,
      avatarSource: avatarSource,
    });

    this.setState({
      modalEdit: !this.state.modalEdit,
    });
  };
  modalEditCancel = () => {
      this.setState({
      modalEdit: !this.state.modalEdit,
    });
  };

  selectImage = () => {
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = {uri: response.uri};
        const fileName = response.fileName;
        const type = response.type;
        const uri = response.uri;
        const fileSize = response.fileSize;

        this.setState({
          avatarSource: source,
          fileName: fileName,
          type: type,
          uri: uri,
          fileSize: fileSize,
        });
      }
    });
  };

  sendTodo = () => {
    const {task, desc, is_done, token} = this.state;
    let image = {
      uri: this.state.uri,
      type: this.state.type,
      name: this.state.fileName,
    };

    const formData = new FormData();

    formData.append('task', task);
    formData.append('desc', desc);
    formData.append('image', image);
    formData.append('is_done', is_done);

    // console.log(formData);
    if (this.state.fileSize >= 1500000) {
      ToastAndroid.show(
        'Foto terlalu besar, maksimal 1,5 MB',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
    } else {
      fetch('http://restful-api-laravel-7.herokuapp.com/api/todo', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      })
        .then((response) => response.json())
        .then((resjson) => {
          const {status} = resjson;
          if (status) {
            alert(status);
            this.props.navigation.goBack();
          }
        })
        .catch((error) => {
          console.log(error);
          ToastAndroid.show(
            'Pastikan Form Terisi Semuanya!',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
        });
    }
  };

  EditTodo = () => {
    const {task, desc, is_done, token, id} = this.state;
    console.log(task, desc, is_done, token, id);
    let image = {
      uri: this.state.uri,
      type: this.state.type,
      name: this.state.fileName,
    };

    const formData = new FormData();

    formData.append('task', task);
    formData.append('desc', desc);
    formData.append('image', image);
    formData.append('is_done', is_done);
    formData.append('_method', 'PUT');

    // console.log(formData);
    if (this.state.fileSize >= 1500000) {
      ToastAndroid.show(
        'Foto terlalu besar, maksimal 1.5 MB',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
    } else {
      fetch(`http://restful-api-laravel-7.herokuapp.com/api/todo/${id}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      })
        .then((response) => response.json())
        .then((resjson) => {
          console.log(resjson);
          const {status} = resjson;
          if (status) {
            alert(status);
            this.props.navigation.goBack();
          }
        })
        .catch((error) => {
          console.log(error);
          ToastAndroid.show(
            'Pastikan Form Terisi Semua!',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
        });
    }
  };

  render() {
    console.log(this.state.dataListTodo);

    if (this.state.loading) {
      return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator size="large" color="#4654" />
          <Text>Loading....</Text>
        </View>
      );
    } else {
      return (
        <ScrollView>
          <View>
            {this.state.dataListTodo.map((value, index) => {
              return (
                <View style={Styles.view1}>
                <View style={Styles.view2}>
                  <Text>Ini Todo</Text>
                </View>
                <TouchableOpacity
                  onPress={() =>
                    this.modalEdit({
                      id: value.id,
                      task: value.task,
                      desc: value.desc,
                      image: value.image,
                      is_done: value.is_done,
                    })
                  }
                  key={index}
                  style={Styles.touch1}>
                  <Text>{value.task}</Text>
                  <Text>{value.desc}</Text>
                  <Image
                    source={{
                      uri: `http://restful-api-laravel-7.herokuapp.com/img/${value.image}`,
                    }}
                    style={Styles.image1}
                  />
                  <Text>{value.is_done}</Text>
                </TouchableOpacity>
                </View>
              );
            })}

            <TouchableOpacity
              onPress={() => this.modalAdd()}
              style={Styles.touch2}>
              <Text>Add</Text>
            </TouchableOpacity>
            <Modal animationType="slide" visible={this.state.modalEdit}>
              <View>
                <View style={{alignItems: 'flex-end'}}>
                  <TouchableOpacity
                    onPress={() => this.modalEditCancel()}
                    style={Styles.touch3}>
                    <Text>Cancel</Text>
                  </TouchableOpacity>
                </View>
                <View style={Styles.view3}>
                  <Text style={{textAlign: 'center'}}>Edit Todo</Text>
                  <View
                    style={{alignItems: 'center', marginTop: 20, height: 120}}>
                    {this.state.uri.length == 0 ? (
                      <TouchableOpacity
                        onPress={() => this.selectImage()}
                        style={Styles.touch4}>
                        <Image
                          source={{
                            uri: `http://restful-api-laravel-7.herokuapp.com/img/${this.state.image}`,
                          }}
                          style={Styles.image2}
                        />
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        onPress={() => this.selectImage()}
                        style={Styles.touch5}>
                        <Image
                          source={this.state.avatarSource}
                          style={Styles.image3}
                        />
                      </TouchableOpacity>
                    )}
                  </View>
                  <View style={{alignItems: 'center'}}>
                    <TextInput
                      value={this.state.task}
                      placeholder="Task"
                      style={Styles.input1}
                      onChangeText={(task) => this.setState({task})}
                    />
                    <TextInput
                      value={this.state.desc}
                      placeholder="Desc"
                      style={Styles.input2}
                      onChangeText={(desc) => this.setState({desc})}
                    />
                    <TouchableOpacity
                      onPress={() =>
                        this.setState({is_done: !this.state.is_done})
                      }>
                      <Text>
                        {this.state.is_done == false
                          ? 'Belum Selesai'
                          : 'Selesai'}
                      </Text>
                    </TouchableOpacity>
                    <View style={Styles.touch6}>
                      <Button title="Simpan" onPress={() => this.EditTodo()} />
                    </View>
                  </View>
                </View>
              </View>
            </Modal>

            <Modal animationType="slide" visible={this.state.modal}>
              <View>
                <View style={{alignItems: 'flex-end'}}>
                  <TouchableOpacity
                    onPress={() => this.modalAdd()}
                    style={{margin: 20}}>
                    <Text>Cancel</Text>
                  </TouchableOpacity>
                </View>
                <View style={{margin: 20, marginTop: 25}}>
                  <Text style={{textAlign: 'center'}}>Add Todo</Text>
                  <View
                    style={{alignItems: 'center', marginTop: 20, height: 120}}>
                    {this.state.uri.length == 0 ? (
                      <TouchableOpacity
                        onPress={() => this.selectImage()}
                        style={{
                          height: 120,
                          width: 120,
                          backgroundColor: '#4555',
                          justifyContent: 'center',
                        }}>
                        <Image
                          source={this.state.avatarSource}
                          style={{height: 120, width: 120}}
                        />
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        onPress={() => this.selectImage()}
                        style={{
                          height: 120,
                          width: 120,
                          backgroundColor: '#4555',
                          justifyContent: 'center',
                        }}>
                        <Image
                          source={this.state.avatarSource}
                          style={{height: 120, width: 120}}
                        />
                      </TouchableOpacity>
                    )}
                  </View>
                  <View style={{alignItems: 'center'}}>
                    <TextInput
                      placeholder="Task"
                      style={{
                        width: '80%',
                        backgroundColor: '#456',
                        marginTop: 10,
                        borderRadius: 10,
                      }}
                      onChangeText={(task) => this.setState({task})}
                    />
                    <TextInput
                      placeholder="Desc"
                      style={{
                        width: '80%',
                        backgroundColor: '#456',
                        marginTop: 10,
                        borderRadius: 10,
                      }}
                      onChangeText={(desc) => this.setState({desc})}
                    />
                    <View style={{margin: 20}}>
                      <Button title="Simpan" onPress={() => this.sendTodo()} />
                    </View>
                  </View>
                </View>
              </View>
            </Modal>
          </View>
        </ScrollView>
      );
    }
  }
}

