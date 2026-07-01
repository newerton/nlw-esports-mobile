import backgroundImage from '@assets/images/background-galaxy.png';
import { ImageBackground } from 'react-native';
import { styles } from './styles';

type BackgroundProps = {
  children: React.ReactNode;
};
export function Background({ children }: BackgroundProps) {
  return (
    <ImageBackground
      source={backgroundImage}
      defaultSource={backgroundImage}
      style={styles.container}
    >
      {children}
    </ImageBackground>
  );
}
