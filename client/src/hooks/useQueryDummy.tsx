// useFetching.ts
import { useQuery } from "@tanstack/react-query";

export const useQueryDummy = (queryKey: string) => {
  const { isPending } = useQuery({
    queryKey: [queryKey],
    queryFn: () => null,
    enabled: false,
  });
  return { isLoading: isPending }; // isPending = true until cache is populated
};

// this is a non functional useQuery dummy.
// its main purpose is to get the loading state of an specific query if the query is defined in different component. 