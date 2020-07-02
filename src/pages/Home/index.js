import React, { useState, useEffect } from 'react';
import { Alert, View, Text, TouchableOpacity, ScrollView, TextInput, Dimensions, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import api from '../Service';

const dWidth = Dimensions.get('window').width;
const dHeight = Dimensions.get('window').height;

import types from '../../../resources/Utils/types';
import pokedex from '../../../resources/Utils/pokedex';

//var cont = 1;

const Home = ({ navigation }) => {

    const [pokemons, setPokemons] = useState([]);
    const [cont, setCont] = useState(1);

    useEffect(() => {
       getPokemons();
    }, []);

    const getPokemons = async () => {       
        let ct = cont;
        let poks = pokemons;
        await pokedex.map((e) => {
            if (e.id >= cont && e.id <= cont + 19 ) {
                let type = '';
                types.map(i => {
                    if (i.description === e.type[0].toLowerCase()) {
                        type = i;
                    }
                });

                poks.push({
                    id: e.id,
                    sequence: `#${e.id.toString().padStart(3, '0')}`,
                    name: e.name.english,
                    type: e.type.join(', '),
                    color1: type.colorPrimary,
                    color2: type.colorSecondary,
                    image: `https://pokeres.bastionbot.org/images/pokemon/${e.id}.png`
                });

                ct++;

            }
        });

        console.log(ct);
        setCont(ct);
        console.log(poks);
        setPokemons(poks);

    }



    return (
        <ScrollView                       
            contentContainerStyle={{ paddingBottom: 60 }} style={{ backgroundColor: '#fff' }} showsVerticalScrollIndicator={false}>
            <View>
                <Image source={require('../../../resources/img/gray.png')} style={{ width: dWidth, resizeMode: 'cover', position: 'absolute', opacity: .3, marginTop: -132, marginLeft: 100 }} />
            </View>
            <View style={{ margin: 25, marginTop: 40 }}>
                <TouchableOpacity onPress={() => getPokemons()}>
                    <Text style={{ fontSize: 40, fontFamily: 'Gotham-Bold', color: '#3e3e3e' }}>Pokédex</Text>
                </TouchableOpacity>
                <Text style={{ fontSize: 18, color: '#4a4a4a', marginTop: 10, fontFamily: 'Gotham' }}>Search for Pokémon by name or using the National Pokédex number.</Text>
            </View>

            <View style={{ elevation: 3, paddingLeft: 10, margin: 0, flexDirection: 'row', alignItems: 'center', backgroundColor: '#f5f5f5', height: 60, marginLeft: 25, marginRight: 25, borderRadius: 7 }}>
                <Icon name="magnify" size={25} color="#3e3e3e" />
                <TextInput
                    placeholder="What the Pokémon are you looking for?"
                    style={{ fontSize: 14, fontFamily: 'Gotham', width: dWidth }} />
            </View>



            <View style={{ marginTop: 15, alignItems: 'center' }}>
         

                {
                    pokemons.length > 0 ?
                        pokemons.map(p => {
                            return (
                                <TouchableOpacity onPress={()=> navigation.navigate('PokemonDetail', {pokemon: p})} key={p.id} activeOpacity={.9} style={{ flexDirection: 'row', width: dWidth * 0.87, height: 130, backgroundColor: p.color1, borderRadius: 15, marginTop: 15, elevation: 3 }}>
                                    <View style={{ width: dWidth * 0.45, alignSelf: 'center', marginLeft: 20 }}>
                                        <View>
                                            <Image source={require('../../../resources/img/white.png')} style={{ width: 180, height: 180, resizeMode: 'cover', position: 'absolute', opacity: .3, marginTop: -38, marginLeft: 155 }} />
                                        </View>
                                        <Text style={{ fontSize: 20, color: p.color2, fontFamily: 'Gotham' }}>{p.sequence}</Text>
                                        <Text style={{ fontSize: 30, color: '#fff', fontFamily: 'Gotham-Bold', textTransform: 'capitalize' }}>{p.name}</Text>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={{ fontFamily: 'Gotham-Bold', fontSize: 13, color: p.color2, textTransform: 'capitalize' }}>{p.type}</Text>
                                        </View>
                                    </View>
                                    <View>
                                        <Image source={{ uri: p.image }} style={{ resizeMode: 'cover', width: 100, height: 100, marginTop: 15, marginLeft: 20, alignSelf: 'flex-end' }} />
                                    </View>
                                </TouchableOpacity>
                            )
                        }) : <View />
                }


            </View>
            <TouchableOpacity onPress={()=> getPokemons()} style={{flexDirection:'row', alignSelf:'center', margin: 30, borderWidth:2, padding:10, borderRadius: 5, borderColor:'#c2c2c2'}}>
                <Image source={require('../../../resources/img/poke.png')} style={{resizeMode: 'contain', width: 20, height: 20, marginRight: 10}} />
                <Text style={{fontFamily: 'Gotham', fontSize:15, alignSelf:'center'}}>Load more pokemons ...</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

export default Home;