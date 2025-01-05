import { Router } from "express";
import rateLimit from "express-rate-limit";
import controllerDoctor from "./controllers/controller.doctor.js";
import controllerUser from "./controllers/controller.user.js";
import controllerAppointment from "./controllers/controller.appointment.js";
import jwt from "./token.js";
import dotenv from 'dotenv';
import { loginLimiter, trackLoginAttempts, resetLoginAttempts } from "./middlewares/rateLimit.js";

dotenv.config({ path: "./src/.env" });
const router = Router();

// Doctors
router.get("/doctors", jwt.ValidateToken, controllerDoctor.Listar);
router.post("/doctors", jwt.ValidateToken, controllerDoctor.Inserir);
router.put("/doctors/:id_doctors", jwt.ValidateToken, controllerDoctor.Editar);
router.delete("/doctors/:id_doctors", jwt.ValidateToken, controllerDoctor.Excluir);

// Services (serviços prestados)...
router.get("/doctors/:id_doctors/services", jwt.ValidateToken, controllerDoctor.ListarServicos);

// register
router.post("/users/register", controllerUser.Inserir);
//login
router.post("/users/login", loginLimiter, resetLoginAttempts, trackLoginAttempts, controllerUser.Login);
router.get("/users/profile", jwt.ValidateToken, controllerUser.Profile);

// Reservas (appointments)...
router.get("/appointments", jwt.ValidateToken, controllerAppointment.ListarByUser);
router.post("/appointments", jwt.ValidateToken, controllerAppointment.Inserir);
router.delete("/appointments/:id_appointment", jwt.ValidateToken, controllerAppointment.Excluir);


export default router;
