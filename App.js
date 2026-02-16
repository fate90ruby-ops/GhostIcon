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
        <TextInput style={styles.pinInput} placeholder="4-Digit PIN" placeholderTextColor="#001D3D55" secureTextEntry keyboardType="numeric" onChangeText={setPin}/>
        <TouchableOpacity style={styles.actionBtn} onPress={() => {if(pin.length>=4) setScreen('main'); else Alert.alert('Error','Short PIN')}}>
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
        <TextInput style={styles.searchBar} placeholder="Search All Apps..." placeholderTextColor="#001D3D88" onChangeText={setSearch}/>
        {filteredApps.map((app) => (
          <TouchableOpacity key={app.id} style={styles.appRow} onPress={() => Alert.alert("Success", app.name + " Disguised!")}>
            <Image source={{ uri: app.icon }} style={styles.appRowIcon} />
            <Text style={styles.appName}>{app.name}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity style={styles.saveBtn}><Text style={styles.btnText}>CONFIRM DISGUISE</Text></TouchableOpacity>
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
  searchBar: { backgroundColor: '#FFFFFF55', borderRadius: 12, padding: 15, color: '#001D3D', marginBottom: 15, borderWidth: 1, borderColor: '#001D3D' },
  appRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F4A261', padding: 12, borderRadius: 15, marginBottom: 8 },
  appRowIcon: { width: 40, height: 40, borderRadius: 8, marginRight: 12 },
  appName: { color: '#001D3D', fontSize: 14, flex: 1, fontWeight: 'bold' },
  saveBtn: { backgroundColor: '#001D3D', padding: 18, borderRadius: 15, alignItems: 'center', marginTop: 15 }
});
