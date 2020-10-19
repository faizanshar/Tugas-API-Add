import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  view1: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  view2: {
    backgroundColor: '#ffff',
    height: 600,
    width: 300,
    borderRadius: 5,
    borderWidth: 4,
  },
  view3: {
    alignItems: 'center',
  },
  view4: {
    flexDirection: 'row'
  },
  image1: {
    height: 250,
    width: 250,
    marginLeft: 25,
  },
  username: {
    fontWeight: 'bold',
    fontSize: 25,
    marginRight: 100,
    
    
  },
  textusername: {
      backgroundColor: 'white',
      borderRadius: 10,
      height:50,
      width:200,
      borderWidth: 2,
      
    },
    password: {
        fontWeight: 'bold',
        fontSize: 25,
        marginRight: 100,
        paddingTop: 10  
    },
    textpassword: {
    backgroundColor: 'white',
      borderRadius: 10,
      height:50,
      width:200,
      borderWidth: 2
    },
    buttonlogin: {
        backgroundColor:'black',
        width:200,
        height:40,
        borderRadius: 10,
        marginTop: 40,
        alignItems:'center',
        justifyContent:'center'
    },
    login: {
        color: 'white',
        fontSize: 20

    },
    forgotpassword: {
        fontSize:15,
        fontWeight:'800',
        marginTop: 20,
        
    },
    notregister: {
        paddingTop: 5,
        fontWeight: '900'
    },
    signup: {
        paddingTop: 5,
        fontWeight:'bold',
        fontSize: 15
    }
          
      
  
});
