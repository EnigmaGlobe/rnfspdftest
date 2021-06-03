/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React,{useState,useEffect} from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  PermissionsAndroid,
  StatusBar,
  StyleSheet,
  Button,
  Text,
  useColorScheme,
  View,
} from 'react-native';
var RNFS = require('react-native-fs');

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import DocumentPicker from 'react-native-document-picker';


const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const [startPDFSelect, setStartPDFSelect] = useState(false)


  useEffect(() => {


      console.log("start startPDFSelect ",startPDFSelect)


      async function initiatePDF (){
        try {
          let read = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE)
          let write = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE)
          console.log("read write ", read, write)

          const res = await DocumentPicker.pick({
            type: [DocumentPicker.types.pdf],
          });
          console.log("selected res ", res)

          let stat = await RNFS.stat(res.uri)
          console.log("selected stat ", stat)

          let read2 = await RNFS.readFile(stat.originalFilepath)

        } catch (err) {
          if (DocumentPicker.isCancel(err)) {
            // User cancelled the picker, exit any dialogs or menus and move on
          } else {
            throw err;
          }
        }
      }

      initiatePDF()
  },[startPDFSelect])

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };


  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>

          <Button title="start" onPress={()=> setStartPDFSelect(true)}/>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
