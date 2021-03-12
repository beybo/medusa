export default {
    getSession(){
        return localStorage.getItem("token");
    }
}