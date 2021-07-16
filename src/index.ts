import express from "express";
import cron from "node-cron";
import { getData } from "./flights";

const app = express();

const CRON_SCHEDULE = "0 0,12 * * *"; // 0h & 12h everyday
cron.schedule(CRON_SCHEDULE, async () => {
  const data = await getData();
  console.log(data);
});

app.get("/sync", async (_, res) => {
  const data = await getData();
  return res.status(200).json(data);
});

app.listen("3000", () => console.log("Server listening on port 3000..."));
