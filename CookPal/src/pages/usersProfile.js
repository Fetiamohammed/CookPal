import React from 'react'
import {
    View,
    Text,
    FlatList,
    Image,
    StyleSheet,
    TouchableOpacity
} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome'
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
                <Icon
                    name="user"
                    style={styles.icon}
                    size={50}
                    color="rgb(16 185 129)"
                />
                {/* <Text style={styles.userName}>{user.name}</Text> */}
                <TouchableOpacity
                    style={styles.logoutButton}
                    onPress={handleLogout}
                >
                    <Text style={styles.logoutButtonText}>Log Out</Text>
                </TouchableOpacity>
            </View>
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
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        marginVertical: 20
    },
    // userName: {
    //     fontSize: 24,
    //     fontWeight: 'bold',
    //     marginLeft: 10
    // },
    logoutButton: {
        backgroundColor: '#ff6347',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 10
    },
    logoutButtonText: {
        color: '#fff',
        fontSize: 16
    },
    icon: {
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
    }
})

export default UsersProfile
// on this page, the user can see their favorite recipes and log out of their account.
//The user's favorites are fetched from the API using the useGetUserFavoritesQuery hook.
//The user can log out by dispatching the logout action and navigating to the Welcome screen.
//The user's favorites are displayed in a FlatList with each item showing the recipe image and name.
// more functionality will be added to this page in the future.
