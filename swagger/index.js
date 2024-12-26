import swaggerUiExpress from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const swaggerSpec = swaggerJSDoc({
  definition: {
    info: {
      title: "版权图片信息系统 API",
      version: "1.0.0",
    },
  },
  apis: [join(__dirname, "../routes/*.js")],
});

const swaggerInstall = function (app) {
  app.get("/swagger.json", function (req, res) {
    res.send(swaggerSpec);
  });
  app.use(
    "/swagger",
    swaggerUiExpress.serve,
    swaggerUiExpress.setup(swaggerSpec)
  );
};

export default swaggerInstall;
