// pages/api/hello.js
import nc from "next-connect";
import cors from "cors";

const handler = () => {
  return nc({
    onError: (err, req, res, next) => {
      console.error(err.stack);
      res.status(500).end("Something broke!");
    },
    onNoMatch: (req, res) => {
      res.status(405).end();
    },
  }).use(cors({ credentials: true, origin: process.env.BASE_URL }));
};

export default handler;
