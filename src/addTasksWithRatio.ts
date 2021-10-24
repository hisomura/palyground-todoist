import { config } from "https://deno.land/x/dotenv/mod.ts";

const token = config().TODOIST_TOKEN;
const parentId = Number.parseInt(config().PARENT_ID);
const perRatio = 1;

for (let p = 1; p <= 100; p += perRatio) {
  // @ts-ignore
  const uuid = crypto.randomUUID();
  await addTasksWithRatio(p, uuid);
}

async function addTasksWithRatio(ratio: number, uuid: string) {
  const data = {
    content: `${ratio}%`,
    parent_id: parentId,
  };
  console.log({ data });
  try {
    await fetch("https://api.todoist.com/rest/v1/tasks", {
      method: "POST", // or 'PUT'
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "X-Request-Id": uuid,
      },
      body: JSON.stringify(data),
    });
  } catch (e) {
    console.error("Error:", e);
  }
}
