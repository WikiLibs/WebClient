import Axios from "axios";

window.userMap = {};
window.userIconMap = {};
window.langIconMap = {};

export default class ApiService {
    url = process.env.REACT_APP_API_URL;
    apiKey = process.env.REACT_APP_API_KEY;
    erroReportKey = process.env.REACT_APP_ERROR_REPORT_KEY;

    getDebug() {
        return (Axios.get(this.url + "/debug"));
    }

    getErrorDebug() {
        return (Axios.get(this.url + "/debug/error/"));
    }

    getSymLangs() {
        return (Axios.get(this.url + "/symbol/lang", {
            'headers': {
                'Authorization': this.apiKey
            }
        }));
    }

    /////////////////////////////////////////////////////////

    getLangLibTable() {
        return (this.getSymLangs().then(async response => {
            let langs = [];
            //Required cause for some reasons after the first iteration Axios decided to fuck up it's own memory
            let forceDupe = JSON.parse(JSON.stringify(response.data));
            for (let k in forceDupe) {
                let elem = forceDupe[k];
                let lang = {
                    id: elem.id,
                    name: elem.name,
                    displayName: elem.displayName,
                    libs: []
                };
                let response = await this.getLibs(elem.id);
                lang.libs = response.data.data;
                langs.push(lang);
            }
            return (langs);
        }));
    }

    getSymTypes() {
        return (Axios.get(this.url + "/symbol/type", {
            'headers': {
                'Authorization': this.apiKey
            }
        }).then(response => response.data));
    }

    searchSymbols(query) {
        let q = ""
        if (query.path)
            q += "&Path=" + encodeURIComponent(query.path);
        if (query.lang)
            q += "&LangId=" + query.lang;
        if (query.lib)
            q += "&LibId=" + query.lib;
        if (query.type)
            q += "&TypeId=" + encodeURIComponent(query.type);
        q = q.substring(1);
        q += "&PageOptions.Page=" + query.page + "&PageOptions.Count=" + query.count;
        return (Axios.get(this.url + "/symbol/search?" + q, {
            'headers': {
                'Authorization': this.apiKey
            }
        }));
    }
    /////////////////////////////////////////////////////////

    getExamples(id) {
        let symbolId = "?SymbolId=" + id;
        return (Axios.get(this.url + "/example" + symbolId, {
            'headers': {
                'Authorization': this.apiKey
            }
        }));
    }

