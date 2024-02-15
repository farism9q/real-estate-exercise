import { useSearchParams } from "react-router-dom";
import { useInfiniteQuery } from "@tanstack/react-query";

import { getProperties } from "../../api/property";
import { PAGINATION_LIMIT } from "../../constants";

export function useProperties() {
  const [searchParams] = useSearchParams();

  const page = Number(searchParams.get("page")) || 1;

  const { data, isLoading, hasNextPage } = useInfiniteQuery({
    queryKey: ["properties", { page }],
    queryFn: () => getProperties({ pageParam: page }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      if (pages[0].length === PAGINATION_LIMIT) {
        return page + 1;
      } else {
        return undefined;
      }
    },
  });

  const properties = data?.pages[0];

  return { properties, isLoading, hasNextPage };
}
