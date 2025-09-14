import { Button, Drawer, message, Modal, Pagination, Popconfirm, Space, Table, Tag } from "antd";
import { useEffect, useState } from "react";
import { deleteBookAPI, getAllBookAPI } from "../../services/book.api.service.js";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import BookDetail from "./book.view.detail.jsx";
import { BookForm } from "./book.form.jsx";
import BookUpdate from "./book.update.jsx";
import { BookFormUncontrolled } from "./book.from.uncontrolled.jsx";

const BookTable = (props) => {
    const {
        bookData,
        current,
        pageSize,
        total,
        setCurrent,
        setPageSize,
        setTotal,
        fetchBooks,
        isLoading,
        setIsLoading,
    } = props;

    const [openDrawer, setOpenDrawer] = useState(false);
    const [updateModalShow, setUpdateModalShow] = useState(false);
    const [bookUpdate, setBookUpdate] = useState({});
    const [bookDetail, setBookDetail] = useState({});

    const columns = [
        {
            title: "STT",
            dataIndex: "stt",
            key: "stt",
            render: (text, record, index) => <>{index + 1 + pageSize * (current - 1)}</>,
        },
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
            render: (text, record) => (
                <a
                    onClick={() => {
                        setOpenDrawer(true);
                        setBookDetail(record);
                    }}>
                    {text}
                </a>
            ),
        },
        {
            title: "Title",
            dataIndex: "title",
            key: "title",
        },
        {
            title: "Quantity",
            dataIndex: "quantity",
            key: "quantity",
        },
        {
            title: "Price",
            dataIndex: "price",
            key: "price",
        },
        {
            title: "Author",
            dataIndex: "author",
            key: "author",
        },
        {
            title: "Action",
            key: "action",
            render: (_, record) => (
                <Space size="middle">
                    <a>
                        <EditOutlined
                            style={{ color: "orange" }}
                            onClick={() => {
                                setBookUpdate(record);
                                setUpdateModalShow(true);
                            }}
                        />
                    </a>
                    <a>
                        {" "}
                        <Popconfirm
                            title="Delete the book"
                            description="Are you sure to delete this book?"
                            onConfirm={() => deleteBook(record.id)}
                            onCancel={() => {}}
                            okText="Yes"
                            cancelText="No">
                            <DeleteOutlined style={{ color: "red" }} />
                        </Popconfirm>
                    </a>
                </Space>
            ),
        },
    ];

    const onChange = (value) => {
        if (value?.current) {
            setCurrent(+value.current);
        }
        if (value?.pageSize) {
            setPageSize(+value.pageSize);
        }
    };
    const onCloseDrawer = () => {
        setOpenDrawer(false);
    };

    const deleteBook = async (id) => {
        const res = await deleteBookAPI(id);
        if (res) {
            message.success("success to delete this book");
            fetchBooks();
        } else {
            message.error("failed to delete this book");
        }
    };

    return (
        <div>
            <BookFormUncontrolled fetchBooks={fetchBooks} />
            <Table
                loading={isLoading}
                columns={columns}
                dataSource={bookData}
                pagination={{
                    current: `${current}`,
                    pageSize: `${pageSize}`,
                    total: `${total}`,
                    showSizeChanger: true,
                    showTotal: (total, range) => {
                        return (
                            <div>
                                {range[0]} - {range[1]} tren {total}rows
                            </div>
                        );
                    },
                }}
                onChange={onChange}
                rowKey="id"
            />
            <BookDetail
                onCloseDrawer={onCloseDrawer}
                openDrawer={openDrawer}
                bookDetail={bookDetail}
            />
            <BookUpdate
                updateModalShow={updateModalShow}
                setUpdateModalShow={setUpdateModalShow}
                bookUpdate={bookUpdate}
                fetchBooks={fetchBooks}
            />
        </div>
    );
};

export default BookTable;
