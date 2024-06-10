import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import HomeScreen from './screens/HomeScreen';
import DetailScreen from './screens/DetailScreen';
import AddEditScreen from './screens/AddEditScreen';

const Stack = createStackNavigator();
const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Detail" component={DetailScreen} />
          <Stack.Screen name="AddEdit" component={AddEditScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
}








































