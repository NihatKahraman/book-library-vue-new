<template>
  <div class="reservations">
   <div class="fields" style="text-align: left;">
           <form class="form-group">
             <div class="firstField">
              <div style="margin-bottom: 15px; padding-left: 10px;">
                  <button class="btn btn-primary" id="search">Search</button>
                  <button class="btn btn-primary" id="add" @click="addReservation" type="button">Add</button>
                </div>
              <label for="book">
                    Book <select class="form-select" name="book" id="book" aria-placeholder="Select a book" 
                    style="cursor: pointer;" v-model="selectedBook">
                        <option v-for="book in books" :key="book" style="cursor: pointer;">{{ book }}</option>
                    </select>
                </label>
                <label for="customer">
                    Customer <select class="form-select" name="customer" id="customer" aria-placeholder="Select a customer" 
                    style="cursor: pointer;" v-model="selectedCustomer">
                        <option v-for="customer in customers" :key="customer" style="cursor: pointer;">{{ customer }}</option>
                    </select>
                </label>
               <div class="secondField">
                <label for="Borrow Date">
                    Borrow Date <input class="form-control" type="date" name="BorrowDate" id="borrowDate" style="cursor: pointer;" v-model="borrowDate">
                </label>
                <label for="Borrow End Date">
                    Borrow End Date <input class="form-control" type="date" name="BorrowEndDate" id="borrowEndDate" style="cursor: pointer;" v-model="borrowEndDate">
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
                <th style="width: 30px;"></th>
            </tr>
          </thead>
            <tbody>
                <tr v-for="(row, index) in tableRows" :key="index"> 
                  <td><input id="cb1" type="checkbox" v-model="row.selected" @change="getSelectedRowData(row)"  style="margin:0px; height: 20px; width: 20px;"/></td>
                  <td>{{row.book}}</td>
                  <td>{{row.customer}}</td>
                  <td>{{row.borrowDate}}</td>
                  <td>{{row.borrowEndDate}}</td>
                  <td>
                      <button @click="updateReservation" type="button" class="btn btn-secondary"><i style="height: 15px; widows: 15px;" class="bi bi-pencil"></i></button>
                      <button @click="deleteReservation" type="button" class="btn btn-danger"><i style="height: 15px; widows: 15px;" class="bi bi-trash3"></i></button>
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
      const router = useRouter()
      const books = ref(["White Fang", "1984", "Animal Farm"]);
      const selectedBook = ref("")
      const customers = ref(["Nihat", "Cenk", "Fatih"]);
      const selectedCustomer = ref("")
      const currentDate = new Date().toISOString().split('T')[0];
      const borrowDate = ref(currentDate);
      const borrowEndDate = ref(currentDate);
      const tableRows = ref([]);
    
      const aaddReservation = async () => {
      const userToken = sessionStorage.getItem("userToken");
      var postData = {
        Book: selectedBook.value, 
        Customer: selectedCustomer.value,
        BorrowDate: borrowDate.value,
        BorrowEndDate: borrowEndDate.value
      };
      console.log(postData);
      let axiosConfig = {
        headers: {
          Authorization: 'Bearer ' + userToken
        }
      };

      console.log(sessionStorage.getItem("userToken"));
      
      if(userToken) {
        await axios.post('https://localhost:7227/api/reservations', postData, axiosConfig)
      .then(response => {
        console.log('reservation added:', response.data) 
        // Update UI here...
      })
      .catch(error => {
        console.error('Error adding reservation', error)
      })
    }
  }

  const addReservation = () => {
    if(selectedBook.value && selectedCustomer.value && borrowDate.value && borrowEndDate.value){
    const newReservation = {
      book: selectedBook.value,
      customer: selectedCustomer.value,
      borrowDate: borrowDate.value,
      borrowEndDate: borrowEndDate.value,
    };

    tableRows.value.push(newReservation);
    
    } else {
        alert('Please fill in all fields');
    }
  };  

  const deleteReservation = () => {
	    const selectedRows = tableRows.value.filter(row => row.selected)
	
	if(selectedRows.length > 0) {
		selectedRows.forEach(async (selectedRow) => {
		
		});
		tableRows.value = tableRows.value.filter(row => !row.selected)

        if(paginatedTableRows.value.length === 0 && currentPage.value > 1) {
            goToPage(currentPage.value - 1)
        }
	} else { 
	    alert('Select a reservation that you want to delete!')
	}
};

const updateReservation = async () => {
	const selectedRows = tableRows.value.filter(row => row.selected);
	
	if(selectedRows.length > 0) {
		selectedRows.forEach(async (selectedRow) => {
			const doc = await collectionRef.value.where('id', '==', selectedRow.id).limit(1).get();
			doc.forEach(async (entry) => {
				const docId = entry.id;
				
				await updateDoc(docId, {
					book: selectedBook.value,
                    customer: selectedCustomer.value,
                    borrowDate: borrowDate.value,
                    borrowEndDate: borrowEndDate.value,
				});
				tableRows.value.forEach(row => {
                    if(row.selected) {
                        row.selected = false;
                    }
                })
               
			});
		});
		
		
	} else {
        alert('Select a reservation that you want to update!')
    }
}

  const getSelectedRowData = (selectedRow) => {
        if(selectedRow.selected) {
            selectedBook.value = selectedRow.book;
            selectedCustomer.value = selectedRow.customer;
            borrowDate.value = selectedRow.borrowDate;
            borrowEndDate.value = selectedRow.borrowEndDate;
        } else {
            selectedBook.value = '';
            selectedCustomer.value = '';
            borrowDate.value = currentDate;
            borrowEndDate.value = currentDate;
        }
        
    }

    const getReservations = async () => {
      const userToken = sessionStorage.getItem("userToken");
      var getData = {
        Book: selectedBook.value, 
        Customer: selectedCustomer.value,
        BorrowDate: borrowDate.value,
        BorrowEndDate: borrowEndDate.value
      };
      console.log(getData);
      let axiosConfig = {
        headers: {
          Authorization: 'Bearer ' + userToken
        }
      };

      console.log(sessionStorage.getItem("userToken"));
      
      if(userToken) {
        await axios.post('https://localhost:7227/api/reservations', getData, axiosConfig)
      .then(response => {
        console.log('reservation added:', response.data) 
        // Update UI here...
      })
      .catch(error => {
        console.error('Error adding reservation', error)
      })
    }
    }

    // onMounted(() => {
    //   axios.get('https://localhost:7227/api', { 
    //     headers: {
    //       'Authorization': 'Bearer' + token
    //     } 
    //   })
    //   .then(response => {
    //     customers.value = response.data
    //   })
    //   .catch(error => {
    //     router.push({name: "home"})
    //   })
    // });

    return { books, selectedBook,  customers, selectedCustomer, borrowDate, borrowEndDate, tableRows, addReservation, deleteReservation, updateReservation, getSelectedRowData }
  }
}
</script>

<style scoped>
.reservations {
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
  padding-left: 50px;
}
th{
  width: 100px
}
</style>