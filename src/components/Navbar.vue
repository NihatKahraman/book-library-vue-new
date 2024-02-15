<template>
    <div class="navbar">
        <nav>
            <router-link :to="{name: 'home'}"><img class="image" alt=""></router-link>
            <h1 id style="color: azure;"><router-link :to="{name: 'home'}">Book Library</router-link></h1>
            <div class="links">
                <div v-if="isLoggedIn">
                    <span>Hi</span> 
                    <router-link style="color: aliceblue;" type="button" class="btn btn-primary" :to="{name: 'about'}">About</router-link>
                    <button type="button" class="btn btn-primary" @click="logoutButtonClick">Logout</button>
                </div>
                <div v-else>
                    <router-link type="button" class="btn btn-primary"  :to="{name: 'signup'}">Signup</router-link>
                    <router-link type="button" class="btn btn-primary" :to="{name: 'login'}">Login</router-link>
                </div>
            </div>
        </nav>
    </div>
</template>

<script>
import { ref, reactive, computed } from 'vue'
import useLogout from '@/composables/useLogout';
import {isUserAuthenticated} from '@/composables/auth'
import {useRouter} from 'vue-router';
import { useStore } from "vuex";
export default {
    setup() {

        const isLoggedIn = ref(sessionStorage.getItem("isUserAuthenticated"))
        
        const { logout } = useLogout();
        const router = useRouter()
        
        const logoutButtonClick = async () => {
            await logout();
            isLoggedIn.value = false
            console.log('user logged out')
            router.push({name: "login"})
        }
        return { logoutButtonClick, isLoggedIn}
    }
}
</script>

<style scoped>
.navbar{
    padding: 16px 10px;
    
}
nav {
    display: flex;
    align-items: center;
    max-width: 1000px;
    margin: 0 auto;
    
}
.navbar h1 {
    margin-right: 400px;
    text-decoration: none;
}
nav .links{
    text-decoration: none;
    color: rgb(14, 15, 15);
    margin-left: auto;
}
nav .links a,
button {
    margin-left: 16px;
    font-size: 14px;
    
}
nav img {
    max-height: 60px;
}
span {
  color: rgb(147, 192, 231);
  font-size: 14px;
  display: inline-block;
  margin-right: 16px;
  padding-right: 16px;
  border-right: 1px solid #ccc;
}
a {
    text-decoration: none;
    color: rgb(147, 192, 231);
}
</style>