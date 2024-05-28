import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import categoriesData from '../../Categories.json'

const images = {
    Appetizers: require('../../assets/image/appetizers_category.jpg'),
    Main_dishes: require('../../assets/image/main_dishes_category.jpg'),
    Side_dishes: require('../../assets/image/side_dishes_category.jpg'),
    Desserts: require('../../assets/image/desserts_category.jpg'),
    Beverages: require('../../assets/image/beverages_category.jpg')
}

const CategoryList = ({ onSelectCategory }) => {
    const [selectedCategory, setSelectedCategory] = useState('appetizers')
    const handleCategoryPress = (category) => {
        const formattedCategory = category.toLowerCase().replace(/ /g, '_')
        setSelectedCategory(formattedCategory)
        onSelectCategory(formattedCategory)
    }

    useEffect(() => {
        onSelectCategory(selectedCategory)
    }, [])

    return (
        <ScrollView
            horizontal
            style={{ backgroundColor: '#f3f3f3', paddingVertical: 10 }}
        >
            {Object.keys(categoriesData.categories).map((categoryKey) => {
                const isActive = selectedCategory === categoryKey
                return (
                    <TouchableOpacity
                        key={categoryKey}
                        onPress={() => handleCategoryPress(categoryKey)}
                        style={{ marginRight: 10 }}
                    >
                        <View
                            style={{
                                width: 150,
                                height: 150,
                                position: 'relative',
                                alignItems: 'center'
                            }}
                        >
                            <Image
                                source={images[categoryKey]}
                                style={{
                                    width: '70%',
                                    height: '70%',
                                    borderRadius: 70,
                                    ...(isActive && {
                                        borderColor: 'green',
                                        borderWidth: 2
                                    })
                                }}
                            />
                            <View
                                style={{
                                    position: 'absolute',
                                    bottom: 5,
                                    left: 0,
                                    right: 0,
                                    paddingHorizontal: 5,
                                    paddingVertical: 2,
                                    borderRadius: 5,
                                    marginTop: 5
                                }}
                            >
                                <Text className="mt-1 text-dark text-base font-bold text-center border border-green-500">
                                    {categoryKey.replace(/_/g, ' ')}
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                )
            })}
        </ScrollView>
    )
}

export default CategoryList
// it is a component that renders a horizontal list of categories;
// it is used in the HomeScreen component;
