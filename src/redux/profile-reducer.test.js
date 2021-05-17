import profileReducer, { addPostActionCreator } from "./profile-reducer";
import React from 'react';

import { render, screen } from '@testing-library/react';

it('length of post should be incremented', () => {
  // 1. data
  const action = addPostActionCreator("it");
  const state = {
    posts: [
      {text: 'Hi, how are you?', likeCount: 75, id: 11},
      {text: 'Hi, how weather', likeCount: 36, id: 2}
    ],
    profile: {
      name: '',
      surname: '',
      email: '',
      followed: false,
      location: {
        country: '',
        city: ''
      },
      urlPhoto: '',
      gender: '',
      uid: null,
      status: '',
      following: [''],
      followers: [''],
    }
}
  // 2. action
  const newState = profileReducer({state}, action);

  // 3. expectation
  expect(newState.posts.length).toBe(5);
});


