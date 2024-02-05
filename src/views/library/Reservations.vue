<template>
  <div class="books">
   <div class="fields" style="text-align: left;">
           <form class="form1">
             <div class="firstField">
              <label for="book">
                    Book <select name="book" id="book" aria-placeholder="Select a book" 
                    style="margin-right:50px; margin-bottom: 30px; margin-top: 10px; width: 100px; cursor: pointer;" v-model="selectedBook">
                        <option v-for="book in books" :key="book" style="cursor: pointer;">{{ book }}</option>
                    </select>
                </label>
                <label for="customer">
                    Customer <select name="customer" id="customer" aria-placeholder="Select a customer" 
                    style="margin-right:50px; margin-bottom: 30px; margin-top: 10px; width: 100px; cursor: pointer;" v-model="selectedCustomer">
                        <option v-for="customer in customers" :key="customer" style="cursor: pointer;">{{ customer }}</option>
                    </select>
                </label>
               <div class="secondField">
                <label for="Borrow Date" style="margin-bottom: 50px;">
                    Borrow Date <input type="date" name="BorrowDate" id="borrowDate" style="cursor: pointer;" v-model="borrowDate">
                </label>
                <label for="Borrow End Date" style="margin-bottom: 50px;">
                    Borrow End Date <input type="date" name="BorrowEndDate" id="borrowEndDate" style="cursor: pointer;" v-model="borrowEndDate">
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
                <th>Book</th>
                <th>Customer</th>
                <th>Borrow Date</th>
                <th>Borrow End Date</th>
            </tr>
          </thead>
            <tbody>
                <tr v-for="(row, index) in paginatedTableRows" :key="index"> 
                  <td><input id="cb1" type="checkbox" v-model="row.selected" @change="getSelectedRowData(row)"  style="margin:0px; height: 20px; width: 20px;"/></td>
                  <td>{{row.book}}</td>
                  <td>{{row.customer}}</td>
                  <td>{{row.borrowDate}}</td>
                  <td>{{row.borrowEndDate}}</td>
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
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiYWRtaW4iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBZG1pbiIsImV4cCI6MTcwNTkzMTk3NiwiaXNzIjoiYnNzdG9yZWFwaSIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3Q6MzAwMCJ9.EnE7zZt-R2yXfwpFCPgMiHhyABdCMk0t5I3SkXKmlxw';
      const router = useRouter()
      const books = ref(["White Fang", "1984"]);
      const selectedBook = ref("")
      const customers = ref(["Nihat", "Cenk"]);
      const selectedCustomer = ref("")
      const currentDate = new Date().toISOString().split('T')[0];
      const borrowDate = ref(currentDate);
      const borrowEndDate = ref(currentDate);
    



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

    return { books, selectedBook,  customers, selectedCustomer, borrowDate, borrowEndDate }
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
#genre {
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