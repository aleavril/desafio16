import { Router } from "express";
import cartsRouters from "./carts.routes.js";
import productsRouters from "./products.routes.js";
import sessionRouters from "./session.routes.js";
import { logger } from "../utils/logger.js";
import userRouters from "./user.routes.js";

const router = Router();

router.use("/products", productsRouters);
router.use("/carts", cartsRouters);
router.use("/session", sessionRouters);
router.use("/user", userRouters);

//Testea loggers
router.get("/loggertest", loggersTests);

async function loggersTests (req, res) {
    logger.error("This is a message of error");
    logger.warn("This is a message of warning");
    logger.info("This is a message of info");
    logger.http("This is a message of http");

    return res.status(200).json({status: "success"})
}

export default router;
