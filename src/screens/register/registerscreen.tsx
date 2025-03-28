import ModalScreen from "@/src/cp/ModalScreen";
import { ThemedView } from "@/src/cp/ThemedView";
import { useState } from "react";
import { StyleSheet, TextInput, View,Text } from 'react-native';
import { User, TUserAttr } from "@/src/model/user";
import { Button } from "@/src/cp/Button";
import { useContextUser, UserActionTypes } from "@/src/state/user";
import { DZSQLiteInsert } from "@/src/db/drizzlesqlite";
import { usersTable } from "@/src/db/schema";
type RegisterProps = {
  visible :boolean,
  handleClose:()=>void,
  }
  export function RegisterScreen({visible,handleClose}:RegisterProps) {
  const {dispatch} = useContextUser()
  const [ID,setID] = useState("")
  const [cidade,setCidade] = useState("")
  const [estado,setEStado] = useState("")
  const [habitantes,setHabitantes] = useState(0)
  const handleClick = () => {
  const newUser = new User(cidade,estado,habitantes)
  DZSQLiteInsert(usersTable,newUser.data)
  setID(newUser.id)
  dispatch({ type: UserActionTypes.ADD_USER, payload: newUser.datacpy });
  handleClose()
  }
  return(
  <ModalScreen isVisible={visible} onClose={handleClose} title="Registro de
  Usuário">
  <ThemedView style={styles.container}>
  <Text style={styles.id}>ID: {ID}</Text>
  <View style={styles.input}>
  <TextInput value={cidade}
  placeholder="Informe a cidade: "
  autoCapitalize="none"
  autoCorrect={false}
  
  onChangeText={(text)=>setCidade(text)}/>
  </View>
  <View style={styles.input}>
  <TextInput value={estado}
  placeholder="Informe o estado: "
  autoCapitalize="none"
  autoCorrect={false}
  
  onChangeText={(text)=>setEStado(text)}/>
  </View>
  <View style={styles.input}>
  <TextInput value={habitantes.toString()}
  placeholder="Informe os habitantes: "
  autoCapitalize="none"
  autoCorrect={false}
  
  onChangeText={text => setHabitantes(text ? parseInt(text, 10) : 0)} />
  </View>
  
  
  <ThemedView style={styles.footer}>
  <Button label="Save" iconame='save' theme="primary" onPress=
  {handleClick}/>
  </ThemedView>
  </ThemedView>


  </ModalScreen>
  )
  }
  const styles = StyleSheet.create({
    container: {
    justifyContent: "center",
    alignItems: 'flex-start',
    padding: 10,
    gap: 8,
    },
    footer: {
    alignSelf: 'center',
    },
    input: {
    backgroundColor: "white",
    borderBottomWidth: 1,
    marginBottom: 6,
    padding: 6,
    width:"100%",
    },
    id: {
    color: "grey",
    margin: 10,
    },
    });