import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProperty as updatePropertyApi } from "../../api/property";
import { PropertyItemType } from "../../types";
import { toast } from "react-hot-toast";

export function useUpdateProperty() {
  const queryClient = useQueryClient();
  const { mutate: updateProperty, isPending: isUpdating } = useMutation({
    mutationFn: ({
      id,
      updatedProperty,
    }: {
      id: string;
      updatedProperty: PropertyItemType;
    }) =>
      toast.promise(updatePropertyApi(id, updatedProperty), {
        loading: "Updating a property",
        success: () => `Updated successfully`,
        error: err => `${err}`,
      }),
    onSuccess: data => {
      console.log("data:", data);

      queryClient.invalidateQueries({ queryKey: [`property-${data.id}`] });
    },
  });

  return { updateProperty, isUpdating };
}
