import { Link, useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/navbar/navbar.jsx";
import { doctors, doctors_services } from "../../constants/data.js";
import { useCallback, useEffect, useState } from "react";
import api from "../../constants/api.js";

function AppointmentAdd() {
  const navigate = useNavigate();
  const { id_appointment } = useParams(); // id_appointment is a parameter
  // Example of URL: http://localhost:3000/appointments/edit/1
  // In this case, id_appointment is 1
  const [users, setUsers] = useState([]);

  // variável de estado para armazenar os dados dos pacientes (users)
  const [idUser, setIdUser] = useState("");
  const [idDoctors, setIdDoctors] = useState("");
  const [idService, setIdService] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  const [bookingHour, setBookingHour] = useState("");

  const LoadUsers = useCallback(
    async function LoadUsers() {
      console.log("LoadUsers...");
      try {
        const response = await api.get("/admin/users");

        if (response.data) {
          console.log("LoadUsers...");
          console.log(response.data);
          setUsers(response.data);
        }
      } catch (error) {
        if (error.response?.data.error)
          if (error.response.status === 401) {
            return navigate("/");
          } else alert("Erro ao listar os pacientes.");
      }
    },
    [navigate]
  );

  const LoadDoctors = useCallback(
    async function LoadUsers() {
      console.log("LoadDoctors...");
      try {
        const response = await api.get("/doctors");

        if (response.data) {
          console.log("LoadDoctors...");
          console.log(response.data);
          setUsers(response.data);
        }
      } catch (error) {
        if (error.response?.data.error)
          if (error.response.status === 401) {
            return navigate("/");
          } else alert("Erro ao listar os médicos.");
      }
    },
    [navigate]
  );
  
  function SaveAppointment() {
    console.log(idUser, idDoctors, idService, bookingDate, bookingHour);
  }

  useEffect(() => {
    LoadUsers();
    LoadDoctors
  }, [LoadUsers, LoadDoctors]);

  return (
    <div>
      <Navbar />

      <div className="container-fluid mt-page">
        <div className="row col-lg-4 offset-lg-4">
          <div className="col-12 mt-2">
            <h2>
              {id_appointment > 0 ? "Editar Agendamento" : "Novo Agendamento"}{" "}
              {/*// If id_appointment is greater than 0, it will be displayed "Edit Appointment", otherwise "New Appointment" */}
            </h2>
          </div>

          <div className="col-12 mt-4">
            <label htmlFor="user" className="form-label">
              Pacientes
            </label>
            <div className="form-control mb-2">
              <select
                name="user"
                id="user"
                value={idUser}
                onChange={(e) => setIdUser(e.target.value)}
              >
                <option value="0">Selecione o paciente</option>
                {users.map((u) => {
                  return (
                    <option key={u.id_user} value={u.id_user}>
                      {u.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          <div className="col-12 mt-4">
            <label htmlFor="doctors" className="form-label">
              Médicos
            </label>
            <div className="form-control mb-2">
              <select
                name="doctors"
                id="doctors"
                value={idDoctors}
                onChange={(e) => setIdDoctors(e.target.value)}
              >
                <option value="0">Selecione o médico</option>
                {doctors.map((d) => {
                  return (
                    <option key={d.id_doctor} value={d.id_doctor}>
                      {d.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          <div className="col-12 mt-3">
            <label htmlFor="service" className="form-label">
              Serviço
            </label>
            <div className="form-control mb-2">
              <select
                name="service"
                id="service"
                value={idService}
                onChange={(e) => setIdService(e.target.value)}
              >
                <option value="0">Selecione o serviço</option>
                {doctors_services.map((d) => {
                  return (
                    <option key={d.id_service} value={d.id_service}>
                      {d.description}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          <div className="col-6 mt-3">
            <label htmlFor="bookingDate" className="form-label">
              Data
            </label>
            <input
              type="date"
              className="form-control"
              name="bookingDate"
              id="bookingDate"
              value={bookingDate}
              onChange={(e) => setBookingDate(e.target.value)}
            />
          </div>
          <div className="col-6 mt-3">
            <label htmlFor="bookingDate" className="form-label">
              Horário
            </label>
            <div className="form-control mb-2">
              <select
                name="bookingHour"
                id="bookingHour"
                value={bookingHour}
                onChange={(e) => setBookingHour(e.target.value)}
              >
                <option value="0">Horário</option>
                <option value="09:00">09:00</option>
                <option value="09:30">09:30</option>
                <option value="10:00">10:00</option>
                <option value="10:30">10:30</option>
                <option value="11:00">11:00</option>
                <option value="11:30">11:30</option>
              </select>
            </div>
          </div>
          <div className="col-12 mt-4">
            <div className="d-flex justify-content-end">
              <Link to="/appointments" className="btn btn-outline-primary me-2">
                Cancelar
              </Link>
              <button onClick={SaveAppointment} className="btn btn-primary" type="button" >Salvar dados</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AppointmentAdd;
