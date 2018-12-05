import React, {Component} from 'react';
import { Image, FlatList,ScrollView,Text } from 'react-native';
import { ListItem } from 'react-native-elements';
import { Card } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { Loading } from './LoadingComponent';
import * as Animatable from 'react-native-animatable';

const mapStateToProps = state => {
    return {
        leaders: state.leaders
    }
}
function History(){
    return(
        <Card
          title='Our History'>
          <Text style={{margin:10 }}>
            Started in 2010, Ristorante con Fusion quickly established itself as a culinary icon par excellence in Hong Kong. With its unique brand of world fusion cuisine that can be found nowhere else, it enjoys patronage from the A-list clientele in Hong Kong.  Featuring four of the best three-star Michelin chefs in the world, you never know what will arrive on your plate the next time you visit us.
          </Text>
          <Text style = {{margin:10}}>
           The restaurant traces its humble beginnings to The Frying Pan, a successful chain started by our CEO, Mr. Peter Pan, that featured for the first time the world's best cuisines in a pan.
          </Text>
        </Card>
    )
}
function renderLeader({item, index})  {
        return (           
            <ListItem
                key={index}
                title={item.name}
                subtitle={item.description}
                hideChevron={true}
                avatar={<Image resizeMode='cover' borderRadius={15} style={{ height:30, width:30}} 
                    source={{uri: baseUrl + item.image}}/>}
            />                
        );
}
class About extends Component{

    static navigationOptions = {
        title:"About Us"
    };
    render(){    
        if (this.props.leaders.isLoading) {
        return(
            <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
                <ScrollView>
                    <History />
                    <Card
                        title='Corporate Leadership'>
                        <Loading />
                    </Card>
                </ScrollView>
            </Animatable.View>
        );
    }
    else if (this.props.leaders.errMess) {
        return(            
            <ScrollView>
                <History />
                <Card
                    title='Corporate Leadership'>
                    <Text>{this.props.leaders.errMess}</Text>
                </Card>
            </ScrollView>            
        );
    }
    else {
        return(
            <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
                <ScrollView>
                    <History />
                    <Card
                        title='Corporate Leadership'>
                    <FlatList 
                        data={this.props.leaders.leaders}
                        renderItem={renderLeader}
                        keyExtractor={item => item.id.toString()}
                        />
                    </Card>
                </ScrollView>
            </Animatable.View>
        );
    }
 
    }
}
export default connect(mapStateToProps)(About);