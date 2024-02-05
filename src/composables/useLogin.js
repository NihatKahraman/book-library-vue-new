import { ref } from 'vue';
import axios from 'axios'


const error = ref(null)
const isPending = ref(false)


const login = async (email, password) => {
    error.value = null;
    isPending.value = true;
    try {
        await axios.post('https://localhost:7227/api/authentication/login', {Email: email,
        Password: password })
        .then(response => {
            sessionStorage.setItem("userToken", response.data.accessToken);
            console.log(sessionStorage.getItem("userToken"))
            console.log(sessionStorage.getItem("isUserAuthenticated"))
          })
        .catch(error => {
            console.error('Error logging in', error)
        })
        error.value = null;
        isPending.value = false;
        

    } catch (err) {
        console.log(err)
        error.value ='Incorrect login credentails'
        isPending.value = true;
    }
};

const useLogin = () => {
    return { error, login, isPending};
};

export default useLogin;