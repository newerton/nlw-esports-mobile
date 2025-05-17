import { useEffect, useState } from "react";

import {
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_900Black,
} from "@expo-google-fonts/inter";
import { cacheImages } from "@utils/cache-images.utils";
import { cacheFonts } from "@utils/cache-fonts.utils";
import { AnimatedSplashScreen } from "../AnimatedSplashScreen";


export function AnimatedAppLoader({ children, image }) {
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