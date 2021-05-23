import { myPostsAPI, usersAPI } from "../../../api/api";
import { setLikeHome } from "../../../redux/home-reducer";
import { getMonth, getZero } from "../../../utils/helpers/helpers";

export const addPostFunction = (myUid, newPostText, addPostActionCreator, urlPhoto, name, surname) => {
    const Data = new Date();
    const postData = {
      text: newPostText,
      ownerPostUid: myUid,
      ownerPostUrlPhoto: urlPhoto,
      ownerPostName: name,
      ownerPostSurname: surname,
      postId: myUid + (Math.random() * 1000000000000000000),
      isLike: false,
      likesUid: [""],
      data: {
        day: getZero(Data.getDate()),
        month: getMonth(Data.getMonth()),
        year: getZero(Data.getFullYear()),
        hours: getZero(Data.getHours()),
        minutes: getZero(Data.getMinutes())
      }
  }
  //  patchPost
  myPostsAPI.patchPost(postData, myUid)
  // to dispatch
  addPostActionCreator(postData);
};

export const deletePostFunction = (postId, myUid, deletePostAC) => {
  //API
  myPostsAPI.deletePost(postId, myUid);
  //dispatch
  deletePostAC(postId);
}

export const addLikeFunction = (postId, ownerPostUid, myUid, setILikePostsUids, setLike) => {
  debugger
  //post likes (uids)
  myPostsAPI.getLikeCountUid(ownerPostUid, postId)
  .then(res => {
    const newLikesUid = res;
      // just one like
    const a = newLikesUid.some( id => {
      return id === myUid
    })
    if (!a) {
      newLikesUid.push(myUid)
    }
    myPostsAPI.addNewLikeCountUid(ownerPostUid, postId, newLikesUid)

      // I like post list
    usersAPI.getILikePostsUids(myUid)
    .then(res => {
      const newILikePostsUids = res;
      // do not push the same uid
    const a = newILikePostsUids.some( id => {
      return id === postId
    })
    if (!a) {
      newILikePostsUids.push(postId)
    }
      usersAPI.patchILikePostsUids(myUid, newILikePostsUids)

      setILikePostsUids(newILikePostsUids); 
    })

    // dispatch
    myPostsAPI.getPost(ownerPostUid, postId)
    .then(res => {
      const post = res;
      post.isLike = true;
      const a = post.likesUid.some( uid => {
        return uid === myUid
      })
      if (!a) {
        post.likesUid.push(myUid)
      }
      setLike(postId, post);
      setLikeHome(postId, post);
    })
  })
}

export const removeLikeFunction = (postId, ownerPostUid, myUid, setILikePostsUids, setLike) => {
  //post likes (uids)
  myPostsAPI.getLikeCountUid(ownerPostUid, postId)
  .then(res => {
    const newLikesUid = res;
    myPostsAPI.addNewLikeCountUid(ownerPostUid, postId, newLikesUid.filter(l => l !== myUid))
    })

  // I like post list
  usersAPI.getILikePostsUids(myUid)
  .then(res => {
  const newILikePostsUids = res;
  usersAPI.patchILikePostsUids(myUid, newILikePostsUids.filter(id => id !== postId))
  setILikePostsUids(newILikePostsUids.filter(id => id !== postId));
  })

  // dispatch
  myPostsAPI.getPost(ownerPostUid, postId)
  .then(res => {
    const post = res;
    post.isLike = false;
    const newPost = [];
    post.likesUid.map(id => {
      if (id !== myUid) {
        newPost.push(id);
      }
    })
    post.likesUid = newPost;
    setLike(postId, post); 
    setLikeHome(postId, post);
  })
}