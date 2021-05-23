import React from 'react'
import c from  './Post.module.css';
import userPhotoMan from '../../../../assets/defaultMan.png';
import userPhotoWoman from '../../../../assets/defaultWoman.png';
import likeIcon from '../../../../assets/Like.png';
import noLikeIcon from '../../../../assets/noLike.png';
import deleteIcon from '../../../../assets/delete.png';
import { NavLink } from 'react-router-dom';

const Post = ({ isMyPage, addLike, removeLike, gender, deletePost, post: { postId, ownerPostUid, ownerPostName, ownerPostSurname, ownerPostUrlPhoto, isLike, likesUid, text, data: {day, month, year, hours, minutes}}}) => {
  const deletePostBtn = () => {
    deletePost(postId)
  }
  const addLikeBtn = () => {
    addLike(postId, ownerPostUid)
  }
  const removeLikeBtn = () => {
    removeLike(postId, ownerPostUid)
  }

  const defaultPhoto = gender === 'male' ? userPhotoMan : userPhotoWoman;
    return (
      <div className={c.postWrapper}>
        <div className={c.postHeader}>
          <div className={c.postHeaderLeft}>
            <NavLink  className={c.link} to={'/profile/' + ownerPostUid}>
            <div className={c.subLinkWrapper}>
                <div>
                  <img className={c.img} src={ownerPostUrlPhoto ? ownerPostUrlPhoto : defaultPhoto} alt=""/>
                </div>
                <div className={c.postFullNameOwner}>
                    <div className={c.postOwnerName}>{ownerPostName}</div>
                    <div>{ownerPostSurname}</div>
                </div>
            </div>
            </NavLink>
            <div className={c.postHeaderData}>
              <div>{day} {month},   {year} </div> 
              <div>{hours}:{minutes}</div> 
            </div>
          </div>
          {
            isMyPage ?
            <div>
            <button className={c.btnDeletePost} onClick={deletePostBtn}>
              <img  className={c.iconDelete} src={deleteIcon} alt={year}/>
            </button>
          </div> : null
          }
        </div>
        <div className={c.postBody}>
            {text}
        </div>
        <div className={c.postFooter}>
          <div className={c.like}>
            <div className={c.likeWrapper} >
                {isLike ?
                 <button onClick={removeLikeBtn} className={c.btnLikePost}><img className={c.btnLike} src={likeIcon}  alt={year}/></button>
                :
                <button onClick={addLikeBtn} className={c.btnLikePost}><img className={c.btnLike} src={noLikeIcon} alt={year}/></button>
                }
            </div>
            {likesUid.length - 1}
          </div>
        </div>
      </div>
    )
}

export default Post;