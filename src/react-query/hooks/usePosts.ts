import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}


const usePosts = (userId: number | undefined) => {
  const fetchPosts = () => (
    axios
      .get<Post[]>("https://jsonplaceholder.typicode.com/posts", {params: {userId}})
      .then((res) => res.data)
  );

  return useQuery<Post[], Error>({
    queryKey: userId ? ["users", userId, "posts"] : ["posts"],
    queryFn: fetchPosts,
    staleTime: 10 * 1000,
  });
};

export default usePosts;