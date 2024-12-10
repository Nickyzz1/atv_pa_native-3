import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

import { Image } from 'react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
            backgroundColor: Colors.rosaRoxo.background, // Define o fundo da TabBar
            borderTopWidth: 0,  // Remove qualquer borda ou linha visível da TabBar
          },
          default: {
            backgroundColor: Colors.rosaRoxo.background,
            borderTopWidth: 0,  // Remove qualquer borda ou linha visível da TabBar
          },
        }),
        tabBarItemStyle: {
          // Aqui podemos ajustar o item da TabBar, mas para garantir que o fundo dos ícones seja branco
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: '',
          headerShown: false,
          tabBarIcon: () => (
            <Image
              source={require('../../assets/images/homeIcon.png')}
              style={{ width: 28, height: 28, tintColor:  Colors.white.background}} // Garantir fundo branco
            />
          ),
          tabBarLabel: () => null,
        }}
      />

      <Tabs.Screen
        name="order"
        options={{
          title: '',
          tabBarIcon: ({ color }) => (
            <Image
              source={require('@/assets/images/order.png')} // Caminho para o ícone PNG
              style={{ width: 28, height: 28, tintColor:  Colors.white.background }} // Fundo branco
            />
          ),
        }}
      />
      
      <Tabs.Screen
        name="cart"
        options={{
          title: '',
          tabBarIcon: ({ color }) => (
            <Image
              source={require('@/assets/images/cartHeart.png')} // Caminho para o ícone PNG
              style={{ width: 28, height: 28, tintColor:  Colors.white.background }} // Fundo branco
            />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: '',
          tabBarIcon: ({ color }) => (
            <Image
              source={require('@/assets/images/profile.png')} // Caminho para o ícone PNG
              style={{ width: 28, height: 28, tintColor:  Colors.white.background }} // Fundo branco
            />
          ),
        }}
      />
    </Tabs>
  );
}
