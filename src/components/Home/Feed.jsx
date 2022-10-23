import Post from './Post';
import { useContext } from 'react';
import DataContext from '../../context/DataContext'

const Feed = () => {
  const {searchResults} = useContext(DataContext)

    return (
        <>
            {searchResults.map(post => (
                <Post key={post.id} post={post} />
            ))}
        </>
    )
}

export default Feed