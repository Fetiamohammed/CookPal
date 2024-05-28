import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { useSelector } from 'react-redux';
import { db } from '../../firebase-config';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { Rating } from 'react-native-ratings';

export default function UsersRating({ categoryId, recipeId }) {
  const [averageRating, setAverageRating] = useState(0);
  const [userRating, setUserRating] = useState(0);
  const userEmail = useSelector((state) => state.auth.user.email);

  useEffect(() => {
    const fetchRatings = async () => {
      const recipeDocRef = doc(db, 'recipes', 'categories', categoryId, recipeId);
      const recipeDocSnap = await getDoc(recipeDocRef);

      if (recipeDocSnap.exists()) {
        const data = recipeDocSnap.data();
        const ratings = data.rating || {};
        const ratingValues = Object.values(ratings).map(r => r.value);
        const total = ratingValues.reduce((sum, value) => sum + value, 0);
        setAverageRating(total / ratingValues.length || 0);

        const userRating = ratings[userEmail]?.value || 0;
        setUserRating(userRating);
      }
    };

    fetchRatings();
  }, [categoryId, recipeId, userEmail]);

  const handleRatingCompleted = async (rating) => {
    const recipeDocRef = doc(db, 'recipes', 'categories', categoryId, recipeId);
    const recipeDocSnap = await getDoc(recipeDocRef);

    if (recipeDocSnap.exists()) {
      const data = recipeDocSnap.data();
      const ratings = data.rating || {};

      ratings[userEmail] = { value: rating };

      await updateDoc(recipeDocRef, { rating: ratings });

      const ratingValues = Object.values(ratings).map(r => r.value);
      const total = ratingValues.reduce((sum, value) => sum + value, 0);
      setAverageRating(total / ratingValues.length);
      setUserRating(rating);
    } else {
      Alert.alert('Error', 'Recipe not found');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Average Rating: {averageRating.toFixed(1)}</Text>
      <Rating
        showRating
        startingValue={userRating}
        imageSize={30}
        onFinishRating={handleRatingCompleted}
        style={styles.rating}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 20,
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
  rating: {
    paddingVertical: 10,
  },
});
// this is a component that renders a rating system for users to rate a recipe
//it receives the recipe id and category id as props;
//it will allows the user to rate the recipe and updates the database with the new rating;
//it is not completed yet;
