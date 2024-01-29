import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {mainLoader} from "./layouts/Main";
import Error from "./pages/Error";
import Main from "./layouts/Main";
import Dashboard from "./pages/Dashboard";
import {dashboardLoader} from "./pages/Dashboard";
import {logoutAction} from './actions/logout'

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
            </div>
        </>
    );
}

export default App;
