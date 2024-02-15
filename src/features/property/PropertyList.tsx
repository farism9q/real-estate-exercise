import { useSearchParams } from "react-router-dom";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "../../components/ui/pagination";
import PropertyItem from "./PropertyItem";
import { useProperties } from "./useProperties";
import { PAGINATION_LIMIT } from "../../constants";
import { Button } from "../../components/ui/button";
import SkeletonPropertyItem from "./SkeletonPropertyItem";
import Empty from "../../components/Empty";

export default function PropertyList() {
  const { properties, isLoading, hasNextPage } = useProperties();
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = Number(searchParams.get("page")) || 1;

  if (isLoading) return <SkeletonPropertyItem length={5} />;

  if (properties?.length === 0 && currentPage === 1)
    return <Empty label="No properties found" />;

  const next = hasNextPage;
  const previous = currentPage > 1;

  // If all the properties can be rendered in the first page
  const onlyOnePage =
    properties?.length! < PAGINATION_LIMIT && currentPage === 1;

  function nextPage() {
    if (!next) return;

    searchParams.set("page", currentPage + 1 + "");
    setSearchParams(searchParams);
  }

  function prevPage() {
    if (!previous) return;

    searchParams.set("page", currentPage - 1 + "");
    setSearchParams(searchParams);
  }

  return (
    <div className="flex flex-col space-y-6 py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {properties?.map(property => (
          <PropertyItem key={property.id} propertyItem={property} />
        ))}
      </div>

      {!onlyOnePage && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <Button
                variant={"outline"}
                onClick={prevPage}
                disabled={!previous}
              >
                Previous
              </Button>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink>{currentPage}</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <Button onClick={nextPage} disabled={!next}>
                Next
              </Button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
