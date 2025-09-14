import { Button, Space, Table, Tag } from "antd";
import UpdateUserModal from "./UpdateUserModal";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import ViewUserDetail from "./view.user.detail";
import { Link } from "react-router-dom";
import DeleteUser from "./delete.user";
import { useState } from "react";
const UserTable = ({ dataUser, loadUser, current, pageSize, total, setCurrent, setPageSize }) => {
    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
    const [dataUpdate, setDataUpdate] = useState({});
    const [userDetail, setUserDetail] = useState({});
    const [isShowDetail, setIsShowDetail] = useState(false);

    const columns = [
        {
            title: "STT",
            render: (id, record, index) => {
                return <>{index + 1 + pageSize * (current - 1)}</>;
            },
        },
        {
            title: "Id",
            dataIndex: "_id",
            render: (_, record) => {
                return (
                    <a
                        onClick={() => {
                            setUserDetail(record);
                            setIsShowDetail(true);
                        }}
                        href="#">
                        {record._id}
                    </a>
                );
            },
        },
        {
            title: "Full Name",
            dataIndex: "fullName",
        },
        {
            title: "Email",
            dataIndex: "email",
        },
        {
            title: "Action",
            key: "action",
            render: (_, record) => (
                <div style={{ display: "flex", gap: "20px" }}>
                    <EditOutlined
                        onClick={() => {
                            setIsModalUpdateOpen(true);
                            setDataUpdate(record);

                            record;
                        }}
                        style={{ cursor: "pointer", color: "orange" }}
                    />
                    <DeleteUser loadUser={loadUser} userDetail={record} />
                </div>
            ),
        },
    ];
    const onChange = (pagination, filters, sorter, extra) => {
        if (pagination && pagination.current) {
            if (+pagination.current !== +current) {
                setCurrent(+pagination.current);
            }
        }
        if (pagination && pagination.pageSize) {
            if (+pagination.pageSize !== +pageSize) {
                setPageSize(+pagination.pageSize);
            }
        }
    };

    return (
        <div style={{ marginBottom: "20px" }}>
            <Table
                columns={columns}
                dataSource={dataUser}
                rowKey="_id"
                pagination={{
                    current: current,
                    pageSize: pageSize,
                    showSizeChanger: true,
                    total: total,
                    showTotal: (total, range) => {
                        return (
                            <div>
                                {range[0]} - {range[1]} tren {total}rows
                            </div>
                        );
                    },
                }}
                onChange={onChange}
            />
            <UpdateUserModal
                setIsModalUpdateOpen={setIsModalUpdateOpen}
                isModalUpdateOpen={isModalUpdateOpen}
                dataUpdate={dataUpdate}
                setDataUpdate={setDataUpdate}
                loadUser={loadUser}
            />
            <ViewUserDetail
                userDetail={userDetail}
                setUserDetail={setUserDetail}
                isShowDetail={isShowDetail}
                setIsShowDetail={setIsShowDetail}
                loadUser={loadUser}
            />
        </div>
    );
};

export default UserTable;
