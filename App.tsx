
import { useEffect, useRef } from "react";
import * as SplashScreen from "expo-splash-screen";

import { Subscription } from "expo-modules-core";

import {  StatusBar } from "react-native";

import Constants from "expo-constants";

import { Background } from "@components/Background";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Routes } from "routes";

import * as Notifications from "expo-notifications";
import "./src/services/notifications";
import { getPushNotificationToken } from "services/notification-token";
import { AnimatedAppLoader } from "@components/SplashScreen/AnimatedAppLoader";


// Instruct SplashScreen not to hide yet, we want to do this manually
SplashScreen.preventAutoHideAsync().catch(() => {
  /* reloading the app might trigger some race conditions, ignore them */
  console.log('SplashScreen.preventAutoHideAsync()');
});

export default function App() {
  const getNotificationsListener = useRef<Subscription>();
  const responseNotificationsListener = useRef<Subscription>();

  useEffect(() => {
    getPushNotificationToken();
  });

  useEffect(() => {
    getNotificationsListener.current =
      Notifications.addNotificationReceivedListener((notification) =>
        console.log(notification)
      );
    responseNotificationsListener.current =
      Notifications.addNotificationResponseReceivedListener((response) =>
        console.log(response)
      );

    return () => {
      if (
        getNotificationsListener.current &&
        responseNotificationsListener.current
      ) {
        Notifications.removeNotificationSubscription(
          getNotificationsListener.current
        );
        Notifications.removeNotificationSubscription(
          responseNotificationsListener.current
        );
      }
    };
  });

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