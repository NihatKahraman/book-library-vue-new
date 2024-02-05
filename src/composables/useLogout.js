import { ref } from 'vue';

const error = ref(null);
const isPending = ref(false)

const logout = async () => {
    error.value = null;
    isPending.value = true;
    try {
        isPending.value = false;
    } catch (error) {
        console.log(error.message)
        error.value = err.message;
        isPending.value = false;
    }
}

const useLogout = () => {
    return{logout,error,isPending};
};

export default useLogout;