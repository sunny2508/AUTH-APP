import { MailtrapClient } from "mailtrap";


const TOKEN = "f353be11ebf538b0cac7dea3010b21e5";

export const mailtrapClient = new MailtrapClient({
  token: TOKEN,
});

export const sender = {
  email: "hello@demomailtrap.com",
  name: "Sunny singh",
};
