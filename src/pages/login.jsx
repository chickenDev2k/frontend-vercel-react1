import { Form, notification, Row, Col, Input, Button, Divider, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { loginUserAPI } from "../services/user.api.service";
import { useContext, useState } from "react";
import { AuthContext } from "../components/context/auth.context";

const LoginPage = () => {
    const { setUser } = useContext(AuthContext);
    const [form] = Form.useForm();
    const [isLoading, setIsLoading] = useState(false);
    let navigate = useNavigate();

    const onFinish = async (values) => {
        //call login api

        setIsLoading(true);
        const res = await loginUserAPI(values.email, values.password);
        if (res.data) {
            message.success({
                message: "Login User",
                description: "Dang nhap thanh cong ",
            });
            localStorage.setItem("access_token", res.data.access_token);
            setUser(res.data.user);

            navigate("/");
        } else {
            notification.error({
                message: "Login User error",
                description: JSON.stringify(res.message),
            });
        }
        setIsLoading(false);
    };

    return (
        <Row justify={"center"} style={{ margin: "40px auto" }}>
            <Col xs={24} md={18} lg={6}>
                <p style={{ textAlign: "center", fontSize: "3em" }}>Login</p>

                <Form layout="vertical" form={form} onFinish={onFinish}>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: "input this field" }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Password" name="password">
                        <Input.Password
                            onKeyDown={(event) => {
                                if (event.key === "Enter") form.submit();
                            }}
                        />
                    </Form.Item>
                </Form>
                <Row justify={"space-between"}>
                    <Button loading={isLoading} type="primary" onClick={() => form.submit()}>
                        Login
                    </Button>
                    <Link to={"/"}>Go to homepage</Link>
                </Row>
                <Divider />
                <Row justify={"center"}>
                    <Link to={"/register"}>Chua co tai khoan? Dang ki tai khoan </Link>
                </Row>
            </Col>
        </Row>
    );
};

export default LoginPage;
