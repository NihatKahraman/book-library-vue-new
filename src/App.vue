<template>
  <Navbar />
  <div class="content">
      <router-view />
    </div>
</template>

<script>
import Navbar from './components/Navbar.vue';
export default{
  components: {Navbar}
}


</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
body{
  background: rgb(30, 35, 40);
}
nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
}

nav a.router-link-exact-active {
  color: rgb(147, 192, 231);
}
*{
    margin: 0;
    padding: 0;
    font-family: 'Josefin Sans', sans-serif;
    font-style: italic;
    font-weight: 700;
    color: var(--primary);
}
@import url('https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@1,400;1,500;1,600;1,700&display=swap');
</style>
