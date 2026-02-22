import { BlogPost } from '../types';
import styles from './BlogList.module.css';

interface BlogListProps {
  posts: BlogPost[];
  onPostSelect: (postId: string) => void;
}

export function BlogList({ posts, onPostSelect }: BlogListProps) {
  // Sort posts in reverse chronological order (newest first)
  const sortedPosts = [...posts].sort((a, b) => {
    const dateA = a.date instanceof Date ? a.date : new Date(a.date);
    const dateB = b.date instanceof Date ? b.date : new Date(b.date);
    return dateB.getTime() - dateA.getTime();
  });

  const formatDate = (date: Date | string): string => {
    const dateObj = date instanceof Date ? date : new Date(date);
    return dateObj.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className={styles.blogList}>
      {sortedPosts.map((post) => (
        <article
          key={post.id}
          className={styles.blogCard}
          onClick={() => onPostSelect(post.id)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onPostSelect(post.id);
            }
          }}
        >
          <h3 className={styles.title}>{post.title}</h3>
          <time className={styles.date} dateTime={post.date.toString()}>
            {formatDate(post.date)}
          </time>
          <p className={styles.preview}>{post.preview}</p>
        </article>
      ))}
    </div>
  );
}
