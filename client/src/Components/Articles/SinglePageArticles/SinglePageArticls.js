import React, { useEffect, useLayoutEffect, useState } from 'react'
import SinglePageArtSide from './SinglePageArtSide'
import SinglePageArticleMain from './SinglePageArticleMain'
import SingleArticleTop from './SingleArticleTop'
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const SinglePageArticles = () => {
  const {slug}=useParams();
  const allPosts = useSelector(state=>state.handlePosts);
  const [post,setPost]=useState("");
  useEffect(()=>{
    for (let i = 0; i < allPosts.length; i++) {
      const element = allPosts[i];
      if(element.slug==slug){
        setPost(element);
      }
    }
  })
  return (
    <>
      <SingleArticleTop post={post}/>
      <div className="mx-auto mt-14 flex max-w-screen-xl flex-col gap-5 px-5 md:flex-row">
        <SinglePageArticleMain post={post} />
        <SinglePageArtSide post={post}/>
      </div>
    </>

  )
}

export default SinglePageArticles