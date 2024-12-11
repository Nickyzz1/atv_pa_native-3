import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, StyleSheet } from 'react-native';

import { Colors } from '@/constants/Colors';

import { Image } from 'react-native';

export default function TabLayout() {

  const styles = StyleSheet.create({
    icon: {
      width: 40,
      height: 40,
      tintColor: Colors.white.background
    },

    tabBarStyle: {
      backgroundColor: Colors.rosaRoxo.background,
      borderTopWidth: 0,
      paddingBottom: 10, 
      height: 70, 
    }
});

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: Platform.select({
          ios: {
            ...styles.tabBarStyle
            // position: 'absolute',
            // backgroundColor: Colors.rosaRoxo.background,
            // borderTopWidth: 0,
          },
          default: {
            ...styles.tabBarStyle
            // backgroundColor: Colors.rosaRoxo.background,
            // borderTopWidth: 0, 
          },
        }),
        tabBarItemStyle: {

        },
      }}
    >

      <Tabs.Screen
        name='home'
        options={{
          headerShown: false,
          tabBarIcon: () => (<Image source={require('@/assets/images/homeIcon.png')} style={styles.icon}/>),
          tabBarLabel: () => null
          }}>
      </Tabs.Screen>

      <Tabs.Screen
        name='order'
        options={{
          headerShown: false,
          tabBarIcon: () => (<Image source={require('@/assets/images/order.png')} style={styles.icon}/>),
          tabBarLabel: () => null
          }}>
      </Tabs.Screen>

      <Tabs.Screen
        name='cart'
        options={{
          headerShown: false,
          tabBarIcon: () => (<Image source={require('@/assets/images/cartHeart.png')} style={styles.icon}/>),
          tabBarLabel: () => null
          }}>
      </Tabs.Screen>

      <Tabs.Screen
        name='profile'
        options={{
          headerShown: false,
          tabBarIcon: () => (<Image source={require('@/assets/images/profile.png')} style={styles.icon}/>),
          tabBarLabel: () => null
          }}>
      </Tabs.Screen>

    </Tabs>
  );
}
