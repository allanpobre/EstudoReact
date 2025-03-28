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
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<Produto>()


  const enviar = async (dados: Produto) => {
    try {
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
    } catch (error) {
      console.log("Erro ao salvar: " + error)
    }
  }


  return (
    <View style={styles.container}>
      <Text style={styles.labels}>Nome do Produto:</Text>
      <Controller
        control={control}
        name="nome"
        rules={{ required: "Nome deve ser obrigatório" }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Digite o nome do produto"
            onChangeText={onChange}
            value={value}
          />
        )}
      />

      <Text style={styles.labels}>Descrição do Produto:</Text>
      <Controller
        control={control}
        name="descricao"
        rules={{ required: "Nome deve ser obrigatório" }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Digite a descrição do produto"
            onChangeText={onChange}
            value={value}
          />
        )}
      />

      <Text style={styles.labels}>Valor do Produto (Unitário):</Text>
      <Controller
        control={control}
        name="valor"
        rules={{ required: "Valor unitário deve ser obrigatório" }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Digite o valor unitário do produto"
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      <Button title="Salvar" onPress={handleSubmit(enviar)} />
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