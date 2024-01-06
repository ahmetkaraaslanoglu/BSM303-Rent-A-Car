import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import './App.css';
import {IndexPage} from "./Pages/Vechiles/IndexPage";
import {CreatePage} from "./Pages/Vechiles/CreatePage";
import {ShowPage} from "./Pages/Vechiles/ShowPage";
import {CustomerIndexPage} from "./Pages/Customers/CustomerIndexPage";
import {CustomerCreatePage} from "./Pages/Customers/CustomerCreatePage";
import {EmployessIndexPage} from "./Pages/Employess/EmployessIndexPage";
import {EmployessCreatePage} from "./Pages/Employess/EmployessCreatePage";
import {MaintenanceIndexPage} from "./Pages/Maintenance/MaintenanceIndexPage";
import {MaintenanceCreatePage} from "./Pages/Maintenance/MaintenanceCreatePage";
import {TransactionsIndexPage} from "./Pages/Transactions/TransactionsIndexPage";
import {TransactionCreatePage} from "./Pages/Transactions/TransactionCreatePage";

function App() {
  return (
      <>
        <BrowserRouter>
          <Routes>
            <Route
                path="/"
                element={<Navigate to="/vehicles" />}
            />
            <Route index path="/vehicles/*" element={(
                <Routes>
                  <Route path="/" element={<IndexPage/>}/>
                  <Route path="/create" element={<CreatePage/>}/>
                  <Route path="/:vehiclesId" element={<ShowPage/>}/>
                </Routes>
            )} />

            <Route path="/customers/*" element={(
                <Routes>
                  <Route path="/" element={<CustomerIndexPage/>}/>
                  <Route path="/create" element={<CustomerCreatePage/>}/>
                </Routes>
            )} />

            <Route path="/employess/*" element={(
                <Routes>
                  <Route path="/" element={<EmployessIndexPage/>}/>
                  <Route path="/create" element={<EmployessCreatePage/>}/>
                </Routes>
            )} />

            <Route path="/maintenance/*" element={(
                <Routes>
                  <Route path="/" element={<MaintenanceIndexPage/>}/>
                  <Route path="/create" element={<MaintenanceCreatePage/>}/>
                </Routes>
            )} />

            <Route path="/transactions/*" element={(
                <Routes>
                  <Route path="/" element={<TransactionsIndexPage/>}/>
                  <Route path="/create" element={<TransactionCreatePage/>}/>
                </Routes>
            )} />
          </Routes>
        </BrowserRouter>
      </>
  );
}

export default App;

