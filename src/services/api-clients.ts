import axios from "axios";

export default axios.create ({
    baseURL: 'https://api.rawg.io/api/',
    params:{
        key:'5f38f61b270b41baabe4239bc37c3872'
    }

});