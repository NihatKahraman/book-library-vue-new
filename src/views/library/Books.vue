<template>
   <div class="books">
    <div class="firstRow" style="text-align: left;">
            <form class="form1">
              <div class="firstField">
                <div style="margin-bottom: 15px;">
                  <button id="search">Search</button>
                  <button id="add" @click="addBook" type="button">Add</button>
                </div>
                <label for="Name">
                    Name <input type="text" name="Name" id="name" required v-model="name">
                </label>
                <label for="Writer">
                    Writer <input type="text" name="Writer" id="writer" required v-model="writer">
                </label>
                <div class="secondField">
                  <label for="Genre">
                    Genre <select name="genre" id="genre" aria-placeholder="Select a genre" required v-model="selectedGenre">
                    <option v-for="genre in genres" :key="genre" style="cursor: pointer;">{{ genre }}</option>
                    </select>
                </label>
                <label for="PageNumber">
                    Page Number <input type="number" name="number" id="number" maxlength="3" v-model="pageNumber">
                </label>
                <label for="Record Date" style="">
                    Record Date <input type="date" name="Record Date" id="recordDate" style="width: 120px;" v-model="recordDate">
                </label>
                </div>
              </div>
            </form>
        </div>
        <div class="secondRow">
          
        </div>
   </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios'
export default {
  setup() {
    const bookCollection = ref([])

    const name = ref("");
    const writer = ref("");
    const genres = ref(["Adventure", "Sci-Fi", "Horror","Comic Book","History","Poetry","Fantasy","Mystery"]);
    const selectedGenre = ref("");
    const pageNumber = ref("");
    const currentDate = new Date().toISOString().split('T')[0];
    const recordDate = ref(currentDate);
    const tableRows = ref([]);
    
    
    const addBook = async () => {
      const userToken = sessionStorage.getItem("userToken");
      var postData = {
        Title: name.value, 
        Price: writer.value
      };
      console.log(postData);
      let axiosConfig = {
        headers: {
          Authorization: 'Bearer ' + userToken
        }
      };

      console.log(sessionStorage.getItem("userToken"));
      
      if(userToken) {
        axios.post('https://localhost:7227/api/books', postData, axiosConfig)
      .then(response => {
        console.log('book added:', response.data) 
        // Update UI here...
      })
      .catch(error => {
        console.error('Error adding book', error)
      })
    }
  }

  
    
    return {name, writer, genres, selectedGenre, pageNumber, recordDate, bookCollection, addBook }
  }
}

</script>

<style>
.books {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 0.5fr 1.5fr;
  gap: 100px 0px;
  grid-template-areas: 
    "firstRow"
    "secondRow";
}
.firstRow {
  grid-area: firstRow;
}
.secondRow {
  grid-area: secondRow;
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
  height: 110px;
  width: 1000px;
  padding: 30px;
  padding-top: 20px;
  padding-bottom: 28px;
}
.table {
  width: 1000px;
  margin-left: 280px;
}
#genre {
  height: 20px;
  width: 120px;
  margin-left: 5px;
  margin-right: 5px;
}
#search {
  font-size: 15px;
  padding-bottom: 3px;
}
#add {
  margin-left: 5px;
  font-size: 15px;
  padding-bottom: 3px;
}
</style>