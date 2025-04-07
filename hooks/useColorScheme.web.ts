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

import { useEffect, useState } from 'react';
import { useColorScheme as useRNColorScheme } from 'react-native';

/**
 * To support static rendering, this value needs to be re-calculated on the client side for web
 */
export function useColorScheme() {
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    setHasHydrated(true);
  }, []);

  const colorScheme = useRNColorScheme();

  if (hasHydrated) {
    return colorScheme;
  }

  return 'light';
}
