import { client } from "@/lib/rpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<
  (typeof client.api.tasks.tasks)[":id"]["$delete"],200
>;
type RequestType = InferRequestType<
  (typeof client.api.tasks.tasks)[":id"]["$delete"]
>;

export const useDeleteTask = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ param }) => {
      const response = await client.api.tasks.tasks[":id"].$delete({
        param,
      });
      if (!response.ok) {
        throw new Error("Failed to delete task");
      }
      const data = await response.json();
      return data;
    },
    onMutate: () => {
      toast.loading("Deleting task...", { id: "delete-task-loading" });
    },
    onSuccess: () => {
      toast.success("Task deleted successfully!", {
        id: "delete-task-loading",
      });
      queryClient.invalidateQueries({ queryKey: ["Todos"] });
    },
    onError: () => {
      toast.error("Failed to delete task", { id: "delete-task-loading" });
    },
  });

  return mutation;
};
