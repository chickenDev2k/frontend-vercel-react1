import { Button, Col, Divider, Form, Input, notification, Row } from "antd";
import { registerUserAPI } from "../services/user.api.service";
import { Link, useNavigate } from "react-router";

const RegisterPage = () => {
    const [form] = Form.useForm();
    let navigate = useNavigate();

    const onFinish = async (values) => {
        //call api
        const res = await registerUserAPI(
            values.fullName,
            values.email,
            values.password,
            values.phone
        );
        if (res.data) {
            notification.success({
                message: "Register User",
                description: "Dang ki user thanh cong ",
            });
            navigate("/login");
        } else {
            notification.error({
                message: "Register User error",
                description: JSON.stringify(res.message),
            });
        }
    };

    return (
        <div style={{ padding: "40px", margin: "0px auto" }}>
            <Row justify={"center"}>
                <Col xs={24} md={16} lg={12}>
                    <Form layout="vertical" form={form} onFinish={onFinish}>
                        <Row justify={"center"}>
                            <Col xs={24} md={8}>
                                <Form.Item
                                    label="Full Name"
                                    name="fullName"
                                    rules={[{ required: true, message: "input this field" }]}>
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row justify={"center"}>
                            <Col xs={24} md={8}>
                                <Form.Item
                                    label="Email"
                                    name="email"
                                    rules={[{ required: true, type: "email" }]}>
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row justify={"center"}>
                            <Col xs={24} md={8}>
                                <Form.Item label="Password" name="password">
                                    <Input.Password />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row justify={"center"}>
                            <Col xs={24} md={8}>
                                <Form.Item
                                    label="Phone Number"
                                    name="phone"
                                    rules={[
                                        {
                                            required: true,
                                            type: "regexp",
                                            pattern: new RegExp(/\d+/g),
                                            message: "Wrong format!",
                                        },
                                    ]}>
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row justify={"center"}>
                            <Col xs={24} md={8}>
                                <Form.Item label="">
                                    <Button type="primary" htmlType="submit" onClick={() => {}}>
                                        Register
                                    </Button>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                    <Divider />
                    <Row justify={"center"}>
                        <Col xs={24} md={8}>
                            Da co tai khoan <Link to={"/login"}>Dang nhap</Link>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    );
};

export default RegisterPage;
