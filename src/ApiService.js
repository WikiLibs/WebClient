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

    translateErrorMessage(err) {
        switch (err.response.status) {
            case 401:
                return ("Bad credentials and/or Api token.");
            case 403:
                return ("You do not have permission to do that.");
            case 404:
                return ("The specified resource could not be found.");
            case 409:
                return ("A resource with the same identifier already exists.");
            case 500:
                return ("An internal server error occured, please contact server administrator.");
            default:
                return ("Unknown error");
        }
    }

    disconnect() {
        localStorage.removeItem('userToken');
        window.location.pathname = "/";
    }

    getLibsPath(lang) {
        return (Axios.get(this.url + "/symbol/search?Path=" + lang + "&PageOptions.Page=1", {
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
        let query = "&PageOptions.Page=" + page;
        return (Axios.get(this.url + "/symbol/search?Path=" + str + query, {
            'headers': {
                'Authorization': this.apiKey
            }
        }));
    }

    searchSymbolsSpecific(str, number) {
        let query = "&PageOptions.Count=" + number;
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
        return (Axios.post(this.url + "auth/internal/login", {
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
                window.location.pathname = "/";
            }));
    }

    refresh() {
        return (Axios.patch(this.url + "auth/refresh", null,
            {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('userToken')
                }
            })
            .then((response) => {
                localStorage.setItem('userToken', response.data);
            }));
    }

    getMe() {
        return (Axios.get(this.url + "user/me", {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            }
        }));
    }

    patchMe(state) {
        if (state.newPassword !== "") {
            return (Axios.patch(this.url + "user/me", {
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
            return (Axios.patch(this.url + "user/me", {
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