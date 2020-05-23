/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format定义路由
 * @flow
 */

// import React, { Component } from 'react';
// import {StackNavigator} from 'react-navigation';

// import Main from './bigProject/page/main/Main';                                 //首页
// import Hend from "./bigProject/component/hend"

// const App = StackNavigator({
//         Home: {screen: Main},
     
//     }
//     ,{
//         initialRouteName: 'Home', // 默认显示界面
//         headerMode: 'none',
       
//     }
// );
// export default App;

// AppRegistry.registerComponent('gewdDemo01', () => gewdDemo01);

import React, { Component } from 'react';
import {createStackNavigator} from 'react-navigation';

import { View, Text, StyleSheet, Dimensions ,Image ,TextInput,TouchableOpacity, BackHandler,PermissionsAndroid ,Toast,StatusBar,AsyncStorage} from 'react-native';

import Main from './bigProject/page/main/Main';                                 //首页
import Hend from "./bigProject/component/hend"
const MyStack = createStackNavigator({
    Home: {screen: Main},
    Hend:{screen: Hend}
},
     {
        initialRouteName: 'Home',
        headerMode:"none"
      }
 );

class App extends React.Component {
  static router = {
    ...MyStack.router,
    getStateForAction: (action, lastState) => {
      // check for custom actions and return a different navigation state.
      return MyStack.router.getStateForAction(action, lastState);
    }
  };
  componentDidUpdate(lastProps) {
    // Navigation state has changed from lastProps.navigation.state to this.props.navigation.state
  }
  rour(){
      console.log("123123")
      this.props.navigation.navigate('Hend')
  }
  render() {
    const { navigation } = this.props;

    return (
        <>
      <View>
        <Text>我是头部</Text>
        <TouchableOpacity onPress={()=>{this.rour()}}>
            <Text>跳转</Text>
        </TouchableOpacity>
      </View>
      <MyStack navigation={navigation} />
      </>
    );
  }


}
export default App;