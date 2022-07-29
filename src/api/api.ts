import axios from 'axios';
import firebase from 'firebase';

// instance
const instance = axios.create({
    baseURL: 'https://slang-16-default-rtdb.europe-west1.firebasedatabase.app/users/'
});

// get users
export const usersAPI = {
 putNewUser(uid: string, name: string, surname: string, email: string, gender: string, city: string, country: string) {
	return instance.put( `${uid}.json`, {
      name: name,
      surname: surname,
      email: email,
      uid: uid, 
      gender: gender,
      location: {city: city, country: country},
      personalInformation: {
        job: '',
        education: '',
        hobby: '',
      },
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
	getUser(userId: string) {
    return instance.get( `${userId}/.json`)
    .then(response => {
    return response.data});
	},
	patchNewFollowingUID(uid: string, newFollowing: string) {
    return instance.patch( `${uid}/.json`,
    {
      following:  newFollowing
    })
	},
	patchNewFollowersUID(uid: string, newFollowers: string) {
		return instance.patch( `${uid}/.json`,
		{
		 followers:  newFollowers
		})
	},
  getILikePostsUids(uid: string) {
		return instance.get( `${uid}/iLikePostsUids/.json`)
    .then(response => {
      return response.data});
	},
  patchILikePostsUids(uid: string, newILikePostsUids: string) {
		return instance.patch( `${uid}/.json`,
		{
			iLikePostsUids: newILikePostsUids
		})
	},
};

export const authAPI = {
	createNewAccount(email: string, password: string)  {
		return firebase.auth().createUserWithEmailAndPassword(email, password)
			.then(res => {
						return res.user
			})
	},
	signIn(email: string, password: string)  {
		return 	firebase.auth().signInWithEmailAndPassword(email, password)
			.then(res => {
			return res
	})
	},
	logout()  {
		return 	firebase.auth().signInWithEmailAndPassword()
			.then(res => {
			return res.user
	})
	}
};

export const profileAPI = {
  getStatus(userId: string) {
    return instance.get(`${userId}/status/.json`)
  },
  patchStatus(myUid: string, newStatus: string) {
    return instance.patch(`${myUid}/.json`, {
      status: newStatus
    })
  },
  // savePhoto(photoFile) {
  //   const formData = new FormData();
  //   formData.append("image", photoFile);

  //   return instance.post('profile/photo', formData, {
  //     headers: {
  //       'Content-Type': 'multipart/form-data'
  //     }
  //   });
  // },
  changeUrlPhoto(urlPhoto: string, myUid: string) {
      return instance.patch(`${myUid}/.json`, {
        urlPhoto: urlPhoto
      })
  },
  changeProfileData(formData: any, myUid: string) {
      return instance.patch(`${myUid}/.json`, {
        name: formData.name,
        surname: formData.surname,
        location: {
          country: formData.country,
          city: formData.city
        },
        personalInformation: {
          job: formData.job,
          education: formData.education,
          hobby: formData.hobby,
        },
      })
  },
};

export const myPostsAPI = {
  getPosts(userId: string) {
    return instance.get(`${userId}/posts/.json`)
    .then(response => {
      return response.data});
  },
  getPost(userId: string, postId: string) {
    return instance.get(`${userId}/posts/${postId}.json`)
    .then(response => {
      return response.data});
  },
  patchPost(postData: any, myUid: string) {
    return instance.put(`${myUid}/posts/${postData.postId}/.json`, {
      text: postData.text,
      isLike: postData.isLike,
      likesUid: postData.likesUid,
      data: postData.data,
      uidPostOwner: postData.uidPostOwner,
      postId: postData.postId,
      ownerPostUid: postData.ownerPostUid,
      ownerPostUrlPhoto: postData.ownerPostUrlPhoto,
      ownerPostName: postData.ownerPostName,
      ownerPostSurname: postData.ownerPostSurname,
    })
  },
  deletePost(postId: string, myUid: string) {
    return instance.delete(`${myUid}/posts/${postId}/.json`)
  },
  getLikeCountUid(currentProfileUid: string, postId: string) {
    return instance.get( `${currentProfileUid}/posts/${postId}/likesUid/.json`)
    .then(response => {
      return response.data});
  },
  addNewLikeCountUid(currentProfileUid: string, postId: string, newLikesUid: string) {
		return instance.patch( `${currentProfileUid}/posts/${postId}/.json`,
		{
			likesUid:  newLikesUid
		})
	}
};
