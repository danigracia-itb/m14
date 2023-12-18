import { ref } from "vue";

//Recibre un argumento por parametros "type" este puede ser "posts" o "users"
export default function usePost(type) {
    const baseURL = "https://jsonplaceholder.typicode.com/"
    
    //Variables
    const oneEntry = ref([])
    const allEntries = ref(null)

    /*
        Dependiendo del type (users o posts) accederá a un tipo de registro u otro. Obtiene todos y los almacena en posts
    */
    const fetchAll = async () => {
        const response = await fetch(baseURL + type);
        allEntries.value = await response.json();
    };

    // Obtener un elemento especifico por su id utilizando el type (users o posts)
    const fetchOne = async id => {
        const response = await fetch(baseURL + type + "/" + id)
        oneEntry.value = await response.json();
    }

    //Retornar funciones y variables (ref)
    return {
        oneEntry,
        allEntries,
        fetchAll,
        fetchOne
    }
}
