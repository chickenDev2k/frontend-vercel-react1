import { Link, NavLink, useNavigate } from "react-router-dom";
// import "./header.css";
import { Menu, message } from "antd";
import {
    AliwangwangOutlined,
    AppstoreAddOutlined,
    AppstoreOutlined,
    BookOutlined,
    HomeOutlined,
    LoginOutlined,
    MailOutlined,
    ReadOutlined,
    SettingOutlined,
    UsergroupDeleteOutlined,
} from "@ant-design/icons";
import { useContext, useState } from "react";
import { AuthContext } from "../context/auth.context";
import { logoutAPI } from "../../services/user.api.service";
const Header = () => {
    const { user, setUser } = useContext(AuthContext);

    const [current, setCurrent] = useState("");
    const onClick = (e) => {
        "click ", e;
        setCurrent(e.key);
    };
    const navigate = useNavigate();
    const handleLogout = async () => {
        alert("me");
        const res = await logoutAPI();
        if (res.data) {
            //clear data
            localStorage.removeItem("access_token");
            setUser({
                email: "",
                phone: "",
                fullName: "sss",
                role: "",
                avatar: "",
                id: "",
            });
            message.success("Logout thanh cong");
            //redirect to homepage
            navigate("/");
        }
    };
    const items = [
        {
            label: <Link to={"/"}>Home</Link>,
            key: "home",
            icon: <HomeOutlined />,
        },
        {
            label: <Link to={"/users"}>Users</Link>,
            key: "users",
            icon: <UsergroupDeleteOutlined />,
        },
        {
            label: <Link to={"/books"}>Books</Link>,
            key: "books",
            icon: <BookOutlined />,
        },

        ...(!user.id
            ? [
                  {
                      label: <Link to={"/login"}>Đăng nhập</Link>,
                      key: "login",
                      icon: <LoginOutlined />,
                  },
              ]
            : []),
        ...(user.id
            ? [
                  {
                      label: `Welcome ${user.fullName}`,
                      key: "setting",
                      icon: <AliwangwangOutlined />,
                      children: [
                          {
                              label: <span onClick={handleLogout}>"Đăng xuất"</span>,
                              key: "logout",
                          },
                      ],
                  },
              ]
            : []),
    ];

    return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />;
};
export default Header;
