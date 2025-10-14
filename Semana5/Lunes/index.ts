import express from "express";
import cors from "cors"

type Calle = {
    numero: number,
    streetName: string,
    floor: number
};
type Person = {
    id: string,
    name: string,
    email: string,
    address: Calle
};

let personicas: Person[] = [
    {
        id: "1",
        name: "Paco",
        email: "pacoP@gamil.com",
        address: {
            floor: 1,
            numero: 47,
            streetName: "Pacos Street"
        }
    },
    {
        id: "2",
        name: "Pedro",
        email: "pedroP@gamil.com",
        address: {
            floor: 2,
            numero: 56,
            streetName: "Pedros Street"
        }
    }
]
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

//Crear, definir y enseñar

app.get("/", (req, res) => {
    res.send("Okey Maquei, te has conectado");
});

app.get("/persons", (req, res) => {
    res.json(personicas);//El send es lo mismo pero no lo pasa como JSON
});

app.post("/person", (req, res)=>{
    //const nameNewUser = req.body.name; Habir que tener cuidado con lo que recibimos y habria que ver uno a uno si esta bien o mal
    const newUser:Person = {
        id: Date.now().toString(),
        ...req.body
    };
    personicas.push(newUser);
    res.status(201).json(newUser);
    //res.status(404).send("Mal Enviado")
})

app.put("/person/:id", (req, res)=>{
    const id = req.params.id;//Siempre un string lo que llega en params
    const personasNuevas = personicas.map((per) => {
        return per.id === id ? {...per, ...req.body} : per
    });
    personicas = personasNuevas;
    res.json({message: "Persona actualizada"});
})

app.delete("/person/:id", (req, res)=>{
    const id = req.params.id;
    const personasSinLaEliminada = personicas.filter(p=>!(p.id===id));
    personicas = personasSinLaEliminada;
    res.json({message: "Persona eliminada"})
})

app.listen(port, ()=>{
    console.log("Server started at " + port);
});