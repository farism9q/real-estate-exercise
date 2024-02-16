import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteProperty as deletePropertyApi } from "../../api/property";
import { toast } from "react-hot-toast";

export function useDeleteProperty() {
  const queryClient = useQueryClient();
  const { mutate: deleteProperty, isPending: isDeleting } = useMutation({
    mutationFn: (id: string) =>
      toast.promise(deletePropertyApi(id), {
        loading: "Deleting a property",
        success: () => `Deleted successfully`,
        error: err => `${err}`,
      }),
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: ["properties"] });
      window.location.href = "/properties";
    },
  });

  return { deleteProperty, isDeleting };
}
