import { ThemedText } from '@/src/cp/ThemedText';
import { ThemedView } from '@/src/cp/ThemedView';
import { DZSQLiteSelect, DZSQLiteDelete } from '@/src/db/drizzlesqlite';
import { usersTable } from '@/src/db/schema';
import { TUserAttr } from '@/src/model/user';
import { useContextUser, UserActionTypes } from '@/src/state/user';
import { useEffect } from 'react';
import { FlatList, View, Button } from 'react-native';
import { eq } from 'drizzle-orm';

type UserListScreenProps = {
  onEditUser: (user: TUserAttr) => void;  
};

export function UserListScreen({ onEditUser }: UserListScreenProps) {
  const { state, dispatch } = useContextUser();

  const handleDelete = async (userId: string) => {
    DZSQLiteDelete(usersTable, eq(usersTable.id, userId));
    dispatch({ type: UserActionTypes.DELETE_USER, payload: userId });
  };

  const ItemRenderer = ({ item }: { item: TUserAttr }) => (
    <ThemedView style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
      <ThemedView>
        <ThemedText type="defaultSemiBold"><ThemedText>Cidade:</ThemedText>{item.cidade}</ThemedText>
        <ThemedText type="default"><ThemedText>Estado:</ThemedText>{item.estado}</ThemedText>
        <ThemedText type="default"><ThemedText>Habitantes:</ThemedText>{item.habitantes}</ThemedText>
      </ThemedView>
      <View style={{ flexDirection: "row" }}>
        <Button title="Editar" onPress={() => onEditUser(item)} />
        <Button title="Excluir" onPress={() => handleDelete(item.id)} />
      </View>
    </ThemedView>
  );

  const separator = () => <Divider width={1} color="#848483" />;

  const handleEmpty = () => <ThemedText type="defaultSemiBold">Sem cidades cadastradas</ThemedText>;

  useEffect(() => {
    const fetchData = async () => {
      const data = await DZSQLiteSelect<TUserAttr>(usersTable);
      dispatch({ type: UserActionTypes.ADD_USER, payload: [...data] });
    }
    fetchData();
  }, []);

  return (
    <ThemedView>
      <FlatList
        data={state.users}
        renderItem={({ item }) => <ItemRenderer item={item} />}
        ItemSeparatorComponent={separator}
        ListEmptyComponent={handleEmpty}
        keyExtractor={item => item.id}
      />
    </ThemedView>
  );
}

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
