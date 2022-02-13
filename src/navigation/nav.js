import React from 'react';
import {createStackNavigator} from '@react-navigation/stack'

import FirstPageScreen from '../screens/firstPageScreen'
import GameScreen from '../screens/game'
import WrongAnswersScreen from '../components/showWrongAnswer'

const MyStackNavigator = createStackNavigator();

export const Navigation=()=>{

    return(
        <MyStackNavigator.Navigator screenOptions={{headerShown: false}}>
            <MyStackNavigator.Screen name="firstPage" component={FirstPageScreen} />
            <MyStackNavigator.Screen name="game" component={GameScreen}/>
            <MyStackNavigator.Screen name="wrongAnswers" component={WrongAnswersScreen}/>
        </MyStackNavigator.Navigator>
       
        )

}