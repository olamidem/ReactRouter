//loader
//react router dom import
import { useLoaderData } from "react-router-dom";

//helper function
import { fetchData } from "../helpers";

export function dashboardLoader() {
  const userName = fetchData("userName");
  return { userName };
}

const Dashboard = () => {
  const { userName } = useLoaderData();
  return (
    <div>
      <h1>{userName }</h1>
      <h3>Dashboard</h3>
    </div>
  );
};

export default Dashboard;
