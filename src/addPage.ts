import { config } from "https://deno.land/x/dotenv/mod.ts";

const token = config().TODOIST_TOKEN;

const perPage = 5;
for (let p = 221; p < 516; p += perPage) {
  // @ts-ignore
  const uuid = crypto.randomUUID();
  await addPages(p, perPage, uuid);
}

async function addPages(start: number, perPage: number, uuid: string) {
  const data = {
    content: `${start}-${start + perPage}`,
    parent_id: 5247906157,
  };
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
