import { checkPayment, newPayment } from "@/controllers/payments-controller";
import { authenticateToken } from "@/middlewares";
import { Router } from "express";

const paymentsRouter = Router();

paymentsRouter
    .all("/*", authenticateToken)
    .get("/", checkPayment)
    .post("/process", newPayment)


export {paymentsRouter}