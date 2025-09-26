import { getTaskData } from "../components/data";

export async function GET() {
  const tasks = await getTaskData();
  return Response.json(tasks);
}
