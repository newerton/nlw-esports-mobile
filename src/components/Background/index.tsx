import { ImageBackground } from "react-native";

import { styles } from "./styles";

import backgroundImage from "@assets/images/background-galaxy.png";

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
