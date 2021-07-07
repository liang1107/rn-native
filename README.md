<h1> rn 局部跳转</h1>
参考<br/>
https://www.jianshu.com/p/53a8d5d907cb
<h1> FlatList 滚动</h1>
import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    Dimensions,
    FlatList,
} from 'react-native';

const Dimenis = require('Dimensions');
const { width, height, scale } = Dimensions.get('window');

//引入数据
var Wine = require('./Wine.json');

class main extends Component {

    constructor(props) {
        super(props);
        //初始化数据
        this.state = {
            dataSource: Wine,
            refreshing: false,
        }
    }

    render() {
        return (
            //FlatList flex默认为1且不能调整 想要设置高度只能在外面包裹一层view
            <View style={{ width: width, height: height }}>
                <FlatList style={styles.content}
                    data={this.state.dataSource}//数据设置
                    renderItem={({ item, index }) => this.renderRow(item, index)}//cell样式设置
                    
                    ItemSeparatorComponent={this.separator}//分割线样式
                    keyExtractor={this._extraUniqueKey}//唯一标识符,不实现会有警告

                    ListEmptyComponent={this.createEmpty}//无数据展示的视图
                    ListFooterComponent={this.listFooterComponent}//底部组件
                    ListHeaderComponent={this.listHeaderComponent}//头部组件

                    horizontal={false}//水平滚动(默认)还是垂直滚动

                    refreshing={this.state.refreshing} // 是否刷新 ，自带刷新控件
                    onRefresh={() => {
                        this.refresh();
                    }}
                    // 刷新方法,写了此方法，下拉才会出现  刷新控件，使用此方法必须写 refreshing

                    onEndReached={() => this._onLoadMore()}
                    onEndReachedThreshold={0.1}
                    //决定当距离内容最底部还有多远时触发onEndReached回调。注意此参数是一个比值而非像素单位。比如，0.5 表示距离内容最底部的距离为当前列表可见长度的一半时触发。
                    
                    //以下是Collection样式
                    //numColumns ={3} // 指定多少列  等于 1 的时候，不能写 columnWrapperStyle
                    //columnWrapperStyle={{borderWidth:2, borderColor:'black'}} // 一整行的row设置样式
                />
            </View>
        )
    }
    _extraUniqueKey(item, index) {
        return "index" + index + item;
    }
    refresh(){
        this.setState({
            refreshing: true,
        });
        setTimeout(()=>{
            this.setState({
                refreshing: false,
            })
        },2000);

    }
    _onLoadMore(){
        console.log('加载更多。。。');
    }
    renderRow(item, index) {
        return (
            <View style={styles.cellViewStyle}>
                <Image source={{ uri: item.image }} style={styles.iconImg} />
                <View style={styles.bottomLineView}></View>
                <Text style={styles.titleText}>{item.name}</Text>
                <Text style={styles.price}>售价：{item.money} = {index}</Text>
            </View>
        )
    }
    separator() {
        return (
            <View style={{ width: width, height: 5, backgroundColor: 'orange' }}>
            </View>
        )
    }
    createEmpty() {
        return (
            <View style={{ height: 100, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 16 }}>
                    暂无列表数据，下啦刷新
                </Text>
            </View>
        )
    }
    listHeaderComponent() {
        return (
            <View style={{ height: 50, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ color: 'white' }}>
                    头部布局
                </Text>
            </View>
        )
    }
    listFooterComponent() {
        return (
            <View style={{ height: 50, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ color: 'white' }}>
                    底部布局
                </Text>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    //FlatList样式
    content: {
        backgroundColor: 'green',
        marginTop: 40,
        marginBottom: 40,
    },
    //Cell样式内容
    cellViewStyle: {
        position: 'relative',
        width: width,
        height: 80,
        backgroundColor: 'red',
    },
    iconImg: {
        position: 'absolute',
        top: 5,
        left: 5,
        width: 70,
        height: 70,
        borderRadius: 5,
    },
    titleText: {
        position: 'absolute',
        left: 80,
        top: 5,
        right: 5,
    },
    price: {
        position: 'absolute',
        left: 80,
        bottom: 10,
        fontSize: 20,
        fontWeight: "bold",
    },
    bottomLineView: {
        position: 'absolute',
        width: width,
        bottom: 0,
        height: 1,
        backgroundColor: '#eaeaea',
    },

    emptyView: {
        width: width,
        height: 200,
        backgroundColor: 'red'
    }
});

module.exports = main;
