import { TUserAttr } from "@/src/model/user";
import { ThemedView } from "@/src/cp/ThemedView";
import { useState, useEffect } from "react";
import { StyleSheet, TextInput, View, Text } from 'react-native';
import { Button } from "@/src/cp/Button";
import { useContextUser, UserActionTypes } from "@/src/state/user";
import { DZSQLiteInsert, DZSQLiteUpdate } from "@/src/db/drizzlesqlite";
import { usersTable } from "@/src/db/schema";
import { User } from "@/src/model/user";
import { eq } from 'drizzle-orm';  
import ModalScreen from "@/src/cp/ModalScreen";

type RegisterProps = {
    visible: boolean,
    handleClose: () => void,
    userToEdit: TUserAttr | null,  
}

export function RegisterScreen({ visible, handleClose, userToEdit }: RegisterProps) {
    const { state, dispatch } = useContextUser();
    const [ID, setID] = useState("");
    const [cidade, setCidade] = useState("");
    const [estado, setEstado] = useState("");
    const [habitantes, setHabitantes] = useState("");

    useEffect(() => {
        if (userToEdit) {
            
            setID(userToEdit.id);
            setCidade(userToEdit.cidade);
            setEstado(userToEdit.estado);
            setHabitantes(userToEdit.habitantes.toString());
        } else {
            
            setID("");
            setCidade("");
            setEstado("");
            setHabitantes("");
        }
    }, [userToEdit]);

    const handleClick = async () => {
        if (userToEdit) {
            
            const updatedUser = { ...userToEdit, cidade, estado, habitantes: parseInt(habitantes, 10) };
            await DZSQLiteUpdate(usersTable, updatedUser, eq(usersTable.id, userToEdit.id));

            
            dispatch({
                type: UserActionTypes.ADD_USER,
                payload: state.users.map(user => user.id === userToEdit.id ? updatedUser : user),
            });
        } else {
            
            const newUser = new User(cidade, estado, parseInt(habitantes, 10));
            await DZSQLiteInsert(usersTable, newUser.data);
            setID(newUser.id);
            dispatch({ type: UserActionTypes.ADD_USER, payload: newUser.datacpy });
        }

        handleClose();
    };

    return (
        <ModalScreen isVisible={visible} onClose={handleClose} title={userToEdit ? "Editar Cidade" : "Registro de Cidade"}>
            <ThemedView style={styles.container}>
                <Text style={styles.id}>ID: {ID}</Text>
                <View style={styles.input}>
                    <TextInput
                        value={cidade}
                        placeholder="Informe a cidade"
                        autoCapitalize="none"
                        autoCorrect={false}
                        onChangeText={(text) => setCidade(text)} />
                </View>
                <View style={styles.input}>
                    <TextInput
                        value={estado}
                        placeholder="Informe o estado"
                        autoCapitalize="none"
                        autoCorrect={false}
                        onChangeText={(text) => setEstado(text)} />
                </View>
                <View style={styles.input}>
                    <TextInput
                        value={habitantes}
                        placeholder="Informe o número de habitantes"
                        keyboardType="numeric"
                        autoCorrect={false}
                        onChangeText={(text) => setHabitantes(text)} />
                </View>
                <ThemedView style={styles.footer}>
                    <Button label="Salvar" iconame='save' theme="primary" onPress={handleClick} />
                </ThemedView>
            </ThemedView>
        </ModalScreen>
    );
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
        width: "100%",
    },
    id: {
        color: "grey",
        margin: 10,
    },
});
