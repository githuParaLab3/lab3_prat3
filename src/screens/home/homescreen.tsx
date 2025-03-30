import { Button } from "@/src/cp/Button";
import { ThemedView } from "@/src/cp/ThemedView";
import { StyleSheet } from 'react-native';
import { useState } from "react";
import RegisterScreen from "../register";
import UserListScreen from "../userlist";
import { TUserAttr } from "@/src/model/user";

export function HomeScreen() {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [userToEdit, setUserToEdit] = useState<TUserAttr | null>(null); 

  const onModalClose = () => {
    setIsModalVisible(false);
    setUserToEdit(null);  
  };

  const handleEditUser = (user: TUserAttr) => {
    setUserToEdit(user);  
    setIsModalVisible(true);  
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.content}>
        <UserListScreen onEditUser={handleEditUser} /> 
      </ThemedView>

      <ThemedView style={styles.footerContainer}>
        <Button theme="primary" label="Inserir Cidades" onPress={() => setIsModalVisible(true)} />
      </ThemedView>

      
      <RegisterScreen visible={isModalVisible} handleClose={onModalClose} userToEdit={userToEdit} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
  },
  footerContainer: {
    height: 60,
    alignItems: 'center',
  },
});
