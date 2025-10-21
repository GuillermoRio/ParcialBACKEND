import express from "express";
import cors from "cors"
import axios from "axios";

type LD = {
    id: number
    filmName: string
    rotationType: "CAV" | "CLV",
    region: string,
    lengthMinutes: number,
    videoFormat: "NTSC" | "PAL"
}

let ldscos: LD[] = [

 { id: 1, filmName: "Ice AGE", rotationType: "CAV", region: "dd", lengthMinutes: 17, videoFormat: "NTSC" },

 { id: 2, filmName: "Margaret", rotationType: "CLV", region: "dd", lengthMinutes: 17, videoFormat: "PAL" },

];

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

//Validacion
const validateDLData = (data: any) => {
  if (!data) return "No se ha proporcionado ningún cuerpo de solicitud.";

  const { filmName, rotationType , region, lengthMinutes, videoFormat } = data;

  if (typeof filmName !== "string" || filmName.trim().length < 2)
    return "El nombre debe ser una cadena con al menos 2 caracteres.";

  if (rotationType !== "CAV" || "CLV") {
    return "La ciudad debe ser string y tener al menos 2 caracteres";
  }

  if (typeof region !== "string" || region.trim().length < 2) {
    return "Las regiones deben ser string";
  }

  if (typeof lengthMinutes !== "number"){
    return "Los lengMinutes deben ser Number";
  }

  if (videoFormat !== "NTSC" || "PAL"){
    return "Los videoFormat deben ser String";
  }

  return null;
};

//Crear, definir y enseñar

app.get("/", (req, res) => {
    res.send("Okey Maquei, te has conectado");
});

app.get("/ld", (req, res) => {
    res.json(ldscos);
});

app.get("/ld/:id", (req, res) => {
    const id = req.params.id;
    res.json(ldscos.at(Number(id)-1));
});

app.post("/ld", (req, res)=>{
    try {
        const error = validateDLData(req.body);
        if (error) return res.status(400).json({ error });

        const newTeam: LD = {
        id: Date.now().toString(),
        ...req.body,
        };

        ldscos.push(newTeam);
        res.status(201).json(newTeam);
  } catch (err: any) {
    res
      .status(500)
      .json({ error: "Error al crear un LD", detail: err.message });
  }
    //res.status(404).send("Mal Enviado")
})

app.delete("/ld/:id", (req, res)=>{
    const id = req.params.id;
    const ldEliminado = ldscos.filter(p=>!(p.id=== Number(id)));
    ldscos = ldEliminado;
    res.json({message: "LD eliminado"})
})

app.listen(port, ()=>{
    console.log("Servidor en http://localhost:" + port);
});

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

const postTeam = async (newTeam: LD ) => {
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

    postTeam({ id: 3, filmName: "IE", rotationType: "CLV", region: "dud", lengthMinutes: 17, videoFormat: "PAL" },);

    const myTeam1 = getTeams();
    console.log(await myTeam1)

    delTeam(1);

    const myTeam2 = getTeams();
    console.log(await myTeam2)
}

testAPI();