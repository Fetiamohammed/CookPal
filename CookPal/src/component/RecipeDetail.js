import React from 'react'
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Alert
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { useSelector } from 'react-redux'
import { doc, updateDoc, arrayUnion } from 'firebase/firestore'
import { db } from '../../firebase-config'
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import UsersRating from './UsersRating'
const RecipeDetail = ({ route }) => {
    const { categoryId, recipe } = route.params
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const user = useSelector((state) => state.auth.user)

    const handleAddToFavorites = async () => {
        if (!user) {
            Alert.alert('Error', 'You must be logged in to add favorites.')
            return
        }

        if (!recipe.id) {
            Alert.alert('Error', 'Invalid recipe details.')
            return
        }

        const userDocRef = doc(db, 'users', user.email)

        try {
            await updateDoc(userDocRef, {
                favorites: arrayUnion({
                    id: recipe.id,
                    name: recipe.name,
                    image_url: recipe.image_file
                })
            })
            // Alert.alert('Success', 'Recipe added to favorites!')
            navigation.navigate('Profile')
        } catch (error) {
            console.error('Error adding recipe to favorites: ', error)
            Alert.alert('Error', 'Failed to add recipe to favorites.')
        }
    }

    return (
        <ScrollView style={styles.container}>
            <Image
                source={{ uri: recipe.image_file }}
                className="w-full h-72"
            />
            <View className=" bg-gray-50 -mt-4 rounded-t-3xl w-full h-fit">
                <View style={styles.section}>
                    <Text style={styles.header}>{recipe.categories}</Text>
                    <Text className="text-green-500 font-bold text-2xl">
                        {recipe.name}
                    </Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.header}>Ingredients</Text>
                    <Text style={styles.content}>{recipe.ingredients}</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.header}>Preparation</Text>
                    <Text style={styles.content}>{recipe.instructions}</Text>
                </View>
            </View>

            <TouchableOpacity
                style={styles.favoriteButton}
                onPress={handleAddToFavorites}
            >
                <Icon name="plus" size={20} color="#fff" />
                <Text style={styles.favoriteButtonText}>Add to favorites</Text>
            </TouchableOpacity>
            <View style={{ flex: 1, padding: 20 }}>
                <UsersRating categoryId={categoryId} recipeId={recipe} />
            </View>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(249 250 251)'
    },
    image: {
        width: '70%',
        height: '70%',
        borderRadius: 20,
        marginLeft: 50,
        marginTop: 100,
        marginBottom: 50,
        marginRight: 30
    },
    favoriteButton: {
        flexDirection: 'row',
        backgroundColor: '#4CAF50',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        alignSelf: 'center',
        marginTop: 15,
        zIndex: 1
    },
    favoriteButtonText: {
        color: '#fff',
        marginLeft: 10
    },
    section: {
        padding: 20
    },
    header: {
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 10
    },
    content: {
        fontSize: 16,
        color: '#2c3338'
    }
})

export default RecipeDetail
// this is a component that renders the details of a recipe
// it is used in the RecipeDetailScreen component
// it displays the image, name, ingredients, and preparation of the recipe
// it also allows users to add the recipe to their favoritesand to rate the recipe.
