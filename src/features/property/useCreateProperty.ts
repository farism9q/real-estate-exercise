import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProperty as createPropertyApi } from "../../api/property";
import { PropertyItemType } from "../../types";
import { toast } from "react-hot-toast";

export function useCreateProperty() {
  const queryClient = useQueryClient();
  const { mutate: createProperty, isPending: isCreating } = useMutation({
    mutationFn: (property: PropertyItemType) =>
      toast.promise(createPropertyApi(property), {
        loading: "Creating a new property",
        success: () => `Created successfully`,
        error: err => `${err}`,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["properties"] });
    },
  });

  return { createProperty, isCreating };
}
