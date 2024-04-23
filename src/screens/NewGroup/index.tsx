import { useState } from "react";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { groupCreate } from "@storage/group/groupCreate";
import { AppError } from "@utils/AppError";
import { Container, Content, Icon } from "./style";

import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { Button } from "@components/Button";
import { Input } from "@components/Input/index,";

export function NewGroup() {
  const [group, setGroup] = useState("");

  const navigation = useNavigation();

  async function handleGroup() {
    try {
      if (group.trim().length === 0) {
        return Alert.alert(
          "Novo Grupo",
          "Informe o nome."
        );
      }
      await groupCreate(group);
      navigation.navigate("players", { group });
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert("Novo Grupo", error.message);
      } else {
        Alert.alert("Novo Grupo", "Não foi possivel criar um novo grupo.");

        console.log(error);
      }
    }
  }

  return (
    <Container>
      <Header showBackButton />
      <Content>
        <Icon />
        <Highlight
          title="Nova Turma"
          subtitle="Crie a turma para adicionar as pessoas"
        />
        <Input placeholder="nome da turma" onChangeText={setGroup} />
        <Button title="Criar" style={{ marginTop: 20 }} onPress={handleGroup} />
      </Content>
    </Container>
  );
}
