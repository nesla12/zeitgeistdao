import { useState, useEffect } from 'react';
import { contentService, Post, Member, Topic } from '../services/ContentService';

export function useContent() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchContentData() {
      try {
        const [postsData, membersData, topicsData] = await Promise.all([
          contentService.getFeedPosts(),
          contentService.getActiveMembers(),
          contentService.getTrendingTopics()
        ]);

        setPosts(postsData);
        setMembers(membersData);
        setTopics(topicsData);
      } catch (error) {
        console.error('Failed to fetch content data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchContentData();
  }, []);

  return { posts, members, topics, loading };
}