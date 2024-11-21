import { Router } from "express";
import controllerDoctor from "./controllers/controller.doctor.js";
import controllerUser from "./controllers/controller.user.js";
import jwt from "./token.js";

const router = Router();

// Doctors
router.get("/doctors", jwt.ValidateToken, controllerDoctor.Listar);
router.post("/doctors", jwt.ValidateToken, controllerDoctor.Inserir);
router.put("/doctors/:id_doctors", jwt.ValidateToken, controllerDoctor.Editar);
router.delete("/doctors/:id_doctors", jwt.ValidateToken, controllerDoctor.Excluir);

// Services (serviços prestados)...
router.get("/doctors/:id_doctors/services", jwt.ValidateToken, controllerDoctor.ListarServicos);


// Users
// register
router.post("/users/register", controllerUser.Inserir);
//login
router.post("/users/login", controllerUser.Login);

// Reservas (appintments)...


export default router;
