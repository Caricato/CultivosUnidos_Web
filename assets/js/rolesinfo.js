import userTypes from "./users"
const rolesinfo = [
  {
    title: "Supervisor",
    id: userTypes.supervisor.id,
    route: '/insumos',
    options: [{ to: "" }]
  },
  {
    title: "Productor",
    id: userTypes.productor.id,
    route: '/cronogramas',
    options: [{ to: "" }]
  }
]

export default rolesinfo
