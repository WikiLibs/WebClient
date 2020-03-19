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
        return (Axios.get(this.url + "/symbol/search?Path=" + lang +"&PageOptions.Page=1", {
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
        }));
    }

    searchSymbolsSpecific(str, number) {
        let query = "?Count=" + number;
        return (Axios.get(this.url + "/symbol/search?Path=" + str + query + "&PageOptions.Page=1", {
            'headers': {
                'Authorization': this.apiKey
            }
        }));
    }

    createUser(state) {
        return (Axios.post(this.url + "/auth/internal/register", {
                firstName: state.firstName,
                lastName: state.lastName,
                email: state.email,
                private: state.private,
                profileMsg: state.profilMsg,
                pseudo: state.pseudo,
                password: state.password
        },
        {
            headers: {
                'Authorization': this.apiKey
            }
        }));
    }

    connectUser(state) {
        return (Axios.post(this.url + "auth/internal/login" , {
                email: state.email,
                password: state.password
            },
            {
                headers: {
                    'Authorization': this.apiKey
            }
        })
        .then((Response) => {
            localStorage.setItem('userToken', Response.data);
            console.log(Response);
            window.location.pathname = "/";
        })
        .catch(error => {
            console.log(error.response);
        }));
    }

    getMe() {
        return (Axios.get(this.url + "user/me" , {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            }
        })
        .catch( error => {
            console.log(error.response);
        }));
    }

    patchMe(state) {
        if (state.newPassword !== "") {
            return (Axios.patch(this.url + "user/me" , {
                firstName: state.firstName,
                lastName: state.lastName,
                email: state.email,
                private: state.private,
                profileMsg: state.profileMsg,
                pseudo: state.pseudo,
                curPassword: state.password,
                newPassword: state.newPassword
            },
            {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('userToken')
                }
            }));
        } else {
            return (Axios.patch(this.url + "user/me" , {
                firstName: state.firstName,
                lastName: state.lastName,
                email: state.email,
                private: state.private,
                profileMsg: state.profileMsg,
                pseudo: state.pseudo,
                curPassword: state.password,
            },
            {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('userToken')
                }
            }));
        }
    }
}