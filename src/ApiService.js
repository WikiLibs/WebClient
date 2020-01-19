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

    searchSymbols(str, page) {
        let query = "?page=" + page;
        return (Axios.get(this.url + "/search/string/" + str + query, {
            'headers': {
                'Authorization': this.apiKey
            }
        }));
    }

    createUser(state) {
        let priv = true;

        state.private = "no" ? priv = false : "";

        return (Axios.post(this.url + "/auth/internal/register", {
                firstName: state.firstName,
                lastName: state.lastName,
                email: state.email,
                private: priv,
                profileMsg: state.profilMsg,
                pseudo: state.pseudo,
                password: state.password
        },
        {
            headers: {
                'Authorization': this.apiKey
            }
        })
        .then((Response) => {
            console.log(Response);
        })
        .catch( (error) => {
            console.log(error);
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
        let priv = true;
        let tmp;

        state.private = "no" ? priv = false : "";

        state.newPassword = "" ? tmp = state.password : tmp = state.newPassword;

        return (Axios.patch(this.url + "user/me" , {
            firstName: state.firstName,
            lastName: state.lastName,
            email: state.email,
            private: priv,
            profileMsg: state.profilMsg,
            pseudo: state.pseudo,
            curPassword: state.password,
            newPassword: tmp
        },
        {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            }
        })
        .then((Response) => {
            console.log(Response);
        })
        .catch( error => {
            console.log(error.response);
        }));
    }
}