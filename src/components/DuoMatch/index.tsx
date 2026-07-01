import { Heading } from '@components/Heading';
import { MaterialIcons } from '@expo/vector-icons';
import { THEME } from '@theme/index';
import * as Clipboard from 'expo-clipboard';
import { CheckCircle } from 'phosphor-react-native';
import { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Modal,
  type ModalProps,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { styles } from './styles';

type DuoMatchProps = ModalProps & {
  discord: string;
  onClose: () => void;
};

export function DuoMatch({ discord, onClose, ...rest }: DuoMatchProps) {
  const [isCopyToClipboard, setIsCopyToClipboard] = useState(false);
  const handleCopyToClipboard = async (discord: string) => {
    setIsCopyToClipboard(true);
    await Clipboard.setStringAsync(discord);
    Alert.alert(
      'Discord copiado',
      `Usuário ${discord} copiado para você colar no Discord.`,
    );
    setIsCopyToClipboard(false);
  };
  return (
    <Modal transparent statusBarTranslucent animationType="fade" {...rest}>
      <View style={styles.container}>
        <View style={styles.content}>
          <TouchableOpacity style={styles.closeIcon} onPress={onClose}>
            <MaterialIcons
              name="close"
              size={20}
              color={THEME.COLORS.CAPTION_500}
            />
          </TouchableOpacity>
          <CheckCircle size={64} color={THEME.COLORS.SUCCESS} weight="bold" />

          <Heading
            title="Let's play"
            subtitle="Agora é só começar a jogar!"
            style={{ alignItems: 'center', marginTop: 24 }}
          />

          <Text style={styles.label}>Adicione no Discord</Text>
          <TouchableOpacity
            style={styles.discordButton}
            onPress={() => handleCopyToClipboard(discord)}
            disabled={isCopyToClipboard}
          >
            <Text style={styles.discord}>
              {isCopyToClipboard ? (
                <ActivityIndicator color={THEME.COLORS.PRIMARY} />
              ) : (
                discord
              )}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
