import { useState } from 'react';
import { BlogList } from './BlogList';
import { BlogPost } from './BlogPost';
import { getBlogPostById } from '../data';
import type { BlogPost as BlogPostType } from '../types';

interface BlogSectionProps {
  posts: BlogPostType[];
}

export function BlogSection({ posts }: BlogSectionProps) {
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);

  const selectedPost = selectedPostId ? getBlogPostById(selectedPostId) : null;

  const handlePostSelect = (postId: string) => {
    setSelectedPostId(postId);
  };

  const handleBack = () => {
    setSelectedPostId(null);
  };

  return (
    <div>
      {selectedPost ? (
        <BlogPost post={selectedPost} onBack={handleBack} />
      ) : (
        <BlogList posts={posts} onPostSelect={handlePostSelect} />
      )}
    </div>
  );
}
