/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions ,Image ,TextInput,TouchableOpacity, BackHandler,PermissionsAndroid ,Toast,StatusBar,AsyncStorage} from 'react-native';
import zero from './../util/zero'


//设备宽高
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
//设计宽高1870,1925
const pwidth=1081,pheight=1925;
var that;
class Hend extends Component {
    // 初始化函数(变量是可以改变的,充当状态机的角色)
    constructor(props) {
        super(props);
        this.state = {
            
        }
        that=this
    }
    
    render() {
        
        return (
            <View style={styles.main}>
             
                   <Text>导航啊啊啊啊啊啊啊 a</Text>
                
               
               
              
               

            </View>

        );
    }
    
 
    
  
    

}
const styles = StyleSheet.create({
    main:{
        height:120,backgroundColor:'#fff'
    },
    
  
});

export default Hend;
