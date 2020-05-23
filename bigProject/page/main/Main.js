/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions ,Image ,TextInput,TouchableOpacity, BackHandler,PermissionsAndroid ,Toast,StatusBar,AsyncStorage} from 'react-native';
import zero from './../../util/zero'


//设备宽高
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
//设计宽高1870,1925
const pwidth=1081,pheight=1925;
var that;
class Main extends Component {
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
             
                   <Text>大屏测1111111111111试的</Text>
                
                   <TouchableOpacity onPress={()=>{this.rour()}}>
                        <Text>跳转</Text>
                    </TouchableOpacity>
               
              
               

            </View>

        );
    }
    
    rour(){
        console.log("123123")
        this.props.navigation.navigate('Hend')
    }
    
  
    

}
const styles = StyleSheet.create({
    main:{
        backgroundColor:'yellow'
    },
    
  
});

export default Main;
