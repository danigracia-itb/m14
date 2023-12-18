import { ref } from "vue";

export default function useUser() {
    const baseURL = "https://jsonplaceholder.typicode.com/users"

    const user = ref(null)

    //Obtener usuario API según id
    const llegirUser = async id => {
        const response = await fetch(baseURL + "/" + id);
        user.value = await response.json();
    };

    return {
        user,
        llegirUser
    }
}
