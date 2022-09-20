import React, {useEffect, useState} from 'react';
import { FlatList, Image, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import logoImg from '../../assets/logo-nlw-esports.png'
import { Background } from '../../components/Background';
import { GameCard, GameCardProps } from '../../components/GameCard';
import { Heading } from '../../components/Heading';
import {useNavigation} from '@react-navigation/native'

import { styles } from './styles';

export function Home() {
  const [games, setGames] = useState<GameCardProps[]>([])
  const navigation = useNavigation()

  function handleNavigateToGameScreen({id, title, bannerURL}: GameCardProps) {
    navigation.navigate('game', {
      id, title, bannerURL
    })
  }

  useEffect(() => {
    fetch('http://192.168.1.91:3333/games').then(response => response.json()).then(data => setGames(data))
  }, [])

  return (
    <Background>

    <SafeAreaView style={styles.container}>
      <Image source={logoImg} style={styles.logo} />
      <Heading title='Encontre seu duo!' subtitle='Selecione o game que deseja jogar...' />
      <FlatList
        data={games}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <GameCard
            data={item}
            onPress={() => handleNavigateToGameScreen(item)}
          />
          )}
          
          showsHorizontalScrollIndicator={false}
          horizontal 
          contentContainerStyle={styles.contentList}
          />
    </SafeAreaView>
    </Background>
  );
}