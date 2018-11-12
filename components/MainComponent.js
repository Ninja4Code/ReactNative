import React, { Component } from 'react';
import { View, Platform } from 'react-native';
import { createStackNavigator,createDrawerNavigator  } from 'react-navigation';
import  Menu  from './Menucomponent';
import Dishdetail from './dishdetailcomponet';
import Home from './HomeComponent';
import { Icon } from 'react-native-elements';
import Contact from './ContactUs';
import About from './About Us';


const AboutNavigator = createStackNavigator({
 About:{ screen:About }
},{
  navigationOptions: ({ navigation }) => ({
    headerStyle: {
        backgroundColor: "#512DA8"
    },
    headerTitleStyle: {
        color: "#fff"            
    },
    headerTintColor: "#fff"  
  })
})


const ContactNavigator = createStackNavigator({
  Contact:{screen :Contact }
},{
  navigationOptions: ({ navigation }) => ({
    headerStyle: {
        backgroundColor: "#512DA8"
    },
    headerTitleStyle: {
        color: "#fff"            
    },
    headerTintColor: "#fff"  
  })
})

const MenuNavigator = createStackNavigator({
  Menu: { screen: Menu },
  Dishdetail: { screen: Dishdetail }
},
{
  initialRouteName: 'Menu',
  navigationOptions: {
      headerStyle: {
          backgroundColor: "#512DA8"
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
          color: "#fff"            
      }
  }
}
);
const HomeNavigator = createStackNavigator({
  Home: { screen: Home }
}, {
  navigationOptions: ({ navigation }) => ({
    headerStyle: {
        backgroundColor: "#512DA8"
    },
    headerTitleStyle: {
        color: "#fff"            
    },
    headerTintColor: "#fff"  
  })
});

const MainNavigator = createDrawerNavigator({
  Home: 
    { screen: HomeNavigator,
      navigationOptions: {
        title: 'Home',
        drawerLabel: 'Home'
      }
    },
    About:
{
  screen: AboutNavigator,
  navigationOptions: {
    title: 'About Us',
    drawerLabel: 'About Us'
  }
},
  Menu: 
    { screen: MenuNavigator,
      navigationOptions: {
        title: 'Menu',
        drawerLabel: 'Menu'
      }
    },

Contact:
{ screen: ContactNavigator,
  navigationOptions: {
    title: 'Contact Us',
    drawerLabel: 'Contact Us'
  }
}


}, {
drawerBackgroundColor: '#D1C4E9'
});
class Main extends Component {
  render() {
    return (       
      <View style={{flex:1, paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight }}>
            <MainNavigator />
        </View>
    );
  }
}
  
export default Main;