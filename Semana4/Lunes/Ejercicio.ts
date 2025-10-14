import axios from "axios"
//Promise all si una promesa no llega, nada llegara a su destino y tiraria catch
//Con allsettled no hace falta que todas las promesas lleguen y si alguna es un error decirlo
type Character = {
    name: string,
}
const getMultipleCharsName = async (id: number[]) => {
    try{
        const promesas = id.map(async (elem) => {
            const arrDePromesas = (await axios.get(`https://rickandmortyapi.com/api/character/${elem}`)).data.name;
            return arrDePromesas;
        });
        const nombres = await Promise.all(promesas)
        //console.log(nombres)
        return nombres;
    }catch(error){
        if(axios.isAxiosError(error)){
            console.log("Axios error" + error.message);
        }else{
            console.log("Error" + error);
        }
    }
};

const nombresDev = await getMultipleCharsName([1, 2, 3])
console.log(nombresDev);

const getCharacterSave = async (ids: number[]) => {
    const promesas = ids.map(async (elem) => {
        (await axios.get(`https://rickandmortyapi.com/api/character/${elem}`)).data;
    });
    const result = await Promise.allSettled(promesas);

    result.forEach((elem) => {
        if(elem.status == "fulfilled"){
            console.log(elem.value);
        }else{
            console.log(elem.status, "Error");
        };
    });
};