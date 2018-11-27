import React, { Component } from 'react';
import { View, Text, ScrollView, FlatList, Modal, Button, StyleSheet } from 'react-native';
import { Card, Icon, Input, Rating } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite, postComment } from '../redux/ActionCreators';



const mapStateToProps = state => {
    return {
      dishes: state.dishes,
      comments: state.comments,
      favorites: state.favorites
    }
}
const mapDispatchToProps = dispatch => ({
    postFavorite: (dishId) => dispatch(postFavorite(dishId)),
    postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment))
})

function RenderDish(props) {

    const dish = props.dish;
    
        if (dish != null) {
            return(
                <Card
                featuredTitle={dish.name}
                image={{uri: baseUrl + dish.image}}>
                    <Text style={{margin: 10}}>
                        {dish.description}
                    </Text>
                    <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                        <Icon
                            raised
                            reverse
                            name={ props.favorite ? 'heart' : 'heart-o'}
                            type='font-awesome'
                            color='#f50'
                            style={{flex: 1}}
                            onPress={() => props.favorite ? console.log('Already favorite') : props.onPress()}
                            />
                        <Icon
                            raised
                            reverse
                            name='pencil'
                            type='font-awesome'
                            color='#512da7'
                            style={{flex: 1}}
                            onPress={ () => props.toggleModal() }                        
                            />
                         </View>
                </Card>
            );
        }
        else {
            return(<View></View>);
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
class DishDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            favorites: [],
            showModal: false,
            rating: 3,
            author: '',
            comment: ''
        }
        this.toggleModal = this.toggleModal.bind(this);
        this.handleRating = this.handleRating.bind(this);
        this.handleComment = this.handleComment.bind(this);
    }

    markFavorite(dishId) {
        this.props.postFavorite(dishId);
    }

    toggleModal() {
        this.setState({showModal: !this.state.showModal});
    }
    handleRating(rating) {
        this.setState({ rating }) 
    }

    handleComment(dishId, rating, author, comment) {
        this.props.postComment(dishId, rating, author, comment);
        this.toggleModal();
    }

    static navigationOptions = {
        title: 'Dish Details'
    };

    render() {
        const dishId = this.props.navigation.getParam('dishId','');
        return(
            <ScrollView>
                <RenderDish dish={this.props.dishes.dishes[+dishId]}
                    favorite={this.props.favorites.some(el => el === dishId)}
                    onPress={() => this.markFavorite(dishId)} 
                    toggleModal={ () => this.toggleModal()}
                    />
                <RenderComments comments={this.props.comments.comments.filter((comment) => comment.dishId === dishId)} />

                <Modal 
                    animationType={"slide"}
                    transparent={false}
                    visible={this.state.showModal}
                    onDismiss={ () => this.toggleModal() }
                    onRequestClose={ () => this.toggleModal() }
                    >
                    <View style={{ justifyContent: 'center',margin: 10}}>
                        <Rating
                            showRating
                            type="star"
                            fractions={0}
                            startingValue={this.state.rating}
                            imageSize={40}
                            style={{ paddingVertical: 10 }}
                            onFinishRating={ this.handleRating }
                        />
                        <Input
                            placeholder="Author"
                            leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                            onChangeText={ author => this.setState({ author })}
                        />
                        <Input
                            placeholder="Comment"
                            leftIcon={{ type: 'font-awesome', name: 'comment-o' }}
                            onChangeText={ comment => this.setState({ comment })}
                        />
                        <View style={{ marginBottom: 20, marginTop: 20}}>
                            <Button
                                onPress={ () => this.handleComment( dishId, this.state.rating, this.state.author, this.state.comment ) }
                                title="Submit"
                                color="#512DA8"
                                accessibilityLabel="Post your comment"
                            />
                        </View>
                        <View>
                            <Button
                                onPress={this.toggleModal}
                                title="Dismiss"
                                color="#808080"
                                accessibilityLabel="Dismiss modal"
                            />
                        </View>
                        
                    </View>
                </Modal>

            </ScrollView>   
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DishDetail);
