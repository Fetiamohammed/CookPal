import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../../../firebase-config';

export const usersApi = createApi({
    reducerPath: 'usersApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/' }),
    endpoints: (builder) => ({
        getUserFavorites: builder.query({
            queryFn: async (userEmail) => {
                try {
                    const userDocRef = doc(db, 'users', userEmail);
                    const userDocSnap = await getDoc(userDocRef);
                    if (userDocSnap.exists()) {
                        const userData = userDocSnap.data();
                        return { data: userData.favorites || [] };
                    } else {
                        return { error: 'User not found' };
                    }
                } catch (error) {
                    return { error: error.message };
                }
            },
        }),
        updateUserFavorites: builder.mutation({
            queryFn: async ({ userEmail, recipe }) => {
                try {
                    const userDocRef = doc(db, 'users', userEmail);
                    await updateDoc(userDocRef, {
                        favorites: arrayUnion({
                            id: recipe.id,
                            name: recipe.name,
                            image_url: recipe.image_file
                        })
                    });
                    return { data: 'Favorite updated successfully' };
                } catch (error) {
                    return { error: error.message };
                }
            },
        }),
    }),
});

export const { useGetUserFavoritesQuery, useUpdateUserFavoritesMutation } = usersApi;
