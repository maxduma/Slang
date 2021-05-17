import React from 'react'
import c from  './Post.module.css';
import userPhotoMan from '../../../../assets/defaultMan.png';
import userPhotoWoman from '../../../../assets/defaultWoman.png';

import likeIcon from '../../../../assets/Like.png';
import noLikeIcon from '../../../../assets/noLike.png';
import deleteIcon from '../../../../assets/delete.png';



const Post = ({post, isMyPage, addLike, removeLike, urlPhoto, gender, deletePost, post: { id, isLike, likesUid, text, data: {day, month, year, hours, minutes}}}) => {

  // console.log("POST POST", post)

  const deletePostBtn = () => {
    deletePost(id)
  }

  const addLikeBtn = () => {
    addLike(id)
  }

  const removeLikeBtn = () => {
    removeLike(id)
  }

  const defaultPhoto = gender === 'male' ? userPhotoMan : userPhotoWoman;
    return (
      <div className={c.postWrapper}>

        <div className={c.postHeader}>
          <div className={c.postHeaderLeft}>
            <div >
              <img className={c.img} src={urlPhoto ? urlPhoto : defaultPhoto} alt=""/>
            </div>
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