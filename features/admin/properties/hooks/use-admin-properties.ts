import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { propertyService } from "../services/property.service";
import { Property } from "../types/property.type";

export function useAdminProperties(initialData: Property[]) {
  const queryClient = useQueryClient();

  // REAL QUERY STATE (hydrate từ server props)
  const propertiesQuery = useQuery<Property[]>({
    queryKey: ["admin-properties"],
    queryFn: propertyService.getAdminProperties,
    initialData,
  });

  // MUTATION
  const changeStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      propertyService.changeStatus(id, status),

    onSuccess: (response) => {
      if (!response?.property?.id) return;

      queryClient.setQueryData(["admin-properties"], (old: Property[] = []) => {
        return old.map((property) =>
          property.id === response.property.id ? response.property : property,
        );
      });
    },
  });

  return {
    properties: propertiesQuery.data ?? [],
    changeStatus: changeStatusMutation.mutateAsync,
    isUpdating: changeStatusMutation.isPending,
  };
}
