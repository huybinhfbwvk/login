import { Fragment, useEffect } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { redirect } from "react-router-dom";
import PrivateRoutes from "./routes/index";
import DefaultLayout from "./layouts/DefaultLayout";

function App() {
  const token = localStorage.getItem("accessToken");
  // let checkToken;

  useEffect(() => {
    if (token === null) {
      redirect("/login");
    }
  }, [token]);

  return (
    <>
      <Router>
        <div className="App">
          <Routes>
            {PrivateRoutes.map((route: any, index: number) => {
              const Page = route.component;
              const Layout = route.layout === null ? Fragment : route.layout || DefaultLayout;

              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <Layout>
                      <Page />
                    </Layout>
                  }
                />
              );
            })}
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
//làm danh sách người dùng đi , phân trang, search , ....thêm mới
