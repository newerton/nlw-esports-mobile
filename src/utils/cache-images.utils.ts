import { Asset } from 'expo-asset';
import { Image } from 'react-native';

export const cacheImages = async (images: string[]) => {
  return images.map((image) => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
};
