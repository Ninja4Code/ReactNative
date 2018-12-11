import React, { Component } from 'react';
import { View, Platform } from 'react-native';
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
  // fetchComments:() => dispatch(fetchComments())
});
class Main extends Component {
  componentDidMount() {
    this.props.fetchLeaders();
   // this.props.fetchComments();
    this.props.fetchDishes();
    this.props.fetchPromos();
  }
  render() {
    return (       
      <View style={{flex:1, paddingTop: Platform.OS === 'ios' ? 0 : 5 }}>
            <MainNavigator />
        </View>
    );
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Main);