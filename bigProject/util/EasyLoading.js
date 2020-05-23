  //EasyLoading.show();//显示
        //EasyLoading.dimiss();//关闭
       //自定义文本和超时时间
    //    EasyLoading.show('加载中...', 2000);
    //    <Loading color={'red'} loadingStyle={{backgroundColor: 'lightgreen'}} textStyle={{color: 'red', fontSize: 18}}/>




    'use strict';
    import React from 'react';
    import PropTypes from 'prop-types'
    import {StyleSheet, Text, View, Modal, ActivityIndicator} from 'react-native';
    
    let lo;
    const defaultTimeOut = -1;//设置显示时间标识
    
    export class EasyLoading {
    
        /**
         * 显示Loading
         * @param text  Loading显示文本，默认为'加载中'
         * @param timeout Loading显示时间，为-1时会一只显示，需要手动关闭
         */
        static show(text = '加载中...', timeout = defaultTimeOut) {
            console.log(timeout);
            lo.setState({"isShow": true, "text": text, "timeout": timeout});
        }
    
        /**
         * 关闭Loading
         */
        static dismiss() {
            lo.setState({"isShow": false});
        }
    }
    
    export class Loading extends React.Component {
    
        static propTypes = {
            color: PropTypes.string,
            textStyle: PropTypes.any,
            loadingStyle: PropTypes.any,
        };
    
        constructor(props) {
            super(props);
            this.handle = 0;
            this.state = {
                isShow: false,
                timeout: defaultTimeOut,
                text: "加载中..."
            };
            lo = this;
        }
    
        componentWillUnmount() {
            clearTimeout(this.handle);
        }
    
        render() {
            clearTimeout(this.handle);
    
            (this.state.timeout !== defaultTimeOut) && (this.handle = setTimeout(() => {
                EasyLoading.dismiss();
            }, this.state.timeout));
    
            return (
                <Modal
                    animationType={"fade"}
                    transparent={true}
                    visible={this.state.isShow}
                    hardwareAccelerated={true}
                    onRequestClose={() => {
                        alert("确认弹出层关闭.")
                    }}>
                    <View style={styles.container}>
                        <View style={[styles.load_box, this.props.loadingStyle]}>
                            <ActivityIndicator animating={true} color={this.props.color || '#FFF'} size={'large'}
                                               style={styles.load_progress}/>
                            <Text style={[styles.load_text, this.props.textStyle]}>{this.state.text}</Text>
                        </View>
                    </View>
                </Modal>
            );
        }
    }
    
    const styles = StyleSheet.create({
        load_box: {
            width: 100,
            height: 100,
            backgroundColor: '#000',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 10
        },
        load_progress: {
            width: 50,
            height: 50
        },
        //默认字体颜色
        load_text: {
            color: '#FFF',
        },
        container: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(178,178,178,0.8)',
        },
    });