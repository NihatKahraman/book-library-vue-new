<template>
  <div class="customers">
   <div class="firstRow" style="text-align: left;">
           <form class="form-group">
             <div class="firstField">
              <div style="margin-bottom: 15px; padding-left: 10px;">
                  <button type="button" class="btn btn-primary" id="search">Search</button>
                  <button type="button" class="btn btn-primary" id="add" @click="addCustomer">Add</button>
                </div>
              <label for="Name">
                    Name <input type="text" class="form-control" name="Name" id="name" required v-model="name">
                </label>
                <label for="Gender">Gender
                  <select name="gender" id="gender" class="form-select" style="cursor: pointer;" required v-model="selectedGender">
                      <option v-for="gender in genders" :key="gender" style="cursor: pointer;">{{ gender }}</option>
                  </select>
                </label>
               <div class="secondField">
                <label for="Phone Number">
                    Phone Number <input type="number" class="form-control" name="PhoneNumber" id="phoneNumber" style="width: 110px;" maxlength="10" required v-model="phoneNumber">
                </label>
                <label for="Age">
                    Age <input type="number" class="form-control" name="number" id="number" maxlength="3" required v-model="age">
                </label>
               </div>
             </div>
           </form>
       </div>
       <div class="secondRow">
        <table class="table table-dark table-striped"> 
          <thead>
              <tr>
                  <th id="th1" style="margin:0px; height: 20px; width: 20px;"></th>
                  <th>Name</th>
                  <th>Gender</th>
                  <th>Phone Number</th>
                  <th>Age</th>
                  <th style="width: 30px;"></th>
              </tr>
          </thead>
              <tbody>
                  <tr v-for="(row, index) in tableRows" :key="index">
                      <td><input id="cb1" type="checkbox" v-model="row.selected" @change="getSelectedRowData(row)" style="margin:0px; height: 20px; width: 20px;"  /></td>
                      <td>{{row.name}}</td>
                      <td>{{row.gender}}</td>
                      <td>{{row.phoneNumber}}</td>
                      <td>{{row.age}}</td>
                      <td>
                        <button @click="updateCustomer" type="button" class="btn btn-secondary"><i style="height: 15px; widows: 15px;" class="bi bi-pencil"></i></button>
                        <button @click="deleteCustomer" type="button" class="btn btn-danger"><i style="height: 15px; widows: 15px;" class="bi bi-trash3"></i></button>
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
    const customers = ref([])
    
    const router = useRouter()
    const name = ref("");
    const genders = ref(["Female", "Male"]);
    const selectedGender = ref("");
    const phoneNumber = ref("");
    const age = ref("");
    const tableRows = ref([]);

    const aaaddCustomer = async () => {
      const userToken = sessionStorage.getItem("userToken");
      var postData = {
        Name: name.value, 
        Gender: selectedGender.value,
        PhoneNumber: phoneNumber.value,
        Age: age.value
      };
      console.log(postData);
      let axiosConfig = {
        headers: {
          Authorization: 'Bearer ' + userToken
        }
      };

      console.log(sessionStorage.getItem("userToken"));
      
      if(userToken) {
        await axios.post('https://localhost:7227/api/customers', postData, axiosConfig)
      .then(response => {
        console.log('customer added:', response.data) 
        // Update UI here...
      })
      .catch(error => {
        console.error('Error adding customer', error)
      })
    }
  }

  const addCustomer = () => {
        if(name.value && selectedGender.value && phoneNumber.value && age.value){
        const newCustomer = {
          name: name.value,
          gender: selectedGender.value,
          phoneNumber: phoneNumber.value,
          age: age.value,
        };
        tableRows.value.push(newCustomer);
        
        } else {
            alert('Please fill in all fields');
        }
        
    };

    const deleteCustomer = () => {
	    const selectedRows = tableRows.value.filter(row => row.selected)
	
	if(selectedRows.length > 0) {
		selectedRows.forEach(async (selectedRow) => {
		
		});
		tableRows.value = tableRows.value.filter(row => !row.selected)

   
	} else { 
	    alert('Select a customer that you want to delete!')
	}
};

const updateCustomer = async () => {
	const selectedRows = tableRows.value.filter(row => row.selected);
	
	if(selectedRows.length > 0) {
		selectedRows.forEach(async (selectedRow) => {
			const doc = await collectionRef.value.where('id', '==', selectedRow.id).limit(1).get();
			doc.forEach(async (entry) => {
				const docId = entry.id;
				
				await updateDoc(docId, {
					name: name.value,
          gender: selectedGender.value,
          phoneNumber: phoneNumber.value,
          age: age.value,
				});
				tableRows.value.forEach(row => {
          if(row.selected) {
              row.selected = false;
          }
        })
               
			});
		});
		
		
	} else {
        alert('Select a customer that you want to update!')
    }
}

  const getSelectedRowData = (selectedRow) => {
          if(selectedRow.selected) {
              name.value = selectedRow.name;
              selectedGender.value = selectedRow.gender;
              phoneNumber.value = selectedRow.phoneNumber;
              age.value = selectedRow.age;
          } else {
              name.value = '';
              selectedGender.value = '';
              phoneNumber.value = '';
              age.value = '';
          }
          
      }

      const getCustomers = async () => {
        const userToken = sessionStorage.getItem("userToken");
      var getData = {
        Name: name.value, 
        Gender: selectedGender.value,
        PhoneNumber: phoneNumber.value,
        Age: age.value
      };
      console.log(getData);
      let axiosConfig = {
        headers: {
          Authorization: 'Bearer ' + userToken
        }
      };

      console.log(sessionStorage.getItem("userToken"));
      
      if(userToken) {
        await axios.get('https://localhost:7227/api/customers', getData, axiosConfig)
      .then(response => {
        console.log('customer added:', response.data) 
        // Update UI here...
      })
      .catch(error => {
        console.error('Error adding customer', error)
      })
    }
      }

    return {name, genders, selectedGender, phoneNumber, age, customers, tableRows, addCustomer, deleteCustomer, updateCustomer, getSelectedRowData }
  }
}
</script>

<style scoped>
.customers {
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