import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer, createAppContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets  } from '@react-navigation/stack';

import Home from './pages/Home';
import About from './pages/About';
import PokemonDetail from './pages/PokemonDetail';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} options={{headerShown:false, ...TransitionPresets.ModalTransition,}} />
        <Stack.Screen name="About" component={About} options={{headerShown:false,...TransitionPresets.ModalSlideFromBottomIOS}} />
        <Stack.Screen name="PokemonDetail" component={PokemonDetail} options={{headerShown:false, ...TransitionPresets.ModalPresentationIOS}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

/*export default 
    createStackNavigator({
      Home: { screen: Home, navigationOptions: { headerShown: false } },
      About: { screen: About, navigationOptions: { headerShown: false } },
      PokemonDetail: { screen: PokemonDetail, navigationOptions: { headerShown: false } },    
    },
      {
        headerMode: 'none',
        initialRouteName:'Home',
        defaultNavigationOptions: {
          ...TransitionPresets.ModalPresentationIOS,
        }
      },
      {
        defaultNavigationOptions: {
          headerTitle: "Pokedex",
          headerTintColor: '#fff',
          headerStyle: {
            backgroundColor: '#1b2f75',
          },
          headerTitleStyle: {
            fontSize: 15,
            alignSelf: 'center'
          }
        }
      });*/
  