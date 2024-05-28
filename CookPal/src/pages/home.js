import React, { useState } from 'react'
import { View, Text, TextInput, ScrollView, Image } from 'react-native'
import CategoryList from '../component/CategoryList'
import SearchBar from '../component/SearchBar'
import RecipeList from '../component/RecipeList'

export default function Home({ navigation }) {
    const [selectedCategory, setSelectedCategory] = useState(null)

    const handleCategorySelect = (category) => {
        setSelectedCategory(category)
    }

    return (
        <View className="flex-1 px-4 pt-16">
            <Text className="text-3xl font-bold mb-6 text-green-500">
                Explore <Text className="text-black">Recipes</Text>
            </Text>
            <SearchBar />
            <View className="pb-4">
                <CategoryList onSelectCategory={handleCategorySelect} />
            </View>

            <RecipeList
                selectedCategory={selectedCategory}
                navigation={navigation}
            />
        </View>
    )
}
// it is a screen that renders a search bar, a category list, and a list of recipes;
