import { useQuery } from "@tanstack/react-query";
import { listPosts } from "./client";
import { ListPostsResponse } from "@codersquare/shared/api";

export const App = () => {
  const {data, error, isLoading} = useQuery<ListPostsResponse>({ queryKey: ['listposts'], queryFn: listPosts });
  
  if(isLoading) {
    return <div>loading...</div>
  }

  if(error) {
    return <div>error loading posts...</div>
  }

  return <div>
    Posts:
    {!!data?.posts && (
      <div>{JSON.stringify(data.posts)}</div>
    )}
  </div>
}