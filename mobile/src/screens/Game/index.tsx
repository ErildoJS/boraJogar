import { Entypo } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GameParams } from '../../@types/navigation';
import logoImg from '../../assets/logo-nlw-esports.png';
import { Background } from '../../components/Background';
import { DuoCard, DuoCardProps } from '../../components/DuoCard';
import { Heading } from '../../components/Heading';
import { THEME } from '../../theme';
import { styles } from './styles';
import {DuoMatch} from '../../components/DuoMatch'

export function Game() {
  const [ads, setAds] = useState<DuoCardProps[]>([])
  const [discordDuoSelected, setDiscordDuoSelected] = useState('')

  const navigation = useNavigation()
  const route = useRoute()
  const game = route.params as GameParams

  function handleGoBack() {
    navigation.goBack()
  }

  async function handleGetDiscordUser(adsId: string) {
    await fetch(`http://192.168.1.91:3333/ads/${adsId}/discord`).then(response => response.json()).then(data => setDiscordDuoSelected(data.discord))
  }

  useEffect(() => {
    fetch(`http://192.168.1.91:3333/games/${game.id}/ads`).then(response => response.json()).then(data => setAds(data))
  }, [])

  return (
    <Background>
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack}>
          <Entypo color={THEME.COLORS.CAPTION_300} size={20}/>
        </TouchableOpacity>

        <Image source={logoImg} style={styles.logo} />

        <View style={styles.right}/>
      </View>

      <Image source={{uri: game.bannerURL}} resizeMode="center" style={styles.cover}/>

      <Heading title={game.title} subtitle='Conecte-se e começe a jogar!' />

      <FlatList
        data={ads}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <DuoCard onConnect={() => handleGetDiscordUser(item.id)} data={item}/>
        )}

        horizontal
        style={styles.containerList}
        contentContainerStyle={[ads.length > 0 ? styles.contentList : styles.emptyListContent]}
        showsHorizontalScrollIndicator={false}
        ListEmptyComponent={() => (
          <Text style={styles.emptyListText}>Não há anúncios publicados ainda</Text>
        )}
      />

      <DuoMatch visible={discordDuoSelected.length > 0}
       onClose={() => setDiscordDuoSelected('')} 
       discord={discordDuoSelected} 
       transparent
        statusBarTranslucent
        />

    </SafeAreaView>
    </Background>
  );
}