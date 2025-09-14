import { useEffect, useState } from "react";
import BookTable from "../components/book/book.table";
import { getAllBookAPI } from "../services/book.api.service";

const BookPage = () => {
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [bookData, setBookData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [total, setTotal] = useState(0);
    useEffect(() => {
        fetchBooks(current, pageSize);
    }, [current, pageSize]);

    const fetchBooks = async (current, pageSize) => {
        setIsLoading(true);
        const res = await getAllBookAPI(current, pageSize);
        setTotal(res.meta.total);
        const data = res.result.map((e) => {
            return {
                id: e._id,
                title: e.mainText,
                quantity: e.quantity,
                price: e.price,
                author: e.author,
                category: e.category,
                thumbnail: e.thumbnail,
                sold: e.sold,
            };
        });

        setBookData(data);
        setIsLoading(false);
    };
    return (
        <div>
            <BookTable
                bookData={bookData}
                current={current}
                pageSize={pageSize}
                total={total}
                setCurrent={setCurrent}
                setPageSize={setPageSize}
                setTotal={setTotal}
                fetchBooks={fetchBooks}
                setIsLoading={setIsLoading}
                isLoading={isLoading}
            />
        </div>
    );
};
export default BookPage;
