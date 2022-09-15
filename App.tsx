import {
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_900Black,
} from "@expo-google-fonts/inter";

import { useCallback, useEffect, useMemo, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";

import { Animated, Image, StatusBar, StyleSheet, View } from "react-native";
import { Asset } from "expo-asset";
import Constants from "expo-constants";

import { Background } from "@components/Background";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Routes } from "routes";

// Instruct SplashScreen not to hide yet, we want to do this manually
SplashScreen.preventAutoHideAsync().catch(() => {
  /* reloading the app might trigger some race conditions, ignore them */
});

const cacheImages = async (images) => {
  return images.map((image) => {
    if (typeof image === "string") {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
};

const cacheFonts = async (fonts) => {
  return Font.loadAsync(fonts);
};

export default function App() {
  return (
    <Background>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <GestureHandlerRootView style={{ flex: 1 }}>
        <AnimatedAppLoader image={{ uri: Constants.manifest.splash.image }}>
          <Routes />
        </AnimatedAppLoader>
      </GestureHandlerRootView>
    </Background>
  );
}

function AnimatedSplashScreen({ children, image }) {
  const animation = useMemo(() => new Animated.Value(1), []);
  const [isAppReady, setAppReady] = useState(false);
  const [isSplashAnimationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    if (isAppReady) {
      Animated.timing(animation, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => setAnimationComplete(true));
    }
  }, [isAppReady]);

  const onImageLoaded = useCallback(async () => {
    try {
      await SplashScreen.hideAsync();
      // Load stuff
      await Promise.all([]);
    } catch (e) {
      console.log(e);
      // handle errors
    } finally {
      setAppReady(true);
    }
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {isAppReady && children}
      {!isSplashAnimationComplete && (
        <Animated.View
          pointerEvents="none"
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: Constants.manifest.splash.backgroundColor,
              opacity: animation,
            },
          ]}
        >
          <Animated.Image
            style={{
              width: "100%",
              height: "100%",
              resizeMode: Constants.manifest.splash.resizeMode || "contain",
              transform: [
                {
                  scale: animation,
                },
              ],
            }}
            source={image.uri}
            onLoadEnd={onImageLoaded}
            fadeDuration={0}
          />
        </Animated.View>
      )}
    </View>
  );
}

function AnimatedAppLoader({ children, image }) {
  const [isSplashReady, setSplashReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      await cacheImages([require("@assets/images/app/splash.png")]);
      await cacheFonts({
        Inter_400Regular,
        Inter_600SemiBold,
        Inter_700Bold,
        Inter_900Black,
      });

      setSplashReady(true);
    }

    prepare();
  }, [image]);

  if (!isSplashReady) {
    return null;
  }

  return <AnimatedSplashScreen image={image}>{children}</AnimatedSplashScreen>;
}
