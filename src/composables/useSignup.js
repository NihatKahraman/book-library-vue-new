import { ref } from 'vue';
import axios from 'axios'

const error = ref(null)
const isPending = ref(false)
const signup = async (firstName, lastName, username, email, password, phonenumber, role ) => {
    error.value = null
    isPending.value = true;
    try {
        console.log(firstName, lastName, username, password, email, phonenumber, role)
        await axios.post('https://localhost:7227/api/authentication/register', {
        FirstName: firstName,
        LastName: lastName,
        UserName: username,
        Password: password, 
        Email: email,
        PhoneNumber: phonenumber,
        Roles: [role]
        })
        .then(response => {
            console.log('signed up:' + response.data)
          })
        .catch(error => {
            console.error('Error logging in', error)
        })
        error.value = null;
        isPending.value = false;
    } catch (err) {
        console.log(err.message)
        error.value = err.message
        isPending.value = false;
    }
};

const useSignup = () => {
    return { error, signup, isPending };
};

export default useSignup;