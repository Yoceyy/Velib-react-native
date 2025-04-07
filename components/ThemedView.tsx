/* ================================================================
$$\     $$\                                                           
\$$\   $$  |                                                          
 \$$\ $$  /$$$$$$\   $$$$$$\   $$$$$$$\  $$$$$$\  $$\   $$\ $$\   $$\ 
  \$$$$  /$$  __$$\ $$  __$$\ $$  _____|$$  __$$\ $$ |  $$ |$$ |  $$ |
   \$$  / $$ /  $$ |$$ /  $$ |$$ /      $$$$$$$$ |$$ |  $$ |$$ |  $$ |
    $$ |  $$ |  $$ |$$ |  $$ |$$ |      $$   ____|$$ |  $$ |$$ |  $$ |
    $$ |  \$$$$$$  |\$$$$$$  |\$$$$$$$\ \$$$$$$$\ \$$$$$$$ |\$$$$$$$ |
    \__|   \______/  \______/  \_______| \_______| \____$$ | \____$$ |
                                                  $$\   $$ |$$\   $$ |
                                                  \$$$$$$  |\$$$$$$  |
                                                   \______/  \______/  
           🔗 github.com/Yoceyy | 💻 By Yooceyy
================================================================ */

import { View, type ViewProps } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedView({ style, lightColor, darkColor, ...otherProps }: ThemedViewProps) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}
