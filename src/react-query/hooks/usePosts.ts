import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface PostQuery {
  pageSize: number;
  page: number;
  userId: number | undefined;
}


const usePosts = (query: PostQuery) => {
  const fetchPosts = () => (
    axios
      .get<Post[]>("https://jsonplaceholder.typicode.com/posts", {
        params: {
          // userId: query.userId,
          _start: (query.page - 1) * query.pageSize,
          _limit: query.pageSize
        }})
      .then((res) => res.data)
  );

  return useQuery<Post[], Error>({
    queryKey: ["posts", query],
    queryFn: fetchPosts,
    staleTime: 10 * 1000,
    keepPreviousData: true
  });
};

export default usePosts;
