import { DuoInfo } from "@components/DuoInfo";
import { THEME } from "@theme/index";
import { GameController } from "phosphor-react-native";
import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import { styles } from "./styles";

export type DuoCardProps = {
  id: string;
  hourEnd: string;
  hourStart: string;
  name: string;
  useVoiceChannel: boolean;
  weekDays: Array<string>;
  yearsPlaying: number;
};

type Props = {
  data: DuoCardProps;
  onConnect: (discord: string) => void;
};

export function DuoCard({ data, onConnect }: Props) {
  return (
    <View style={styles.container}>
      <DuoInfo label="Name" value={data.name} />
      <DuoInfo label="Tempo de jogo" value={`${data.yearsPlaying} anos`} />
      <DuoInfo
        label="Disponibilidade"
        value={`${data.weekDays.length} dias \u2022 ${data.hourStart} - ${data.hourEnd} `}
      />
      <DuoInfo
        label="Chamada de áudio?"
        value={data.useVoiceChannel ? "Sim" : "Não"}
        colorValue={
          data.useVoiceChannel ? THEME.COLORS.SUCCESS : THEME.COLORS.ALERT
        }
      />

      <TouchableOpacity style={styles.button} onPress={() => onConnect(data.id)}>
        <GameController color={THEME.COLORS.TEXT} size={20} />
        <Text style={styles.buttonTitle}>Conectar</Text>
      </TouchableOpacity>
    </View>
  );
}
