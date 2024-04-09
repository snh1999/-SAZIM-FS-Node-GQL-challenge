import { createRoutesFromElements, createBrowserRouter, Route } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage";
import MainLayout from "../pages/layout/Mainlayout";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<MainLayout />}>
            <Route index element={<ErrorPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
        </Route>
    )
);
export default router;

// const router = createBrowserRouter(
//     createRoutesFromElements(
// <Route path="/" element={<Root />} loader={rootLoader} action={rootAction} errorElement={<ErrorPage />}>
//             {/* <Route errorElement={<ErrorPage />}>
//           <Route index element={<Index />} />
//           <Route
//             path="contacts/:contactId"
//             element={<Contact />}
//             loader={contactLoader}
//             action={contactAction}
//           />
//           <Route
//             path="contacts/:contactId/edit"
//             element={<EditContact />}
//             loader={contactLoader}
//             action={editAction}
//           />
//           <Route
//             path="contacts/:contactId/destroy"
//             action={destroyAction}
//           /> */}
//             {/* </Route> */}
//         </Route>
//     )
// );
