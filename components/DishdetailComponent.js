import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList, Modal } from 'react-native';
import { Card, Icon, Rating, Input } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite } from '../redux/ActionCreators';

const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        favorites: state.favorites
    }
}
const mapDispatchToProps = dispatch => ({
    postFavorite: (dishId) => dispatch(postFavorite(dishId))
})
function RenderDish(props) {

    const dish = props.dish;
    
        if (dish != null) {
            return (
                <Card
                    featuredTitle={dish.name}
                    image={{uri:baseUrl + dish.image}}>
                    <Text style={{margin: 10}}>
                        {dish.description}
                    </Text>
                    <Icon
                        raised
                        reverse
                        name={ props.favorite ? 'heart' : 'heart-o'}
                        type='font-awesome'
                        color='#f50'
                        onPress={() => props.favorite ? console.log('Already favorite') : props.onPress()}
                    />
                    <Icon
                        raised
                        reverse
                        name= 'pencil'
                        type='font-awesome'
                        color='#f50'                        
                    />
                </Card>
            );
        }
        else {
            return (<View></View>);
        }
}
function RenderComments(props) {

    const comments = props.comments;
            
    const renderCommentItem = ({item, index}) => {
        
        return (
            <View key={index} style={{margin: 10}}>
                <Text style={{fontSize: 14}}>{item.comment}</Text>
                <Text style={{fontSize: 12}}>{item.rating} Stars</Text>
                <Text style={{fontSize: 12}}>{'-- ' + item.author + ', ' + item.date} </Text>
            </View>
        );
    };    
    return (
        <Card title='Comments' >
        <FlatList 
            data={comments}
            renderItem={renderCommentItem}
            keyExtractor={item => item.id.toString()}
            />
        </Card>
    );
}
class Dishdetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            date: '',
            showModal: false
        }
    }
    markFavorite(dishId) {
        this.props.postFavorite(dishId);
    }
    static navigationOptions = {
        title: 'Dish Details'
    };
    toggleModal() {
        this.setState({showModal: !this.state.showModal});
    }
    handleSubmit () {

    }
    handleCancel () {

    }
    handleReservation() {
        console.log(JSON.stringify(this.state));
        this.toggleModal();
    }
    ratingCompleted(rating) {
        console.log("Rating is: " + rating)
    }      
    resetForm() {
        this.setState({
            date: '',
            showModal: false
        });
    }
    render() {
        const dishId = this.props.navigation.getParam('dishId','');
        return (
            <ScrollView>
                <RenderDish dish={this.props.dishes.dishes[+dishId]}
                    favorite={this.props.favorites.some(el => el === dishId)}
                    onPress={() => this.markFavorite(dishId)} 
                />
                <RenderComments comments={this.props.comments.comments.filter((comment) => comment.dishId === dishId)} />
                <Modal animationType = {"slide"} transparent = {false}
                    visible = {this.state.showModal}
                    onRequestClose = {() => this.toggleModal() }>
                    <View style = {styles.modal}>
                        <View style={styles.formRow}>
                            <Rating
                                showRating
                                type="star"
                                fractions={1}
                                startingValue={1}                                
                                imageSize={40}
                                onFinishRating={this.ratingCompleted}
                                onStartRating={this.ratingStarted}
                                style={{ paddingVertical: 10 }}
                            />
                        </View>
                        <View style={styles.formRow}>
                            <Input
                                placeholder='Author'
                                leftIcon=   {
                                    <Icon
                                        name='user'
                                        size={24}
                                        color='white'
                                    />
                                }
                            />                            
                        </View>
                        <View style={styles.formRow}>
                            <Input
                                placeholder='Comment'
                                leftIcon=   {
                                    <Icon
                                        name='user'
                                        size={24}
                                        color='white'
                                    />
                                }
                            />                            
                        </View>
                        <View style={styles.formRow}>
                            <Button
                                onPress={() => this.handleSubmit()}
                                title="SUBMIT"
                                color="#512DA8"
                                accessibilityLabel="Submit comment for processing"
                            />
                        </View>
                        <View style={styles.formRow}>
                            <Button
                                onPress={() => this.handleCancel()}
                                title="CANCEL"
                                color="#512DA8"
                                accessibilityLabel="Cancel and close out"
                            />
                        </View>
                    </View>
                </Modal>
            </ScrollView>
        );
    }   
}
const styles = StyleSheet.create({
    formRow: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      flexDirection: 'row',
      margin: 20
    },
    formLabel: {
        fontSize: 18,
        flex: 2
    },
    formItem: {
        flex: 1
    },
    modal: {
        justifyContent: 'center',
        margin: 20
     },
     modalTitle: {
         fontSize: 24,
         fontWeight: 'bold',
         backgroundColor: '#512DA8',
         textAlign: 'center',
         color: 'white',
         marginBottom: 20
     },
     modalText: {
         fontSize: 18,
         margin: 10
     }
});
export default connect(mapStateToProps, mapDispatchToProps)(Dishdetail);