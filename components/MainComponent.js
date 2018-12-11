import React, { Component } from 'react';
import { View, Platform, Image, StyleSheet, ScrollView, Text } from 'react-native';
/*import { createStackNavigator,createDrawerNavigator, DrawerItems, SafeAreaView  } from 'react-navigation';
import  Menu  from './MenuComponent';
import Dishdetail from './DishdetailComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import Reservation from './ReservationComponent';
import Favorites from './FavoriteComponent';
import { Icon } from 'react-native-elements';*/
import { connect } from 'react-redux';
import { fetchDishes, fetchComments, fetchPromos, fetchLeaders } from '../redux/ActionCreators';
import { MainNavigator} from './MyMenu';

const mapStateToProps = state => {
  return {      
  }
}
const mapDispatchToProps = dispatch => ({
   fetchLeaders:() => dispatch(fetchLeaders()),
   fetchDishes:() => dispatch(fetchDishes()),
   fetchPromos:() => dispatch(fetchPromos()),
   fetchComments:() => dispatch(fetchComments())
});
class Main extends Component {
  componentDidMount() {
    this.props.fetchLeaders();
    this.props.fetchComments();
    this.props.fetchDishes();
    this.props.fetchPromos();
  }
  render() {
    return (       
      <View style={{flex:1, paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight }}>
            <MainNavigator />
        </View>
    );
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Main);