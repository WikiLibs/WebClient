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
}
