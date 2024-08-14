import { StyleSheet, Text, View,TextInput } from 'react-native'
import React from 'react'

const CustomFormFIeld = ({signUpDetails,name,value,placeHolder,handleInputDetails,HeadName}) => {
  return (
    <View style={styles.mainViewWrapper}>
        <Text style={styles.inputName}>{HeadName}</Text>
        <View style={styles.InputView}>
            <TextInput 
                onChangeText={(text)=>handleInputDetails(text,name)}
                value={value}
                placeholder={placeHolder}
                style={styles.textInput}
                placeholderTextColor="gray"
            />
        </View>
    </View>
  )
}

export default CustomFormFIeld

const styles = StyleSheet.create({
    InputView:{
        backgroundColor:"gray",
        height:65,
        justifyContent:"center",
        fontSize:17,
        borderRadius:10,
        overflow:"hidden"

    },
    mainViewWrapper:{
        width:"100%",
        justifyContent:"center",
        marginTop:20
    },
    inputName:{
        fontWeight:"bold",
        fontSize:16,
        color:"white",
        marginBottom:6,
        marginLeft:9
    },
    textInput:{
        flex:1,
        backgroundColor:"rgb(37, 37, 37)",
        fontSize:17,
        color:"white",
        padding:10,
        fontWeight:"500",
    }   
})