import { useState, useEffect } from "react";
import { Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Entypo } from "@expo/vector-icons";

import logo from "@assets/images/logo-nlw-esports.png";

import { styles } from "./styles";
import { Heading } from "@components/Heading";
import { Background } from "@components/Background";
import { useNavigation, useRoute } from "@react-navigation/native";
import { GamesParams } from "../../@types/navigation";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { THEME } from "@theme/index";
import { DuoCard, DuoCardProps } from "@components/DuoCard";
import { DuoMatch } from "@components/DuoMatch";

export function Games() {
  const route = useRoute();
  const navigation = useNavigation();
  const [ads, setAds] = useState<DuoCardProps[]>([]);
  const [discordSelected, setDiscordSelected] = useState("");

  const game = route.params as GamesParams;

  useEffect(() => {
    fetch(`http://192.168.100.10:3000/games/${game.id}/ads`)
      .then((response) => response.json())
      .then((data) => setAds(data));
  }, []);

  function handleGoBack() {
    navigation.goBack();
  }

  function handleDiscordSelected(adsId: string) {
    if (adsId.length > 0) {
      fetch(`http://192.168.100.10:3000/ads/${adsId}/discord`)
        .then((response) => response.json())
        .then((data) => setDiscordSelected(data.discord));
    }
  }

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBack}>
            <Entypo
              name="chevron-thin-left"
              color={THEME.COLORS.CAPTION_300}
              size={20}
            />
          </TouchableOpacity>

          <Image source={logo} style={styles.logo} />
          <View style={styles.right} />
        </View>

        <Image
          source={{ uri: game.bannerUrl }}
          style={styles.cover}
          resizeMode="cover"
        />

        <Heading title={game.title} subtitle="Conecte-se e comece a jogar!" />

        <FlatList
          data={ads}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <DuoCard data={item} onConnect={handleDiscordSelected} />
          )}
          horizontal={true}
          style={[styles.containerList]}
          contentContainerStyle={[
            styles.contentList,
            ads.length === 0 && { ...styles.emptyListContent },
          ]}
          showsHorizontalScrollIndicator={false}
          ListEmptyComponent={() => (
            <Text style={styles.emptyListText}>
              Não há anuncios publicados ainda.
            </Text>
          )}
        />
        <DuoMatch
          visible={discordSelected.length > 0}
          discord={discordSelected}
          onClose={() => setDiscordSelected("")}
        />
      </SafeAreaView>
    </Background>
  );
}
