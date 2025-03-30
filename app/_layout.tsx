import { Suspense } from 'react';
import { ActivityIndicator, View, Text } from 'react-native';
import { Stack } from 'expo-router';
import { SQLiteProvider, openDatabaseSync } from 'expo-sqlite';
import { drizzle } from 'drizzle-orm/expo-sqlite';
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator';
import migrations from '@/drizzle/migrations';
import UserProvider from '@/src/state/user';
import { DATABASE_NAME } from '@/src/db/schema';
import { useDrizzleStudio } from "expo-drizzle-studio-plugin";


export default function RootLayout() {
  const expoDb = openDatabaseSync(DATABASE_NAME);
  const db = drizzle(expoDb);
  useDrizzleStudio(expoDb)
  const { success, error } = useMigrations(db, migrations);
  if (error) {
  return (
  <View>
  <Text>Migration error: {error.message}</Text>
  </View>
  );
  }
  if (!success) {
  return (
  <View>
  <Text>Migration is in progress...</Text>
  </View>
  );
  }
  return (
  <Suspense fallback={<ActivityIndicator size="large" />}>
  <SQLiteProvider databaseName={DATABASE_NAME}
  options={{ enableChangeListener: true }}
  useSuspense>
  <UserProvider>
  <Stack>
  <Stack.Screen name="(tabs)" options={{ headerShown: false}}/>
  </Stack>
  </UserProvider>
  </SQLiteProvider>
  </Suspense>
  );
}