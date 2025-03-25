import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";

export const useGetAllTodos = () => {
  const query = useQuery({
    queryKey: ["Todos"],
    queryFn: async () => {
      const response = await client.api.tasks.tasks.$get();

      if (!response.ok) {
        return null;
      }
      const data = await response.json();
      return data.data.tasks;
    },
  });
  return query;
};
