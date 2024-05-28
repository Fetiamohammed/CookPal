import React from 'react'
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import { useGetRecipesByCategoryQuery } from '../store/api/recipeApi'

const RecipeList = ({ selectedCategory, navigation }) => {
    console.log('Selected Category:', selectedCategory)

    const {
        data: recipes,
        isLoading,
        error
    } = useGetRecipesByCategoryQuery(selectedCategory)

    if (isLoading) {
        return <Text>Loading...</Text>
    }

    if (error) {
        return <Text>Error: {error.message}</Text>
    }

    return (
        <ScrollView>
            {recipes.map((recipe) => (
                <TouchableOpacity
                    key={recipe.id}
                    onPress={() =>
                        navigation.navigate('RecipeDetail', { recipe })
                    }
                >
                    <View className="max-w-sm rounded overflow-hidden shadow-lg m-4">
                        <Image
                            source={{ uri: recipe.image_file }}
                            style={{ width: '100%', height: 200 }}
                        />
                        <View className="px-6 py-4">
                            <Text className="font-bold text-xl mb-2">
                                {recipe.name}
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
            ))}
        </ScrollView>
    )
}

export default RecipeList
// it is a component that renders a list of recipes based on the selected category;
// it is used in the HomeScreen;
// it uses the useGetRecipesByCategoryQuery hook to fetch recipes by category;
// it renders a loading message while fetching recipes;
// and renders an error message if there is an error fetching recipes;
// it renders a list of recipes with their name and image;
// and navigates to the RecipeDetail screen when a recipe is pressed;
