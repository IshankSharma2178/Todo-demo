import { Query, type Databases } from "node-appwrite";

import { DATABASE_ID, TASK_ID } from "@/config";

interface GetDocumentProps {
  databases: Databases;
  taskId: string;
}

export const getDocument = async ({ databases, taskId }: GetDocumentProps) => {
  const taskQuery = await databases.listDocuments(DATABASE_ID, TASK_ID, [
    Query.equal("taskId", taskId),
  ]);

  if (taskQuery.total === 0) {
    return null;
  }

  return taskQuery;
};
