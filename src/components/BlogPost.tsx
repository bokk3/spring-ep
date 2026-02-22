import { BlogPost as BlogPostType } from '../types';
import styles from './BlogPost.module.css';

interface BlogPostProps {
  post: BlogPostType;
  onBack: () => void;
}

export function BlogPost({ post, onBack }: BlogPostProps) {
  const formatDate = (date: Date | string): string => {
    const dateObj = date instanceof Date ? date : new Date(date);
    return dateObj.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <article className={styles.blogPost}>
      <button
        className={styles.backButton}
        onClick={onBack}
        aria-label="Back to blog list"
      >
        ← Back
      </button>
      
      <header className={styles.header}>
        <h1 className={styles.title}>{post.title}</h1>
        <time className={styles.date} dateTime={post.date.toString()}>
          {formatDate(post.date)}
        </time>
      </header>

      <div
        className={styles.content}
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </article>
  );
}
