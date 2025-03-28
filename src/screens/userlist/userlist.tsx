import { ThemedText } from '@/src/cp/ThemedText';
import { ThemedView } from '@/src/cp/ThemedView';
import { DZSQLiteSelect, DZSQLiteDelete, DZSQLiteUpdate } from '@/src/db/drizzlesqlite';
import { usersTable } from '@/src/db/schema';
import { TUserAttr } from '@/src/model/user';
import { useContextUser, UserActionTypes } from '@/src/state/user';
import { useEffect, useState } from 'react';
import { FlatList, View, TextInput, StyleSheet, Text } from 'react-native';
import { eq } from 'drizzle-orm';
import { Button } from '@/src/cp/Button';
import ModalScreen from '@/src/cp/ModalScreen';

type UserListProps = {
    user: TUserAttr;
};

export function UserListScreen() {
    const { state, dispatch } = useContextUser();
    const [modalVisible, setModalVisible] = useState(false);
    const [userToEdit, setUserToEdit] = useState<TUserAttr | null>(null);
    const [cidade, setCidade] = useState('');
    const [estado, setEstado] = useState('');
    const [habitantes, setHabitantes] = useState(0);

    const separator = () => {
        return <Divider width={1} color="#848483" />;
    };

    const handleEmpty = () => {
        return <ThemedText type="defaultSemiBold">Nenhuma cidade cadastrada</ThemedText>;
    };

    const handleDeleteUser = async (userToDelete: TUserAttr) => {
        try {
            await DZSQLiteDelete(usersTable, eq(usersTable.id, userToDelete.id));
            dispatch({ type: UserActionTypes.DELETE_USER, payload: userToDelete });
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const handleEditUser = (user: TUserAttr) => {
        setUserToEdit(user);
        setCidade(user.cidade);
        setEstado(user.estado);
        setHabitantes(user.habitantes)
        setModalVisible(true);
    };

    const handleUpdateUser = async () => {
        try {
            if (userToEdit) {
                await DZSQLiteUpdate(usersTable, { cidade, estado, habitantes }, eq(usersTable.id, userToEdit.id));
                dispatch({ type: UserActionTypes.UPDATE_USER, payload: { ...userToEdit, cidade, estado, habitantes } });
            }
            setModalVisible(false);
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    const handleCloseModal = () => {
        setModalVisible(false);
    };

    useEffect(() => {
        const fetchData = async () => {
            const data = await DZSQLiteSelect<TUserAttr>(usersTable);
            dispatch({ type: UserActionTypes.ADD_USER, payload: [...data] });
        };
        fetchData();
    }, []);

  const ItemRenderer = ({ user }: UserListProps) => {
    return (
        <ThemedView key={user.id}>
            <View>
                <ThemedText type="defaultSemiBold">{user.cidade}</ThemedText>
                <ThemedText type="default">{user.estado}</ThemedText>
                <ThemedText type="default">Habitantes: {user.habitantes}</ThemedText>
            </View>

            <View>
                <Button label="Edit" onPress={() => handleEditUser(user)}  />
                <Button label="Delete" onPress={() => handleDeleteUser(user)} />
            </View>
        </ThemedView>
    );
};

    return (
        <ThemedView>
            <FlatList
                data={state.users}
                renderItem={({ item }) => <ItemRenderer user={item} />}
                ItemSeparatorComponent={separator}
                ListEmptyComponent={handleEmpty}
                keyExtractor={(item) => item.id}
            />

            <ModalScreen isVisible={modalVisible} onClose={handleCloseModal} title="Editar Cidade">
                <ThemedView style={styles.container}>
                    <View style={styles.input}>
                        <TextInput value={cidade} placeholder="Informe cidade: " onChangeText={setCidade} />
                    </View>
                    <View style={styles.input}>
                        <TextInput value={estado} placeholder="Informe estado: " onChangeText={setEstado} />
                    </View>
                    <View style={styles.input}>
                        <TextInput value={habitantes.toString()} placeholder="Informe habitantes: " onChangeText={text => setHabitantes(text ? parseInt(text, 10) : 0)} />
                    </View>
                    <ThemedView style={styles.footer}>
                        <Button label="Update" onPress={handleUpdateUser} />
                    </ThemedView>
                </ThemedView>
            </ModalScreen>
        </ThemedView>
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
});

interface DividerProps {
    width?: number;
    orientation?: 'horizontal' | 'vertical';
    color?: string;
    dividerStyle?: any;
}

const Divider: React.FC<DividerProps> = ({
    width = 1,
    orientation = 'horizontal',
    color = '#DFE4EA',
    dividerStyle,
}) => {
    const dividerStyles = [
        { width: orientation === 'horizontal' ? '100%' : width },
        { height: orientation === 'vertical' ? '100%' : width },
        { backgroundColor: color },
        dividerStyle,
    ];
    return <View style={dividerStyles} />;
};