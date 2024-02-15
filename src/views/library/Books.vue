<template>
   <div class="books">
    <div class="firstRow" style="text-align: left;">
            <form class="form-group" >
              <div class="firstField">
                <div style="margin-bottom: 15px; padding-left: 10px;">
                  <button type="button" class="btn btn-primary" id="search">Search</button>
                  <button type="button" class="btn btn-primary" id="add" @click="addBook">Add</button>
                </div>
                <label for="Title" style="color: #f5f4f4;">
                  Title <input type="text" class="form-control" name="Title" id="title" required v-model="title">
                </label>
                <label for="Writer">
                    Writer <input type="text" class="form-control" name="Writer" id="writer" required v-model="writer">
                </label>
                <div class="secondField">
                  <label  for="Genre">
                    Genre <select class="form-select" name="genre"  id="genre" placeholder="Select a genre" required v-model="selectedGenre">
                    <option v-for="genre in genres" :key="genre" style="cursor: pointer;">{{ genre }}</option>
                    </select>
                </label>
                <label for="PageNumber">
                    Page Number <input class="form-control" type="number" name="number" id="number" maxlength="3" v-model="pageNumber">
                </label>
                <label for="Record Date" style="">
                    Record Date <input class="form-control" type="date" name="Record Date" id="recordDate" style="width: 130px;" v-model="recordDate">
                </label>
                </div>
              </div>
            </form>
        </div>
        <div class="secondRow">
          <table class="table table-striped" >
              <thead>
                  <tr>
                      <th id="th1" style="margin:0px; height: 20px; width: 20px;"></th>
                      <th>Title</th>
                      <th>Writer</th>
                      <th>Genre</th>
                      <th>Page Number</th>
                      <th>Record Date</th>
                      <th style="width: 30px;"></th>
                  </tr>
              </thead>
              <tbody>
                  <tr v-for="(row, index) in tableRows" :key="index">
                      <td><input id="cb1" type="checkbox" v-model="row.selected"  @change="getSelectedRowData(row)"  style="margin:0px; height: 20px; width: 20px;"/></td>
                      <td>{{row.title}}</td>
                      <td>{{row.writer}}</td>
                      <td style="width: 100px;">{{row.genre}}</td>
                      <td style="width: 160px;">{{row.pageNumber}}</td>
                      <td style="width: 160px;">{{row.recordDate}}</td>
                      <td>
                        <button @click="updateBook" type="button" class="btn btn-secondary"><i style="height: 15px; widows: 15px;" class="bi bi-pencil"></i></button>
                        <button @click="deleteBook" type="button" class="btn btn-danger"><i style="height: 15px; widows: 15px;" class="bi bi-trash3"></i></button>
                      </td>
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

    const title = ref("");
    const writer = ref("");
    const genres = ref(["Adventure", "Sci-Fi", "Horror","Comic Book","History","Poetry","Fantasy","Mystery"]);
    const selectedGenre = ref("");
    const pageNumber = ref("");
    const currentDate = new Date().toISOString().split('T')[0];
    const recordDate = ref(currentDate);
    const tableRows = ref([]);
    
    
    const aaaddBook = async () => {
      const userToken = sessionStorage.getItem("userToken");
      var postData = {
        Title: title.value, 
        Writer: writer.value,
        Genre: selectedGenre.value,
        PageNumber: pageNumber.value,
        RecordDate: recordDate.value
      };
      console.log(postData);
      let axiosConfig = {
        headers: {
          Authorization: 'Bearer ' + userToken
        }
      };

      console.log(sessionStorage.getItem("userToken"));
      
      if(userToken) {
        await axios.post('https://localhost:7227/api/books', postData, axiosConfig)
      .then(response => {
        console.log('book added:', response.data) 
        // Update UI here...
      })
      .catch(error => {
        console.error('Error adding book', error)
      })
    }
  }
  const addBook =  () => {
      if(title.value && writer.value && selectedGenre.value && pageNumber.value && recordDate.value) { 
          const newBook = {
            title: title.value,
            writer: writer.value,
            genre: selectedGenre.value,
            pageNumber: pageNumber.value,
            recordDate: recordDate.value,
          };
          tableRows.value.push(newBook);
          
          title.value = '';
          writer.value = '';
          selectedGenre.value = '';
          pageNumber.value = '';
          recordDate.value = currentDate; 

      } else {
          alert('Please fill in all fields');
      }
  }  
    
  const deleteBook = () => {
        const selectedRows = tableRows.value.filter(row => row.selected)
        
        if(selectedRows.length > 0) {
            selectedRows.forEach(async (selectedRow) => {
            
            });
            tableRows.value = tableRows.value.filter(row => !row.selected)

        } else { 
            alert('Select a book that you want to delete!')
        }
    };
        
    const updateBook = () => {
        const selectedRows = tableRows.value.filter(row => row.selected);
        
        if(selectedRows.length > 0) {
            
            if(!(title.value && writer.value && selectedGenre.value && pageNumber.value && recordDate.value)) {
                alert('Please fill in all fields');
            } else {
                selectedRows.forEach(async (selectedRow) => {
                    
                 const updateDoc = ( {
                        title: title.value,
                        writer: writer.value,
                        genre: selectedGenre.value,
                        pageNumber: pageNumber.value,
                        recordDate: recordDate.value,
                    });
                    tableRows.value.forEach(row => {
                        if(row.selected) {
                            row.selected = false;
                        }
                    })
                
                
            });
            
            }
            
        } else {
            alert('Select a book that you want to update!')
        }
    }

    const getSelectedRowData = (selectedRow) => {
        if(selectedRow.selected) {
            title.value = selectedRow.title;
            writer.value = selectedRow.writer;
            selectedGenre.value = selectedRow.genre;
            pageNumber.value = selectedRow.pageNumber;
            recordDate.value = selectedRow.recordDate;
        } else {
            title.value = '';
            writer.value = '';
            selectedGenre.value = '';
            pageNumber.value = '';
            recordDate.value = currentDate;
        }
        
    }

     const getBooks = async (title, writer, selectedGenre, pageNumber, recordDate) => {
      const userToken = sessionStorage.getItem("userToken");
      var getData = {
        Title: title.value, 
        Writer: writer.value,
        Genre: selectedGenre.value,
        PageNumber: pageNumber.value,
        RecordDate: recordDate.value
      };
      console.log(getData);
      let axiosConfig = {
        headers: {
          Authorization: 'Bearer ' + userToken
        }
      };

      console.log(sessionStorage.getItem("userToken"));
      
      if(userToken) {
        await axios.get('https://localhost:7227/api/books', getData, axiosConfig)
      .then(response => {
        console.log('book added:', response.data) 
        // Update UI here...
      })
      .catch(error => {
        console.error('Error adding book', error)
      })
    }
     }
    
    return {title, writer, genres, selectedGenre, pageNumber, recordDate, tableRows, addBook, deleteBook, updateBook, getSelectedRowData, getBooks }
  }
}

</script>

<style scoped>

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

label {
  color: #f5f4f4;
  width: 150px;
  padding: 10px;
}
select{
  color: black;
    
}
option{
  color: black;
}
.form-group {
  height: 200px;
  width: 1000px;
  padding: 30px;
  padding-left: 10px;
 
}
.form-select{ 
    height: 20px;
}
input {
  height: 20px;
  width: 120px;
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
table{
  margin-left: 20px;
  margin-right: 20px;
  padding-left: 50px;
}
th{
  width: 100px
}
</style>