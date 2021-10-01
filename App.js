import React from 'react';
import { SafeAreaView } from 'react-native';
import Header from './components/Header';

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header />
    </SafeAreaView>
  );
}