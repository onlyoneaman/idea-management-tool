import {useEffect, useState} from "react";
import {useLocation, Route, Routes} from "react-router-dom";
import ManagePage from "./ManagePage";

const Home = () => {
    const loc = useLocation()

    useEffect(() => {
    }, [])

    useEffect(() => {
    }, [loc.search])

    return(
        <Routes>
            <Route
                path={"/"}
                element={<ManagePage />}
            />
            <Route
                path={"*"}
                element={<p>404</p>}
            />
        </Routes>
    )
}

export default Home