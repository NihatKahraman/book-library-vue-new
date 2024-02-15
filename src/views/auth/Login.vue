<template>
    <form @submit.prevent="handleSubmit">
        <h3>Login</h3>
        <input type="email" placeholder="Email" v-model="email" />
        <input type="password" placeholder="Password" v-model="password" />
        <div v-if="error" class="error">{{ error }}</div>
        <button v-if="!isPending">Login</button>
        <button v-if="isPending">Loading</button>
    </form>
</template>

<script>
import useLogin from '@/composables/useLogin'
import { ref, onMounted } from 'vue'
import {useRouter} from 'vue-router'

export default {
   setup() {
    const {error, login, isPending} = useLogin()

    const email = ref('')
    const password = ref('')
    const router = useRouter()
    let isLoggedIn = sessionStorage.getItem("isUserAuthenticated")

    const reloadPage = () => {
      window.location.reload();
    }
    

    const handleSubmit = async () => {
        try {
            sessionStorage.getItem("isUserAuthenticated")
            await login(email.value, password.value)
            console.log("test")
            router.push({name: "home"})
        } catch (error) {
            console.log("err" + error)
            
        }
        
    }

    onMounted(() => {
        if(isLoggedIn){
            router.push({ name: 'home'})
        }
        
    })
    return{email, password, handleSubmit, error, isPending}
   }

};

</script>

<style>

</style>