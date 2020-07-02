import React, { useState, useEffect } from 'react';
import { View, Image, Animated, Easing } from 'react-native';

const PokemonDetail = ({ route, navigation }) => {

  const [pokemon, setPokemon] = useState(route.params.pokemon);
  const [spinValue, setSpinValue] = useState(new Animated.Value(0));

  useEffect(() => {
    console.log(pokemon);  
  }, []);

  return (
    <>
      <View>
        <View style={{ backgroundColor: pokemon.color1, height: 300 }}>
          <Image source={require('../../../resources/img/gray.png')} style={{ width: 300, height: 300, resizeMode: 'cover', position: 'absolute', opacity: .3, marginTop: 70, marginLeft: 70}} />
          <View>

            <Image source={{ uri: pokemon.image }} style={{ resizeMode: 'contain', width: 180, height: 180,alignSelf:"center",marginTop: 132 }} />
          </View>
        </View>

      </View>
    </>
  );
}

export default PokemonDetail;