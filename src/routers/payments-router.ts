import { getPaymentFromTicketId, newPayment } from "@/controllers/payments-controller";
import { authenticateToken } from "@/middlewares";
import { Router } from "express";

const paymentsRouter = Router();

paymentsRouter
    .all("/*", authenticateToken)
    .get("/", getPaymentFromTicketId)
    .post("/process", newPayment)


export {paymentsRouter}