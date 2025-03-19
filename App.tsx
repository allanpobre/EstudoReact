import React from 'react';
import { StyleSheet, View } from 'react-native';
import TelaCadastroProduto from './src/views/TelaCadastroProduto';

export default function App() {
  return (
    <TelaCadastroProduto /> 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
