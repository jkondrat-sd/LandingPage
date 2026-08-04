import handler from "@/server/pkg/next_connect_pkg";

export default handler()
  .use((req, res, next) => next())
  .get((req, res) => {
    res.send("up");
  })
  .post((req, res) => {
    res.json({ status: "up" });
  })
  .put(async (req, res) => {
    res.end("up");
  })
  .patch(async (req, res) => {
    throw new Error("Throws me around! Error can be caught and handled.");
  });
