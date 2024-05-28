import { View, TextInput } from 'react-native'
import React from 'react'

export default function SearchBar() {
  return (
    <View>
      <TextInput
        className="h-10 border border-gray-400 rounded-md px-4 mb-6"
        placeholder="Search recipes..."
      />
    </View>
  )
}
// it is a component that renders a search bar for searching recipes by key word;
// it is used in the HomeScreen component;
//this is not completed yet. I will add more features to it later.
