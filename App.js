import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image, ScrollView, FlatList, TextInput, Alert, AppState } from 'react-native';
import * as IntentLauncher from 'expo-intent-launcher';

export default function App() {
  const [appState, setAppState] = useState(AppState.currentState);
  const [screen, setScreen] = useState('setup'); 
  const [pin, setPin] = useState('');
  const [inputPin, setInputPin] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      setAppState(nextAppState);
    });
    return () => subscription.remove();
  }, []);

  const suggestions = [
    { id: '1', name: 'Settings', url: 'https://img.icons8.com' },
    { id: '2', name: 'Notes', url: 'https://img.icons8.com' },
    { id: '3', name: 'Files', url: 'https://img.icons8.com' },
    { id: '4', name: 'Weather', url: 'https://img.icons8.com' },
    { id: '5', name: 'Calculator', url: 'https://img.icons8.com' },
  ];

  const phoneApps = [
    { id: 'a1', name: 'YouTube', package: 'com.google.android.youtube', icon: 'https://img.icons8.com' },
    { id: 'a2', name: 'Telegram', package: 'org.telegram.messenger', icon: 'https://img.icons8.com' },
    { id: 'a3', name: 'WhatsApp', package: 'com.whatsapp', icon: 'https://img.icons8.com' },
    { id: 'a4', name: 'Instagram', package: 'com.instagram.android', icon: 'https://img.icons8.com' },
    { id: 'a5', name: 'Chrome', package: 'com.android.chrome', icon: 'https://img.icons8.com' },
  ];

  const filteredApps = phoneApps.filter(app => app.name.toLowerCase().includes(search.toLowerCase()));

  if (appState !== 'active') {
    return <View style={{flex: 1, backgroundColor: '#000'}} />;
  }

  if (screen === 'setup') {
    return (
      <View style={styles.lockContainer}>
        <Text style={styles.lockTitle}>CREATE ACCESS PIN</Text>
        <TextInput style={styles.pinInput} placeholder="4-Digit PIN" placeholderTextColor="#001D3D55" secureTextEntry keyboardType="numeric" onChangeText={(t) => setPin(t)}/>
        <TouchableOpacity style={styles.actionBtn} onPress={() => {if(pin.length>=4) setScreen('main'); else Alert.alert('Error','PIN must be 4 digits')}}>
          <Text style={styles.btnText}>SET PIN</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
         <TouchableOpacity onPress={() => setScreen('setup')}><Text style={{color: '#001D3D', fontWeight: 'bold'}}>Reset</Text></TouchableOpacity>
         <View style={styles.tutorialBtn}><Text style={styles.btnText}>Tutorial</Text></View>
      </View>
      <ScrollView contentContainerStyle={{padding: 20}}>
        <View style={styles.topSection}>
          <TouchableOpacity style={styles.addBtn}><Text style={{fontSize: 30, color: '#001D3D'}}>+</Text></TouchableOpacity>
          <FlatList
            horizontal showsHorizontalScrollIndicator={false}
            data={suggestions}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.suggestItem}>
                <Image source={{ uri: item.url }} style={styles.suggestIcon} />
                <Text style={styles.suggestText}>{item.name}</Text>
              </View>
            )}
          />
        </View>
        <TextInput style={styles.searchBar} placeholder="Search All Apps..." placeholderTextColor="#001D3D88" onChangeText={(t) => setSearch(t)}/>
        {filteredApps.map((app) => (
          <TouchableOpacity key={app.id} style={styles.appRow} onPress={() => Alert.alert("Disguise Mode", app.name + " selected")}>
            <Image source={{ uri: app.icon }} style={styles.appRowIcon} />
            <Text style={styles.appName}>{app.name}</Text>
            <View style={styles.circle} />
          </TouchableOpacity>
        ))}
        <TouchableOpacity style={styles.saveBtn} onPress={() => Alert.alert("Success", "Shortcut Created on Home Screen")}><Text style={styles.btnText}>CONFIRM DISGUISE</Text></TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#E9C46A' },
  lockContainer: { flex: 1, backgroundColor: '#F4A261', justifyContent: 'center', alignItems: 'center' },
  lockTitle: { color: '#001D3D', fontSize: 18, fontWeight: 'bold', marginBottom: 20 },
  pinInput: { width: '60%', borderBottomWidth: 2, borderColor: '#001D3D', color: '#001D3D', textAlign: 'center', fontSize: 22, marginBottom: 30 },
  actionBtn: { backgroundColor: '#001D3D', paddingVertical: 12, paddingHorizontal: 40, borderRadius: 25 },
  header: { height: 90, backgroundColor: '#F4A261', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', padding: 15 },
  tutorialBtn: { backgroundColor: '#001D3D', padding: 6, borderRadius: 10 },
  btnText: { color: '#E9C46A', fontWeight: 'bold' },
  topSection: { flexDirection: 'row', alignItems: 'center', marginVertical: 15 },
  addBtn: { width: 65, height: 65, borderRadius: 15, borderWidth: 1, borderColor: '#001D3D', borderStyle: 'dashed', justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  suggestItem: { marginRight: 15, alignItems: 'center' },
  suggestIcon: { width: 50, height: 50, borderRadius: 12, backgroundColor: '#001D3D' },
  suggestText: { color: '#001D3D', fontSize: 9, marginTop: 5, fontWeight: '600' },
  searchBar: { backgroundColor: '#FFFFFF55', borderRadius: 12, padding: 15, color: '#001D3D', marginBottom: 15, borderWidth: 1, borderColor: '#001D3D' },
  appRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F4A261', padding: 12, borderRadius: 15, marginBottom: 8 },
  appRowIcon: { width: 35, height: 35, borderRadius: 8, marginRight: 12 },
  appName: { color: '#001D3D', fontSize: 14, flex: 1, fontWeight: 'bold' },
  circle: { width: 18, height: 18, borderRadius: 9, borderWidth: 2, borderColor: '#001D3D' },
  saveBtn: { backgroundColor: '#001D3D', padding: 18, borderRadius: 15, alignItems: 'center', marginTop: 15 }
});
