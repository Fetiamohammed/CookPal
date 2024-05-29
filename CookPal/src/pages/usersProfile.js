import React from 'react'
import {
    View,
    Text,
    FlatList,
    Image,
    StyleSheet,
    TouchableOpacity
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { useGetUserFavoritesQuery } from '../store/api/UsersApi'
import { logout } from '../store/slice/authSlice'

const UsersProfile = () => {
    const user = useSelector((state) => state.auth.user)
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const {
        data: favorites,
        isLoading,
        isError
    } = useGetUserFavoritesQuery(user.email)

    const handleLogout = () => {
        dispatch(logout())
        navigation.navigate('Welcome')
    }

    if (isLoading) {
        return <Text>Loading favorites...</Text>
    }

    if (isError) {
        return <Text>Error loading favorites.</Text>
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.logoutButton}
                    onPress={handleLogout}
                >
                    <Text style={styles.logoutButtonText}>Log Out</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.profileSection}>
                <Image
                    source={require('../../assets/image/profile-image.jpg')}
                    style={styles.userImage}
                />
                <View style={styles.profileText}>
                    <Text style={styles.userName}>{user.name}</Text>
                    <TouchableOpacity>
                        <Icon
                            name="angle-down"
                            style={styles.arrowIcon}
                            size={20}
                            color="rgb(16 185 129)"
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <Text style={styles.title}>Your Favorite Recipes</Text>
            <FlatList
                data={favorites}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.favoriteItem}>
                        <Image
                            source={{ uri: item.image_url }}
                            style={styles.image}
                        />
                        <Text style={styles.recipeName}>{item.name}</Text>
                    </View>
                )}
            />
            {/* <View style={styles.addRecipe}>
                <Text style={styles.add}>Add New Recipes</Text>
                <TouchableOpacity>
                    <Icon name="plus" style={styles.plusIcon} size={20} color="rgb(16 185 129)" />
                </TouchableOpacity>
            </View> */}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(249, 250, 251)',
        padding: 20
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginBottom: 20
    },
    logoutButton: {
        backgroundColor: 'rgb(52 211 153)',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 10,
        marginTop: 20
    },
    logoutButtonText: {
        color: '#fff',
        fontSize: 16
    },
    profileSection: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
        backgroundColor: 'rgb(226 232 240)',
        borderRadius: 10
    },
    userImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10
    },
    profileText: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    userName: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    arrowIcon: {
        marginLeft: 5
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20
    },
    favoriteItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 10,
        marginRight: 10
    },
    recipeName: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    addRecipe: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20
    },
    add: {
        fontSize: 18,
        color: 'rgb(16 185 129)'
    },
    plusIcon: {
        marginLeft: 5
    }
})

export default UsersProfile
// on this page, the user can see their favorite recipes and log out of their account.
//The user's favorites are fetched from the API using the useGetUserFavoritesQuery hook.
//The user can log out by dispatching the logout action and navigating to the Welcome screen.
//The user's favorites are displayed in a FlatList with each item showing the recipe image and name.
// more functionality will be added to this page in the future.
