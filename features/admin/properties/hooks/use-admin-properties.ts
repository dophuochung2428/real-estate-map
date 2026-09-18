import { useMutation, useQueryClient } from "@tanstack/react-query";
import { propertyService } from "../services/property.service";
import { Property } from "../types/property.type";

export function useAdminProperties(initialData: Property[]) {
  const queryClient = useQueryClient();

  const changeStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      propertyService.changeStatus(id, status),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin-properties"],
      });
    },
  });

  const deletePropertyMutation = useMutation({
    mutationFn: (id: string) => propertyService.adminDeleteProperty(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin-properties"],
      });
    },
  });

  return {
    properties: initialData,

    changeStatus: changeStatusMutation.mutateAsync,
    isUpdating: changeStatusMutation.isPending,

    deleteProperty: deletePropertyMutation.mutateAsync,
    isDeleting: deletePropertyMutation.isPending,
  };
}
