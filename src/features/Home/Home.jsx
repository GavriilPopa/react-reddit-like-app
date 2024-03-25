import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import Post from '../Post/Post';
import PostLoading from '../Post/PostLoading';
import getRandomNumber from '../../utils/getRandomNumber';
import {
  fetchPosts,
  selectFilteredPosts,
  setSearchTerm,
  fetchComments,
} from '../../store/redditSlice';
import './Home.css';

function Home() {
  const reddit = useSelector((state) => state.reddit);
  const { isLoading, error, searchTerm, selectedSubreddit } = reddit;
  const posts = useSelector(selectFilteredPosts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts(selectedSubreddit));
  }, [selectedSubreddit]);

  const onToggleComments = (index) => (permalink) => {
    dispatch(fetchComments(index, permalink));
  };

  if (isLoading) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        {Array(getRandomNumber(3, 10)).fill(<PostLoading />)}
      </motion.div>
    );
  }

  if (error) {
    return (
      <div className="error">
        <h2>Failed to load posts.</h2>
        <button
          type="button"
          onClick={() => dispatch(fetchPosts(selectedSubreddit))}
        >
          Try again
        </button>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="error">
        <h2>No posts matching &quot;{searchTerm}&quot;</h2> {/* Escaping double quotes */}
        <button type="button" onClick={() => dispatch(setSearchTerm(''))}>
          Go home
        </button>
      </div>
    );
  }

  return (
    <>
      {posts.map((post, index) => (
        <motion.div key={post.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Post
            post={post}
            onToggleComments={onToggleComments(index)}
          />
        </motion.div>
      ))}
    </>
  );
}

export default Home;


