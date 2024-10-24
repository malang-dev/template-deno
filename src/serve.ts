import app from "@/main.ts";

const cwd = Deno.cwd();

Deno.serve({ port: parseInt(Deno.env.get("PORT")) || 3000 }, (req, handler) => {
  return app.fetch(req, handler);
});

console.log(`Running in directory ${cwd}`);
