import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { getProperty } from "../../api/property";

export function useProperty() {
  const { propertyId } = useParams();

  const { data: property, isLoading } = useQuery({
    queryFn: () => getProperty(propertyId!),
    queryKey: [`property-${propertyId}`],
  });

  return { property, isLoading };
}
