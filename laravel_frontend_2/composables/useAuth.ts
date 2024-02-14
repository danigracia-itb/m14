import axios from "axios";
import { RegisterForm } from "~~/types/RegisterForm";
import { LoginForm } from "~~/types/LoginForm";

interface User {
    id: number,
    name: string,
    email: string,
    email_verified_at: Date | null,
    two_factor_secret: number | null,
    two_factor_recovery_codes: Array<number> | null,
    created_at: Date | null,
    updated_at: Date | null,
}

const user = ref<User | null>();

export const useAuth = () => {

    async function initUser() {
        user.value = await getUser();
    }

    async function login(form: LoginForm) {
        await axios.post("/login", form)
        useRouter().push("/me")
    }

    async function register(form: RegisterForm) {
        let responseRegister
        try {
            responseRegister = await axios.post("/register", form)
            useRouter().push("/me")
        } catch (e) {
            console.error(`Ha ocurrido un error: ${e}`)
        }
        console.log(responseRegister)
    }

    async function logout() {
        await axios.post("/logout");
        user.value = null;
        useRouter().replace("/login");
      }

    async function getUser(): Promise<User | null> {
        try {
            const res = await axios.get("/user");
            const user = res.data;
            return {
                ...user,
                created_at: new Date(user.created_at),
                updated_at: new Date(user.updated_at),
                email_verified_at: user.email_verified_at ? new Date(user.email_verified_at): null,
                two_factor_confirmed_at: user.created_at ? new Date(user.created_at): null,
            }
        } catch (error) {
            return null;
        }
    }

    return {
        initUser,
        login,
        register,
        logout,
        getUser,
        user
    }
}