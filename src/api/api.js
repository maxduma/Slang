import * as axios from 'axios';
import firebase from 'firebase';

// instance
const instance = axios.create({
    baseURL: 'https://slang-16-default-rtdb.europe-west1.firebasedatabase.app/users/'
});

// get users
export const usersAPI = {
	putNewUser(uid, name, surname, email, gender, city, country) {
		return instance.put( `${uid}.json`, {
			    name: name,
			    surname: surname,
			    email: email,
			    uid: uid, 
			    gender: gender,
			    location: {city: city, country: country},
			    followed: false,
					urlPhoto: '',
			    status: '',
			    following: [''],
			    followers: [''],
          iLikePostsUids: [''],
			})
			.then(response => {
				return response.data});
	},
	getAllUsers()  {
		return instance.get( `.json`)
		.then(response => {
		return response.data});
	},
	getUser(userId) {
		return instance.get( `${userId}/.json`)
		.then(response => {
		return response.data});
	},
	patchNewFollowingUID(uid, newFollowing) {
		return instance.patch( `${uid}/.json`,
		{
			following:  newFollowing
		})
	},
	patchNewFollowersUID(uid, newFollowers) {
		return instance.patch( `${uid}/.json`,
		{
			followers:  newFollowers
		})
	},
  getILikePostsUids(uid) {
		return instance.get( `${uid}/iLikePostsUids/.json`)
    .then(response => {
      return response.data});
	},
  patchILikePostsUids(uid, newILikePostsUids) {
		return instance.patch( `${uid}/.json`,
		{
			iLikePostsUids: newILikePostsUids
		})
	},
}

export const authAPI = {
	createNewAccount(email, password)  {
		return firebase.auth().createUserWithEmailAndPassword(email, password)
			.then(res => {
						return res.user
			})
	},
	signIn(email, password)  {
		return 	firebase.auth().signInWithEmailAndPassword(email, password)
			.then(res => {
			return res
	})
	},
  //////////// check it
	logout()  {
		return 	firebase.auth().signInWithEmailAndPassword()
			.then(res => {
			return res.user
	})
	}
}

export const profileAPI = {
  getStatus(userId) {
    return instance.get(`${userId}/status/.json`)
  },
  patchStatus(myUid, newStatus) {
    return instance.patch(`${myUid}/.json`, {
      status: newStatus
    })

  }
}

export const myPostsAPI = {
  getPosts(userId) {
    return instance.get(`${userId}/posts/.json`)
    .then(response => {
      return response.data});
  },
  getPost(userId, postId) {
    return instance.get(`${userId}/posts/${postId}.json`)
    .then(response => {
      return response.data});
  },
  patchPost(postData, myUid) {
    return instance.put(`${myUid}/posts/${postData.postId}/.json`, {
      text: postData.text,
      isLike: postData.isLike,
      likesUid: postData.likesUid,
      data: postData.data,
      id: postData.postId
    })
  },
  deletePost(postId, myUid) {
    return instance.delete(`${myUid}/posts/${postId}/.json`)
  },
  getLikeCountUid(currentProfileUid, postId) {
    return instance.get( `${currentProfileUid}/posts/${postId}/likesUid/.json`)
    .then(response => {
      return response.data});
  },
  addNewLikeCountUid(currentProfileUid, postId, newLikesUid) {
		return instance.patch( `${currentProfileUid}/posts/${postId}/.json`,
		{
			likesUid:  newLikesUid
		})
	}



}
