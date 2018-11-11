import React from 'react';
import { View, FlatList } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';

function Menu(props) {

    const renderMenuItem = ({item, index}) => {

        return (
                <ListItem
                key={index}
                title={item.name}                    
                subtitle={item.description}                
                avatar={<Image style={{borderRadius:50, height:50, width:50}} source={require('./images/uthappizza.png')}/>}
                  />
        );
    };

    return (
            <FlatList 
                style={{marginTop:25}}
                data={props.dishes}
                renderItem={renderMenuItem}
                keyExtractor={item => item.id.toString()}
                />
    );
}


export default Menu;