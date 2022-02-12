import React from 'react';
import {createStackNavigator} from '@react-navigation/stack'

import MainScreen from '../components/main'
import GameScreen from '../components/game'
import WrongAnswersScreen from '../screens/showWrongAnswer'
import GameOverScreen from '../screens/gameOverScreen'
const MyStackNavigator = createStackNavigator();

export const Navigation=()=>{

    return(
        <MyStackNavigator.Navigator screenOptions={{headerShown: false}}>
            <MyStackNavigator.Screen name="main" component={MainScreen} />
            <MyStackNavigator.Screen name="gameOver" component={GameOverScreen} />
            <MyStackNavigator.Screen name="game" component={GameScreen}/>
            <MyStackNavigator.Screen name="wrongAnswers" component={WrongAnswersScreen}/>
        </MyStackNavigator.Navigator>
       
        )

}