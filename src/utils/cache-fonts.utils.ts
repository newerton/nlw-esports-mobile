import * as Font from "expo-font";

export const cacheFonts = async (
  fonts: string | Record<string, Font.FontSource>
) => {
  return Font.loadAsync(fonts);
};
