import {redirect} from 'react-router-dom';
import {deleteItem} from "../helpers.js";

export async function logoutAction() {
    deleteItem({key: "userName"});
    return redirect("/");
}
