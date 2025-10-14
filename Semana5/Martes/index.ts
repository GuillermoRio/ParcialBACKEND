import express from "express";
import cors from "cors"

type Team = {
    id: number
    name: string
    city: string
    titles: number
}

let teams: Team[] = [

 { id: 1, name: "Lakers", city: "Los Angeles", titles: 17 },

 { id: 2, name: "Celtics", city: "Boston", titles: 17 },

];

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

//Validacion
const validateTeamData = (data: any): string | null => {
  if (!data) return "No se ha proporcionado ningún cuerpo de solicitud.";

  const { name, city , titles } = data;

  if (typeof name !== "string" || name.trim().length < 2)
    return "El nombre debe ser una cadena con al menos 2 caracteres.";

  if (typeof city !== "string") {
    return "La ciudad debe ser string y tener al menos 2 caracteres";
  }

  if (typeof titles !== "number") {//Poner minuscula por que la N grande es tipo complejo
    return "Los titles deben ser Number";
  }

  return null;
};

//Crear, definir y enseñar

app.get("/", (req, res) => {
    res.send("Okey Maquei, te has conectado");
});

app.get("/teams", (req, res) => {
    res.json(teams);//El send es lo mismo pero no lo pasa como JSON
});

app.get("/teams/:id", (req, res) => {
    const id = req.params.id;
    res.json(teams.at(Number(id)-1));//El send es lo mismo pero no lo pasa como JSON
});

app.post("/teams", (req, res)=>{
    //const nameNewUser = req.body.name; Habir que tener cuidado con lo que recibimos y habria que ver uno a uno si esta bien o mal
    try {
        const error = validateTeamData(req.body);
        if (error) return res.status(400).json({ error });

        const newTeam: Team = {
        id: Date.now().toString(),
        ...req.body,
        };

        teams.push(newTeam);
        res.status(201).json(newTeam);
  } catch (err: any) {
    res
      .status(500)
      .json({ error: "Error al crear la persona", detail: err.message });
  }
    //res.status(404).send("Mal Enviado")
})

app.put("/person/:id", (req, res)=>{
    const id = req.params.id;//Siempre un string lo que llega en params
    const teamNuevo = teams.map((te) => {
        return te.id === Number(id) ? {...te, ...req.body} : te
    });
    teams = teamNuevo;
    res.json({message: "Team actualizada"});
})

app.delete("/teams/:id", (req, res)=>{
    const id = req.params.id;
    const teamEliminado = teams.filter(p=>!(p.id=== Number(id)));
    teams = teamEliminado;
    res.json({message: "Team eliminada"})
})

app.listen(port, ()=>{
    console.log("Servidor en http://localhost:" + port);
});

import axios from "axios";

const getTeams = async () => {
    try{
        const team = (await axios.get("http://localhost:3000/teams")).data;

        return team;
    }catch(error){
        if(axios.isAxiosError(error)){
            console.log("Axios error" + error.message);
        }else{
            console.log("Error" + error);
        }
    }
}

const getTeambyId = async (id: number) => {
    try{
        const team = (await axios.get("http://localhost:3000/teams/" + id )).data;

        return team;
    }catch(error){
        if(axios.isAxiosError(error)){
            console.log("Axios error" + error.message);
        }else{
            console.log("Error" + error);
        }
    }
}

const postTeam = async (newTeam: Team ) => {
    try{
        const team = (await axios.post("http://localhost:3000/teams", newTeam )).data;
        
        return team;
    }catch(error){
        if(axios.isAxiosError(error)){
            console.log("Axios error" + error.message);
        }else{
            console.log("Error" + error);
        }
    }
}
const delTeam = async (id: Number) => {
    try{
        const team = (await axios.delete("http://localhost:3000/teams/" + id)).data;
        
        return team;
    }catch(error){
        if(axios.isAxiosError(error)){
            console.log("Axios error" + error.message);
        }else{
            console.log("Error" + error);
        }
    }
}

const testAPI = async () => {
    const myTeam0 = getTeams();
    console.log(await myTeam0)

    postTeam({ id: 3, name: "Tigres", city: "Monterrey", titles: 7 });

    const myTeam1 = getTeams();
    console.log(await myTeam1)

    delTeam(1);

    const myTeam2 = getTeams();
    console.log(await myTeam2)
}

testAPI();