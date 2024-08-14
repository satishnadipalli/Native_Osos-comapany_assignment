import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Profile = () => {
  return (
    <View>
      <Text style={styles.text}>Hello Iam profile</Text>
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({
  text:{
    marginTop:100
  }
})