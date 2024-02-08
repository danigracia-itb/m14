<template>
  <div>Logging Out...</div>
</template>

<script setup>
import axios from 'axios';

const router = useRouter()

async function logout() {
    await axios.post("/logout")
    router.push("/login")
}

onMounted(() => {
  logout()
})

</script>
