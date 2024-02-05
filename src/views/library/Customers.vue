<template>
  <div class="books">
   <div class="fields" style="text-align: left;">
           <form class="form1">
             <div class="firstField">
              <label for="Name">
                    Name <input type="text" name="Name" id="name" style="margin-left: 10px;" required v-model="name">
                </label>
                <label for="Surname">
                    Surname <input type="text" name="Surname" id="surname" required v-model="surname">
                </label>
               <div class="secondField">
                <label for="Gender">Gender</label>
                <select name="gender" id="gender" style="cursor: pointer;" required v-model="selectedGender">
                    <option v-for="gender in genders" :key="gender" style="cursor: pointer;">{{ gender }}</option>
                </select>
                <label for="Phone Number">
                    Phone Number <input type="number" name="PhoneNumber" id="phoneNumber" style="width: 110px;" maxlength="10" required v-model="phoneNumber">
                </label>
                <label for="Age">
                    Age <input type="number" name="number" id="number" maxlength="3" required v-model="age">
                </label>
               </div>
             </div>
           </form>
       </div>
       <div class="table">
        <table class="table table-dark table-striped"> 
          <thead>
              <tr>
                  <th id="th1" style="margin:0px; height: 20px; width: 20px;"></th>
                  <th>Name</th>
                  <th>Surname</th>
                  <th>Gender</th>
                  <th>Phone Number</th>
                  <th>Age</th>
              </tr>
          </thead>
              <tbody>
                  <tr v-for="(row, index) in paginatedTableRows" :key="index">
                      <td><input id="cb1" type="checkbox" v-model="row.selected" @change="getSelectedRowData(row)" style="margin:0px; height: 20px; width: 20px;"  /></td>
                      <td>{{row.name}}</td>
                      <td>{{row.surname}}</td>
                      <td>{{row.gender}}</td>
                      <td>{{row.phoneNumber}}</td>
                      <td>{{row.age}}</td>
                  </tr>
              </tbody>
        </table>
       </div>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios'
export default {
  setup() {
    const customers = ref([])

    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiYWRtaW4iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBZG1pbiIsImV4cCI6MTcwNTkzMTk3NiwiaXNzIjoiYnNzdG9yZWFwaSIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3Q6MzAwMCJ9.EnE7zZt-R2yXfwpFCPgMiHhyABdCMk0t5I3SkXKmlxw';
    const router = useRouter()
    const name = ref("");
    const surname = ref("");
    const genders = ref(["Female", "Male"]);
    const selectedGender = ref("");
    const phoneNumber = ref("");
    const age = ref("");
    const tableRows = ref([]);


    onMounted(() => {
      axios.get('https://localhost:7227/api', { 
        headers: {
          'Authorization': 'Bearer' + token
        } 
      })
      .then(response => {
        customers.value = response.data
      })
      .catch(error => {
        router.push({name: "home"})
  })
    });

    return {name, surname, genders, selectedGender, phoneNumber, age, customers }
  }
}
</script>

<style>
.books {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 0.5fr 1.5fr;
  gap: 0px 0px;
  grid-template-areas: 
    "fields"
    "table";
}
.fields {
  grid-area: fields;
  
}
.table {
  grid-area: table;
  
}
input{
  width: 120px; 
  height: 10px;
  text-align: left;
}

label {
  margin-bottom: 20px;
}
select{
    margin-top: 20px;
    margin-bottom: 20px;
    color: black;
    
}
option{
  color: black;
}
.form1 {
  height: 75px;
  width: 1000px;
  padding: 30px;
  padding-top: 20px;
  padding-bottom: 28px;
}
#gender {
  height: 20px;
  width: 120px;
  margin-left: 5px;
  margin-right: 5px;
}
.buttons {
  margin-top: 5px;
  margin-left: 50px;
}
</style>