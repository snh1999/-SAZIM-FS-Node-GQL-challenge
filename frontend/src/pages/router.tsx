import { createRoutesFromElements, createBrowserRouter, Route } from "react-router-dom";
import ErrorPage from "./ErrorPage";

const router = createBrowserRouter(createRoutesFromElements(<Route index element={<ErrorPage />} />));
export default router;
