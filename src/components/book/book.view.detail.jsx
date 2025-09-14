import { Drawer } from "antd";

const BookDetail = (props) => {
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
    const { onCloseDrawer, openDrawer, bookDetail } = props;

    return (
        <Drawer
            title="BookDetail"
            closable={true}
            onClose={onCloseDrawer}
            open={openDrawer}
            maskClosable={true}
            size="large">
            <p>
                <strong>Id: </strong>
                {bookDetail.id}
            </p>
            <p>
                <strong>Title: </strong>
                {bookDetail.title}
            </p>
            <p>
                <strong>Author: </strong>
                {bookDetail.author}
            </p>
            <p>
                <strong>Type: </strong>
                {bookDetail.category}
            </p>
            <p>
                <strong>Price: </strong>
                {bookDetail.price}
            </p>
            <p>
                <strong>Quantity: </strong>
                {bookDetail.quantity}
            </p>
            <p>
                <strong>Sold: </strong>
                {bookDetail.sold}
            </p>
            <div>
                <p>
                    <b>Thumbnail:</b>
                </p>
                <img
                    src={`${BACKEND_URL}/images/book/${bookDetail.thumbnail}`}
                    alt=""
                    width={200}
                />
            </div>
        </Drawer>
    );
};
export default BookDetail;
