import Cors from "cors";
import initMiddleware from "@/server/_middleware/_init";

// const corsMethod = async (methods = ["GET", "POST", "OPTIONS"]) => {
//   return initMiddleware(
//     // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
//     Cors({
//       methods,
//     })
//   );
// };

const corsMethod = initMiddleware(
  // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
  Cors({
    // Only allow requests with GET, POST and OPTIONS
    methods: ["POST"],
  })
);

export { corsMethod };
