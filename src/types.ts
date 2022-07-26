export type UserType = {
  name: string
  surname: string
  email: string
  followed: boolean
  followers: Array<string>
  following: Array<string>
  gender: string
  iLikePostsUids: Array<string>
  location: {
    city: string
    country: string
  }
  personalInformation: {
    education: string
    hobby: string
    job: string
  }
  posts: {
    data: {
      day: string
      hours: string
      minutes: string
      month: string
      year: string
    }
    isLike: string
    likesUid: Array<string>
    ownerPostName: string
    ownerPostSurname: string
    ownerPostUid: string
    ownerPostUrlPhoto: string
    postId: string
  }
  status: string
  uid: string
  urlPhoto: string
}