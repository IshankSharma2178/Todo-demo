import { client } from "@/lib/rpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<
  (typeof client.api.tasks.tasks)[":id"]["$put"]
>;
type RequestType = InferRequestType<
  (typeof client.api.tasks.tasks)[":id"]["$put"]
>;

export const useUpdateTask = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ form, param }) => {
      const response = await client.api.tasks.tasks[":id"].$put({
        form,
        param,
      });
      if (!response.ok) {
        throw new Error("Failed to update Task.");
      }
      return await response.json();
    },
    onMutate: () => {
      toast.loading("Updating task...", { id: "update-task-loading" });
    },
    onSuccess: () => {
      toast.success("Task updated successfully!", {
        id: "update-task-loading",
      });
      queryClient.invalidateQueries({ queryKey: ["Todos"] });
    },
    onError: () => {
      toast.error("Failed to update task", { id: "update-task-loading" });
    },
  });

  return mutation;
};
