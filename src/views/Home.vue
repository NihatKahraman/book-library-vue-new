<template>
  <div class="home">
    <h3>{{ msg }}</h3>
    <div class="tabs">
      <h1><router-link :to="{name: 'books'}"><i class="bi bi-book-half" style="margin-right: 15px;"></i>Books</router-link></h1>
      <h1><router-link :to="{name: 'customers'}"><i class="bi bi-person-fill" style="margin-right: 15px;"></i>Customers</router-link></h1>
      <h1><router-link :to="{name: 'reservations'}"><i class="bi bi-calendar-week" style="margin-right: 15px;"></i>Reservations</router-link></h1>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios'
export default {
  name: 'Home',
 setup() {
  const msg = "Welcome to the Book Library"
  const router = useRouter()

  
  const reloadPage = () => {
      window.location.reload();
    }

onMounted(() => {
  axios.post('https://localhost:7227/api/authentication/authenticate', { 
    headers: {
      'Authorization': 'Bearer ' + sessionStorage.getItem("userToken")
    } 
  })
  .catch(error => {
    router.push({name: "login"})
  })
});

  return {msg}
 }
}
</script>

<style>
.tabs h1 {
  font-size: 48 px;
  display: block ;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 20px;
  max-width: 380px;
  margin: 60px auto;
  background: #343434;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 1px 3px 5px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  line-height: 1.5em;
  text-transform: capitalize;
  text-decoration: none; 
}

a {
  text-decoration: none;
}
body{
  background: rgb(30, 35, 40);
}
h3{
  color: rgb(147, 192, 231);
}
</style>