import * as Notifications from "expo-notifications";

export async function getPushNotificationToken() {
  const { granted } = await Notifications.getPermissionsAsync();

  if (!granted) {
    await Notifications.requestPermissionsAsync();
  }

  if (granted) {
    const pushToken = await Notifications.getExpoPushTokenAsync({
      projectId: '98efda10-e81a-4ded-ac96-313fbb0b17c9',
    });
    console.log({ pushToken });
    return pushToken;
  }
}
