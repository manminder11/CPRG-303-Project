import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, TextInput, View, Text,TouchableOpacity } from 'react-native';
import { Button } from 'react-native-web';

export default function App() {
  const[search,setSearch]=useState(true);
  const data = [
    { id: '1', name: 'Southern Alberta Institute of Technology' },
    { id: '2', name: 'COSCO' },
  ];
  const datasait = [
    { id: '1', name: 'SAIT 1' },
    { id: '2', name: 'SAIT 2' },
  ];
  const [text, setText] = React.useState('Where you park?');
  return (
    <View style={{flex:1,}}>
      <View style={{alignContent:'center',backgroundColor:'black'}}>
        <Text style={{fontSize:20,alignSelf:'center',color:'white'}}>Parking App</Text>
      </View>
      <View style={{flexDirection:'row',width: '100%',height: 40,}}>
        <TextInput
            style={{
              margin: 12,
              height: 40,
              borderWidth: 1,
              padding: 10,flex:7}}
            value={text}
            onChangeText={setText}
          />
          <View style={{flex:3,marginTop:10,padding: 7,}}>
            <Button color="black" title='Search' onPress={()=>setSearch(false)}/>
          </View>
         
      </View>

      <View style={{marginTop:'10%',marginLeft:10,flex:1}}>
      {
        search? data.map((item)=>(
          <View style={{borderBottomWidth: 2, borderColor: 'black',borderRadius: 1,flexDirection:'row'}} key={item.id}>
              <View style={{flex:8}}>
                <Text>{item.name}</Text>
              </View>
              <View style={{flex:2}}>
                <Text style={{marginLeft:1}}>Direction</Text>
              </View>
              

            </View>
        )):datasait.map((item)=>(
          <View style={{borderBottomWidth: 2, borderColor: 'black',borderRadius: 1,flexDirection:'row'}} key={item.id}>
              <View style={{flex:8}}>
                <Text style={styles.resultText}>{item.name}</Text>
              </View>
              <View style={{flex:2}}>
                <Text style={styles.resultText}>Direction</Text>
              </View>

            </View>))
      }
        
        
      </View>
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.button}>
          <Image
          style={{ width: 50,
            height: 50,}}
            source={require('./src/assets/home.png')}
          />
          <Text style={styles.buttonText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Image
            style={{ width: 50,
              height: 50,}}
              source={require('./src/assets/navigation.png')}
          />
          <Text style={styles.buttonText}>Navigation</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Image
            style={{ width: 50,
              height: 50,}}
              source={require('./src/assets/history.png')}
          />
          <Text style={styles.buttonText}>Activity</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Image
            style={{ width: 50,
              color:'white',
              height: 50,}}
              source={require('./src/assets/infor.png')}
          />
          <Text style={styles.buttonText}>About us</Text>
        </TouchableOpacity>
      </View>
     
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    color:'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0, // Stick to the bottom
    left: 0,
    right: 0,
    flexDirection: 'row',
    backgroundColor: 'black',
    padding: 10,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  button: {
    padding: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  resultText:{
    fontSize:16,
    fontWeight:'bold'
  }
});
