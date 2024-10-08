import { ListPostsRequest, ListPostsResponse } from "@codersquare/shared/api";

const HOST =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://codersquare.xyz";

export const listPosts = async (
  req: ListPostsRequest
): Promise<ListPostsResponse> => {
  const response = await fetch(`${HOST}/api/v1/posts`);
  if (!response.ok) {
    const { error } = await response.json();
    throw error;
  }

  return response.json();
};
