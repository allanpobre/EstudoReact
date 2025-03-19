import React from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";
import { useForm, Controller } from "react-hook-form"
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Produto {
  nome: string;
  descricao: string;
  valor: string;
}

const TelaCadastroProduto: React.FC = () => {
  const {
    control,
    handlerSubmit,
    formState: { errors },
    reset
  } = useForm<Produto>()

  try {
    const enviar = async (dados: Produto) => {
      const produtoExiste = await AsyncStorage.getItem("produtos");
      let produtos = produtoExiste ? JSON.parse(produtoExiste) : [];
      if (produtoExiste) {
        produtos = JSON.parse(produtoExiste);
      }

      const novoProduto = { ...dados, id: Math.random() * 100 };
      produtos.push(novoProduto);

      await AsyncStorage.setItem("produtos", JSON.stringify(produtos));
      console.log("Dados salvos com sucesso!")
      reset()
    }
  }
  catch (error) {
    console.log("Erro ao salvar: " + error)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.labels}>Nome do Produto:</Text>
      <Controller
        control={control}
      name="nome"
      rules={{ required: "Nome deve ser obrigatório" }}
      render={({ field: { onChange, value } }) => {

      }}
      />
      <TextInput
        style={styles.input}
        placeholder="Digite o nome do produto"
      />

      <Text style={styles.labels}>Descrição do Produto:</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite a descrição do produto"
      />
      <Text style={styles.labels}>Valor do Produto (Unitário):</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o valor do produto"
        keyboardType="numeric"
      />
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  labels: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginTop: 5,
  }
})

export default TelaCadastroProduto; 