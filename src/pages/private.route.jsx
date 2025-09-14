import { useContext } from "react";
import { AuthContext } from "../components/context/auth.context";
import { Link, Navigate } from "react-router-dom";
import { Button, Result } from "antd";

const PrivateRoute = (props) => {
    const { user } = useContext(AuthContext);
    if (user && user.id) {
        return <>{props.children}</>;
    }

    // return <Navigate to="/login" replace />;
    return (
        <Result
            status="403"
            title="Oops!"
            subTitle={"You need login to use my web app"}
            extra={
                <Button type="primary">
                    {" "}
                    <Link to="/">
                        <span>back to home page</span>
                    </Link>
                </Button>
            }
        />
    );
};

export default PrivateRoute;
