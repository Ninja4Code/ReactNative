import React, {Component} from 'react';
import { View, FlatList, Image } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import {DISHES} from '../shared/dishes';

class Menu extends Component {

    constructor(props){
        super(props);
        this.state = {
            dishes: DISHES
        }
    }
    static navigationOptions = {
        title: 'Menu'
    };    
    render() {
        const renderMenuItem = ({item, index}) => {

            return (
                    <ListItem
                    key={index}
                    title={item.name}                    
                    subtitle={item.description}   
                    onPress ={()=> navigate('Dishdetail', {dishId:item.id})}             
                   avatar={<Image resizeMode='cover' borderRadius={15} style={{ height:30, width:30}} source={require('./images/uthappizza.png')}/>}
                      />
            );
        };
        const {navigate} = this.props.navigation;
        return (
            <FlatList 
                style={{marginTop:25}}
                data={this.state.dishes}
                renderItem={renderMenuItem}
                keyExtractor={item => item.id.toString()}
                />
       );
    }    
}
export default Menu;