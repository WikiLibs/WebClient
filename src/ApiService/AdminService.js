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
        return (Axios.get(this.url + "/admin/bot", {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            }
        }));
    }

    patchApp(id, app) {
        return (Axios.patch(this.url + "/admin/bot/" + id, app, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            }
        }));
    }

    postApp(app) {
        return (Axios.post(this.url + "/admin/bot", app, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            }
        }));
    }

    deleteApp(id) {
        return (Axios.delete(this.url + "/admin/bot/" + id, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            }
        }));
    }
}
