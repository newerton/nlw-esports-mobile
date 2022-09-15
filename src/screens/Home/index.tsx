import { FlatList, Image } from "react-native";

import logo from "@assets/images/logo-nlw-esports.png";

import { styles } from "./styles";
import { Heading } from "@components/Heading";
import { GameCard, GameCardProps } from "@components/GameCard";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Background } from "@components/Background";
import { useNavigation } from "@react-navigation/native";

export function Home() {
  const [games, setGames] = useState<GameCardProps[]>([]);
  const navigation = useNavigation();

  useEffect(() => {
    fetch("http://192.168.100.10:3000/games")
      .then((response) => response.json())
      .then((data) => setGames(data));
  }, []);

  function handleOpenGame({ id, title, bannerUrl }: GameCardProps) {
    navigation.navigate("game", { id, title, bannerUrl });
  }
  
  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <Image source={logo} style={styles.logo} />

        <Heading
          title="Encontre seu duo!"
          subtitle="Selecione o game que deseja jogar..."
        />

        <FlatList
          data={games}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <GameCard data={item} onPress={() => handleOpenGame(item)} />
          )}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.contentList}
          horizontal
        />
      </SafeAreaView>
    </Background>
  );
}
