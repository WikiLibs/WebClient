import Axios from "axios";

export default class AdminService {
    url = process.env.REACT_APP_API_URL;
    apiKey = process.env.REACT_APP_API_KEY;

    getGroups() {
        return (Axios.get(this.url + "/admin/group", {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            }
        }));
    }

    patchGroup(id, group) {
        return (Axios.patch(this.url + "/admin/group/" + id, group, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            }
        }));
    }

    postGroup(group) {
        return (Axios.post(this.url + "/admin/group", group, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            }
        }));
    }

    deleteGroup(id) {
        return (Axios.delete(this.url + "/admin/group/" + id, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            }
        }));
    }

    getApiKeys() {
        return (Axios.get(this.url + "/admin/apikey", {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            }
        }));
    }

    patchApiKey(id, apiKey) {
        return (Axios.patch(this.url + "/admin/apikey/" + id, apiKey, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            }
        }));
    }

    postApiKey(apiKey) {
        return (Axios.post(this.url + "/admin/apikey", apiKey, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            }
        }));
    }

    deleteApiKey(id) {
        return (Axios.delete(this.url + "/admin/apikey/" + id, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            }
        }));
    }

    getApps() {
        return (Axios.get(this.url + "/bot", {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            }
        }));
    }

    patchApp(id, app) {
        return (Axios.patch(this.url + "/bot/" + id, app, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            }
        }));
    }

    postApp(app) {
        return (Axios.post(this.url + "/bot", app, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            }
        }));
    }

    deleteApp(id) {
        return (Axios.delete(this.url + "/bot/" + id, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            }
        }));
    }

    postSymbolType(type) {
        return (Axios.post(this.url + "/symbol/type", type, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            }
        }));
    }

    patchSymbolType(id, type) {
        return (Axios.patch(this.url + "/symbol/type/" + id, type, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            }
        }));
    }

    deleteSymbolType(id) {
        return (Axios.delete(this.url + "/symbol/type/" + id, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            }
        }));
    }

    postSymbolLang(lang) {
        return (Axios.post(this.url + "/symbol/lang", lang, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            }
        }));
    }

    patchSymbolLang(id, lang) {
        return (Axios.patch(this.url + "/symbol/lang/" + id, lang, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            }
        }));
    }

    deleteSymbolLang(id) {
        return (Axios.delete(this.url + "/symbol/lang/" + id, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            }
        }));
    }

    setIconLang(uid, data) {
        window.langIconMap = {};
        const f = new FormData();
        f.append("File", data);
        return Axios.put(this.url + "/symbol/lang/" + uid + "/icon", f, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('userToken'),
                'Content-Type': 'multipart/form-data'
            }
        });
    }

    getExampleRequests(pageNum) {
        return (Axios.get(this.url + "/example/request?PageOptions.Page=" + pageNum + "&PageOptions.Count=100", {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            }
        }));
    }

    acceptExampleRequest(id) {
        return (Axios.put(this.url + "/example/request/apply/" + id, null, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            }
        }));
    }

    deleteExampleRequest(id) {
        return (Axios.delete(this.url + "/example/request/" + id, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            }
        }));
    }

}
