export const path = {
  home() {
    return "/";
  },
  topicShow(slug: string) {
    return `/topics/${slug}`;
  },
  postCreate(topicSlug: string) {
    return `/topics/${topicSlug}/posts/new`;
  },
  postShow(topicSlug: string, postId: string) {
    return `/topics/${topicSlug}/posts/${postId}`;
  },
};
