import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Main, {mainLoader} from "./layouts/Main";
import Error from "./pages/Error";
import Dashboard, {dashboardAction, dashboardLoader} from "./pages/Dashboard";
import {logoutAction} from './actions/logout'
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main/>,
        loader: mainLoader,
        errorElement: <Error/>,
        children: [
            {
                // path: "/",
                index: true,
                element: <Dashboard/>,
                loader: dashboardLoader,
                action: dashboardAction,
                errorElement: <Error/>,
            },
            {
                path: "logout",
                action: logoutAction
            }
        ],
    },
    // {
    //   path: "*",
    //   element: <Error />,
    // },
]);

function App() {
    return (
        <>
            <div className="App">
                <RouterProvider router={router}/>
                <ToastContainer/>
            </div>
        </>
    );
}

export default App;
