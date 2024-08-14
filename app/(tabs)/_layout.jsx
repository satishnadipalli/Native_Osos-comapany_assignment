import { StyleSheet, Text, View,Image, NativeEventEmitter } from 'react-native'
import React from 'react'
import { Stack, Tabs } from 'expo-router'
import {icons}  from "../../constants"

const TabIcon = ({icon,name,color,focused}) =>{
    return(
        <View style={styles.tabview}>
            <Image 
                source={icon}
                resizeMode='contain'
                tintColor={color}
                style={styles.tabone}
            />
            <Text style={focused ? styles.tabnameFocused  :styles.tabname } >{name}</Text>
        </View>
    )
}



const _layout = () => {
    
  return (
    <Tabs 
        screenOptions={{
            tabBarShowLabel:false,
            headerShown:false,
            tabBarActiveTintColor:"#FFA001",
            tabBarInactiveTintColor:"#CDCDE0",
            tabBarStyle:{
                borderTopWidth:1,
                backgroundColor:"#161622",
                borderTopColor:"#232533",
                height:80 
            }
        }}
    >
        <Tabs.Screen 
            name='Home'
            options={{
                title : "Home",
                headerShown:false,
                tabBarIcon:({color,focused})=>{
                    return(
                        <TabIcon
                        icon = {icons.home}
                        color = {color}
                        name = "Home"
                        focused = {focused}
                    />
                    )
                }

            }} 
        />

        <Tabs.Screen
            name='Cart' // This is the Routes name 
            options={{
                title:"Cart", // This is the name of the tab
                headerShown:false,
                tabBarIcon:({color,focused})=>{
                    return(
                        <TabIcon
                            color={color}
                            focused={focused}
                            icon={icons.bookmark}
                            name="Cart"
                        />
                    )
                }
            }}
        />

        <Tabs.Screen 
            name="create"
            options={{
                title:"create",
                headerShown:false,
                tabBarIcon:({color,focused})=>{
                    return(
                        <TabIcon
                            color={color}
                            focused={focused}
                            icon = {icons.plus}
                            name="create"
                        />
                    )
                }
            }}
        />

        <Tabs.Screen 
            name="Profile"
            options={{
                title:"Profile",
                headerShown:false,
                tabBarIcon:({color,focused})=>{
                    return(
                        <TabIcon
                            color={color}
                            focused={focused}
                            icon = {icons.profile}
                            name="profile"
                        />
                    )
                }
            }}
        />
        
    </Tabs>
  )
}

export default _layout

const styles = StyleSheet.create({
    tabone:{
        width:20,
        height:20
    },
    tabname:{
        fontWeight:"normal",
        color:"gray"
    },
    tabnameFocused:{
        color:"#FFA001",
        fontSize:16,
        fontWeight:"bold",
    },  
    tabview:{
        justifyContent:"center",
        alignItems:"center",
        width:900,
    }
})