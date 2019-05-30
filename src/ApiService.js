import Axios from "axios";

export default class ApiService {
    url = process.env.REACT_APP_API_URL;
    apiKey = process.env.REACT_APP_API_KEY;

    getLangs() {
        return (Axios.get(this.url + "/search/lang", {
            'headers': {
                'Authorization': this.apiKey
            }
        }));
    }

    getLibs(lang) {
        return (Axios.get(this.url + "/search/lang/" + lang, {
            'headers': {
                'Authorization': this.apiKey
            }
        }));
    }

    getSymbol(path) {
        return (Axios.get(this.url + "/symbol/" + path, {
            'headers': {
                'Authorization': this.apiKey
            }
        }));
    }

    searchSymbols(str, page) {
        let query = "?page=" + page;
        return (Axios.get(this.url + "/search/string/" + str + query, {
            'headers': {
                'Authorization': this.apiKey
            }
        }))
    }
}