    pushNewExample(state) {
        return (Axios.post(this.url + "/example", {
            symbolId: state.symbolId,
            code: state.code,
            description: state.description
        },
            {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('userToken')
                }
            }));
    }

    pushNewRequestExample(state) {
        return (Axios.post(this.url + "/example/request", {
            message: state.message,
            method: state.method,
            data: state.data,
            applyTo: state.applyTo
        },
            {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('userToken')
                }
            }));
    }

    /////////////////////////////////////////////////////////

    getComments(id, page, count) {
        let q = "";
        if (id) {
            q += "?ExampleId=" + id;
        }
        if (page) {
            q += "&PageOptions.Page=" + page;
        }
        if (count) {
            q += "&PageOptions.Count=" + count;
        }
        return (Axios.get(this.url + "/example/comment" + q,
            {
                headers: {
                    'Authorization': this.apiKey
                }
            }));
    }

    postComment(id, comment) {
        return (Axios.post(this.url + "/example/comment", {
            exampleId: id,
            data: comment,
        },
            {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('userToken')
                }
            }));
    }

    destroyComment(id) {
        return (Axios.delete(this.url + "/example/comment/" + id,
            {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('userToken')
                }
            }));
    }
    /////////////////////////////////////////////////////////

    getInfoLib(libId) {
        return (Axios.get(this.url + "/symbol/lib/" + libId,
            {
                headers: {
                    'Authorization': this.apiKey
                }
            })
        );
    }

    getIconLib(libId) {
        return (Axios.get(this.url + "/symbol/lib/" + libId + "icon",
            {
                headers: {
                    'Authorization': this.apiKey
                }
            })
        );
    }

    patchLib(libId, query) {
        return (Axios.patch(this.url + "/symbol/lib/" + libId, {
            displayName: query.displayName,
            description: query.description,
            copyright: query.copyright
        },
            {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('userToken')
                }
            }));
    }

    /////////////////////////////////////////////////////////

    getInfoTree(libId) {
        return (Axios.get(this.url + "/symbol/lib/" + libId + "/tree/root",
            {
                headers: {
                    'Authorization': this.apiKey
                }
            }));
    }

    /////////////////////////////////////////////////////////

    translateErrorMessage(err) {
        if (err === null || err === undefined || err.response === null || err.response === undefined)
            return ("An impossible error has occured: AXIOS is a failure.");
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
        window.location.reload();
    }

    getLibs(lang) {
        return (Axios.get(this.url + "/symbol/lang/" + lang, {
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
        return (Axios.post(this.url + "/auth/internal/login", {
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
                window.history.back();
            }));
    }

    resetPassword(email) {
        return (Axios.post(this.url + "/auth/internal/reset", {
            email: email,
        },
            {
                headers: {
                    'Authorization': this.apiKey
                }
            })
            .then((Response) => {
                console.log("redirect forgot password");
            }));
    }

    refresh() {
        return (Axios.patch(this.url + "/auth/refresh", null,
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
        return (Axios.get(this.url + "/user/me", {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            }
        }));
    }

    getUser(uid) {
        return new Promise((resolve, reject) => {
            if (uid in window.userMap)
                resolve(window.userMap[uid]);
            else {
                Axios.get(this.url + "/user/" + uid, {
                    headers: {
                        'Authorization': this.apiKey
                    }
                }).then(response => {
                    window.userMap[uid] = response;
                    resolve(response);
                }, err => reject(err));
            }
        });
    }

    hackMUIMotherShit(dataStr, dataType) { //MUI is a fucking framework unable to respect the HTTP standard, guess what let's hack it
        const typeId = dataStr.indexOf(",");
        const val = dataStr.substring(typeId + 1);
        return "data:" + dataType + ";base64," + val;
    }

    getLangIcon(uid) {
        return new Promise((resolve, reject) => {
            if (uid in window.langIconMap)
                resolve(window.langIconMap[uid]);
            else {
                Axios.get(this.url + "/symbol/lang/" + uid + "/icon", {
                    headers: {
                        'Authorization': this.apiKey
                    }
                }).then(response => {
                    window.langIconMap[uid] = this.hackMUIMotherShit(response.data, "image/png");
                    resolve(window.langIconMap[uid]);
                }).catch(err => {
                    if (err.response.status === 404)
                        return;
                    reject(err)
                });
            }
        });
    }

    getUserIcon(uid) {
        return new Promise((resolve, reject) => {
            if (uid in window.userIconMap)
                resolve(window.userIconMap[uid]);
            else {
                Axios.get(this.url + "/user/" + uid + "/icon", {
                    headers: {
                        'Authorization': this.apiKey
                    }
                }).then(response => {
                    window.userIconMap[uid] = this.hackMUIMotherShit(response.data, "image/jpeg");
                    resolve(window.userIconMap[uid]);
                }).catch(err => {
                    if (err.response.status === 404)
                        return;
                    reject(err)
                });
            }
        });
    }

    setIconMe(data) {
        window.userIconMap = {};
        const f = new FormData();
        f.append("File", data);
        return Axios.put(this.url + "/user/me/icon", f, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('userToken'),
                'Content-Type': 'multipart/form-data'
            }
        });
    }

    patchMe(state) {
        if (state.newPassword !== "") {
            return (Axios.patch(this.url + "/user/me", {
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
            return (Axios.patch(this.url + "/user/me", {
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
    
    sendError(message, data) {
        return (Axios.post(this.url + "/error" , {
            "errorMessage": message,
            "errorData": data
        },
        {
            'headers': {
                'Authorization': this.erroReportKey
            }
        }));
    }

}
