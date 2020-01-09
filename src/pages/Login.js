import React, { useState } from 'react';
import { View, AsyncStorage, KeyboardAvoidingView, Text, Image, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

import api from '../services/api';

import logo from '../assets/logo-itavitrine.png';

export default function Login({ navigation }){
    const [email, setEmail] = useState();
    const [cate, setCate] = useState();

    async function handleSubmit(){
        //email, categorias
        const response = await api.post('/sessions', {email})
        //recupera o id do usuário de dentro do response.data 
        const {_id} = response.data;
         
        await AsyncStorage.setItem('user', _id);
        await AsyncStorage.setItem('cate', cate);

        navigation.navigate('List');
    }

    return <KeyboardAvoidingView  behavior="padding" style={styles.container}>
        
        <Image  source={logo} />
    
        <View style={styles.form}  >
            <Text style={styles.label}> SEU E-MAIL * </Text>
            <TextInput 
                style={styles.input}
                placeholder="Seu e-mail"
                placeholderTextColor="#999"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                value={email}
                onChangeText={setEmail}
            />
            <Text style={styles.label}> CATEGORIAS * </Text>
            <TextInput 
                style={styles.input}
                placeholder="Categorias de interesse"
                placeholderTextColor="#999"
                autoCapitalize="words"
                autoCorrect={false}
                value={cate}
                onChangeText={setCate}
            />
            <TouchableOpacity onPress={handleSubmit}  style={styles.button}>
                <Text style={styles.buttonText}>Encontrar Promoção</Text>
            </TouchableOpacity>
        </View>
        
    </KeyboardAvoidingView>

}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        
    },
    form:{
        alignSelf: 'stretch',
        paddingHorizontal: 30,
        marginTop: 30,

    },
    label:{
        fontWeight:'bold',
        color:'#444',
        marginBottom: 8,
    },
    input:{
        borderWidth:1,
        borderColor:'#ddd',
        paddingHorizontal:40,
        fontSize:16,
        color: '#444',
        height:44,
        marginBottom:20,
        borderRadius: 30
    },
    button:{
        height:42,
        backgroundColor:'#FEC63E',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:30
    },
    buttonText:{
        color:'#2E2921',
        fontWeight:'bold',
        fontSize:16
    }
})