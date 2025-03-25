import { client } from "@/lib/rpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type ResponseType = InferResponseType<(typeof client.api.tasks.tasks)["$post"]>;
type RequestType = InferRequestType<(typeof client.api.tasks.tasks)["$post"]>;

export const useCreateTask = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const response = await client.api.tasks.tasks["$post"]({ json });
      return await response.json();
    },
    onMutate: () => {
      toast.loading("Creating...", { id: "create-task-loading" });
    },
    onSuccess: () => {
      toast.success("Task created successful", { id: "create-task-loading" });
      router.refresh();
      queryClient.invalidateQueries({ queryKey: ["current"] });
    },
    onError: () => {
      toast.error("Failed to create task", { id: "create-task-loading" });
    },
  });

  return mutation;
};
