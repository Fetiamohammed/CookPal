import { createApi } from '@reduxjs/toolkit/query/react'
import { addDoc, doc, collection, getDocs, updateDoc } from 'firebase/firestore'
import { db } from '../../../firebase-config'

const firebaseBaseQuery = async ({ baseUrl, url, method, body }) => {
    switch (method) {
        case 'GET': {
            const snapshot = await getDocs(collection(db, url))
            const data = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }))
            return { data }
        }
    }
}

const recipeApi = createApi({
    reducerPath: 'recipeApi',
    baseQuery: firebaseBaseQuery,
    tagTypes: ['Recipes'],
    endpoints: (builder) => ({
        getRecipesByCategory: builder.query({
            query: (category) => ({
                url: `recipes/categories/${category}`,
                method: 'GET'
            }),
            providesTags: ['Recipes']
        }),
        getRecipeById: builder.query({
            query: (recipeId) => ({
                url: `recipes/categories/${recipeId}`,
                method: 'GET'
            }),
            providesTags: ['Recipes']
        })
    })
})

export const { useGetRecipesByCategoryQuery, useGetRecipeByIdQuery } = recipeApi

export default recipeApi
