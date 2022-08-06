import React from 'react';
import { connect } from 'react-redux';
import { follow, setUsers, unfollow, setCurrentPage, setTotalUsersCount, toggleIsFetching, toggleIsFollowingProgress, getUsersThunkCreator } from '../../redux/users-reducer';
import { setFollowing, setNotMyFollowers } from '../../redux/auth-reducer';
import Users from './Users';
import Spinner from '../common/Spinner/Spinner';
import { usersAPI } from '../../api/api';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';
import { getPageSize, getUsers, getTotalUsersCount, getCurrentPage, getIsFetching, getCurrentUserDataUid, getCurrentUserDataFollowing, getNotMyFollowers, getIsFollowingInProgress, getPortionSize } from '../../redux/users-selectors';
import { UserType } from '../../types';
import { AppStateType } from '../../redux/redux-store';

type PropsType = {
  myUid: number
  currentPage: number
  pageSize: number
  following: number
  pageNumber: number
  getUsersThunkCreator: (myUid: number, currentPage: number,  pageSize: number, following: number, pageNumber: number) => void
  toggleIsFollowingProgress: (bool: boolean, uid: number) => void
  setFollowing: (newFollowing: number) => void
  notMyFollowers: (newFollowers: number) => void
  setNotMyFollowers: (newFollowers: number) => void
  isFollowingInProgress: Array<string>
  totalUsersCount: number
  isFetching: boolean
  users: Array<UserType>
  follow: () => void
  unfollow: () => void
  portionSize: number
}

class UsersContainer extends React.Component<PropsType> {
	componentDidMount() {
		this.props.getUsersThunkCreator(this.props.myUid, this.props.currentPage, this.props.pageSize, this.props.following, 1);
	}

	onPageChanged = (pageNumber: number) => {
		this.props.getUsersThunkCreator(this.props.myUid, pageNumber, this.props.pageSize, this.props.following, pageNumber);
	}

	addFollow = (uid: number) => {
		// set IsFollowing for disabled button
		this.props.toggleIsFollowingProgress(true, uid);
		//1. update database, my data
		usersAPI.getUser(this.props.myUid)
		.then(data => {
			const newFollowing = data.following;
				// Do not push the same uid
				const a = newFollowing.some((id:any) => {
					return id === uid
				})
      // uid !== this.props.myUid  - do not follow for myself
      if (!a && uid !== this.props.myUid) {
        newFollowing.push(uid)
      }
			this.props.setFollowing(newFollowing);
		})
		.then(data => {
			usersAPI.patchNewFollowingUID(this.props.myUid, this.props.following)
		})
	// 2. set into another user data,  I follow him
	  usersAPI.getUser(uid)
		.then(data => {
			const newFollowers = data.followers;
        // Do not push the same uid
        const a = newFollowers.some((id: any) => {
          return id === this.props.myUid
        })
        // uid !== this.props.myUid  - do not follow for myself
        if (!a && uid !== this.props.myUid) {
          newFollowers.push(this.props.myUid)
        }
			this.props.setNotMyFollowers(newFollowers);
		})
		.then(data => {
			usersAPI.patchNewFollowersUID(uid, this.props.notMyFollowers)
			.then(data => {
				// set IsFollowing for disabled button
				this.props.toggleIsFollowingProgress(false, uid);
			})
		})
	}

	removeFollow = (uid: number) => {
		// set IsFollowing for disabled button
		this.props.toggleIsFollowingProgress(true, uid);
		//1. update database, my data
		usersAPI.getUser(this.props.myUid)
		.then(data => {
			const newFollowing = data.following;
				// Do not delete if do not have uid or if uid is not in array
				let a = newFollowing.some((id: any) => {
					return id === uid
				})
				if (a) {
					const index = newFollowing.indexOf(uid)
					newFollowing.splice(index, 1)
				}
			// set new following
			this.props.setFollowing(newFollowing);
		})
		.then(data => {
			usersAPI.patchNewFollowingUID(this.props.myUid, this.props.following)
		})

		// 2. set into another user data,  I unfollow him
		usersAPI.getUser(uid)
		.then(data => {
			const newFollowers = data.followers;
				// Do not delete if do not have uid or if uid is not in array
				let a = newFollowers.some((id: any) => {
					return id === this.props.myUid
				})
				if (a) {
					const index = newFollowers.indexOf(this.props.myUid)
					newFollowers.splice(index, 1)
				}
			// set new following
			this.props.setNotMyFollowers(newFollowers)
		})
		.then(data => {
			usersAPI.patchNewFollowersUID(uid, this.props.notMyFollowers)
			.then(data => {
				// set IsFollowing for disabled button
				this.props.toggleIsFollowingProgress(false, uid);
			})
		})
	}  // remove Follow

render() {
	return <>
	{this.props.isFetching ? <Spinner /> : null}
		<Users
      follow={this.props.follow}
      unfollow={this.props.unfollow}
			addFollow={this.addFollow}
			removeFollow={this.removeFollow}
			onPageChanged={this.onPageChanged}
			/>
	</>
 }
};

const mapStateToProps = (state: AppStateType) => {
	return {
		users: getUsers(state),
		pageSize: getPageSize(state),
		totalUsersCount: getTotalUsersCount(state),
		currentPage: getCurrentPage(state),
		isFetching: getIsFetching(state),
		myUid: getCurrentUserDataUid(state),
		following: getCurrentUserDataFollowing(state),
		notMyFollowers: getNotMyFollowers(state),
		isFollowingInProgress: getIsFollowingInProgress(state),
    portionSize: getPortionSize(state)
	}
};

export default compose(
  withAuthRedirect,
  connect(mapStateToProps, { follow, unfollow, setUsers, setCurrentPage, setTotalUsersCount, toggleIsFetching, setFollowing, setNotMyFollowers, toggleIsFollowingProgress,  getUsersThunkCreator })
)(UsersContainer);
