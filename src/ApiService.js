import Axios from "axios";

export default class ApiService {
    url = process.env.REACT_APP_API_URL;
    apiKey = process.env.REACT_APP_API_KEY;

    getDebug() {
        return (Axios.get(this.url + "/debug"));
    }

    getLangs() {
        return (Axios.get(this.url + "/symbol/lang", {
            'headers': {
                'Authorization': this.apiKey
            }
        }));
    }

    getLibsPath(lang) {
        return (Axios.get(this.url + "/symbol/search/" + lang, {
            'headers': {
                'Authorization': this.apiKey
            }
        }));
    }

    getLibs(lang) {
        return (Axios.get(this.url + "/symbol/lib/" + lang, {
            'headers': {
                'Authorization': this.apiKey
            }
        }));
    }

    getSymbolByPath(path) {
        return (Axios.get(this.url + "/symbol?path=" + path, {
            'headers': {
                'Authorization': this.apiKey
            }
        }));
    }

    getSymbolById(id) {
        return (Axios.get(this.url + "/symbol?id=" + id, {
            'headers': {
                'Authorization': this.apiKey
            }
        }));
    }

    getSymbol() {
        return (Axios.get(this.url + "/symbol", {
            'headers': {
                'Authorization': this.apiKey
            }
        }));
    }

    searchSymbols(str, page) {
        let query = "?page=" + page;
        return (Axios.get(this.url + "/symbol/search/" + str + query, {
            'headers': {
                'Authorization': this.apiKey
            }
        }))
    }
}