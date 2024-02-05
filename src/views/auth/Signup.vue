<template>
    <form @submit.prevent="handleSubmit">
        <h3>Signup</h3>
        <input type="text" placeholder="First Name" v-model="firstName" />
        <input type="text" placeholder="Last Name" v-model="lastName" />
        <input type="text" placeholder="Username" v-model="userName" />
        <input type="password" placeholder="Password" v-model="password" />
        <input type="email" placeholder="Email" v-model="email" />
        <input type="text" placeholder="Phonenumber" v-model="phonenumber" />
        <input type="text" placeholder="Role" v-model="role" />
        <div v-if="error" class="error">{{ error }}</div>
        <button v-if="!isPending">Signup</button>
        <button v-if="isPending">Loading</button>
    </form>
</template>

<script>
import useSignup from '@/composables/useSignup'
import { ref } from 'vue'
import {useRouter} from 'vue-router'

export default{
    setup() {
        const {error, signup, isPending} = useSignup()
        
        const firstName = ref('')
        const lastName = ref('')
        const userName = ref('')
        const email = ref('')
        const password = ref('')
        const phonenumber = ref('')
        const role = ref('')

        const router = useRouter()

        const handleSubmit = async () => {
            await signup(firstName.value, lastName.value, userName.value, email.value, password.value, phonenumber.value, role.value)
            if(error.value) {
            console.log(error.value)
            }
            else
            {
                router.push({name: "login"})
            }
        }
    return{firstName, lastName,  email, userName,  password, phonenumber, role, handleSubmit, error, isPending}
    }
}

</script>

<style>

</style>