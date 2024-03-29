import { useEffect,useState } from "react";
import { Link } from "react-router-dom";
import { Table } from "antd";
import { BiEdit, BiTrash } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { getProducts,resetState,deleteAProduct } from "../features/product/productSlice";
import CustomModal from "../components/CustomModal";

const columns = [
  {
    title: "#",
    dataIndex: "key",
    defaultSortOrder: "descend",
    sorter: (a, b) => a.key - b.key,
  },
  {
    title: "Title",
    dataIndex: "title",
    sorter: (a, b) => b.title.localeCompare(a.title),
    sortDirections: ["descend"],
  },
  {
    title: "Price",
    dataIndex: "price",
    sorter: (a, b) => a.price.length - b.price.length,
    sortDirections: ["descend"],
  },
  {
    title: "Qty",
    dataIndex: "quantity",
    defaultSortOrder: "descend",
    sorter: (a, b) => a.quantity - b.quantity,
  },
  {
    title: "Category",
    dataIndex: "category",
    sorter: (a, b) => b.title.localeCompare(a.title),
    sortDirections: ["descend"],
  },
  {
    title: "Brand",
    dataIndex: "brand",
    sorter: (a, b) => b.title.localeCompare(a.title),
    sortDirections: ["descend"],
  },
  {
    title: "Color",
    dataIndex: "color",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const ProductList = () => {
  const [open, setOpen] = useState(false);
  const [productId, setProductId] = useState("");

  const showModal = (e) => {
    setOpen(true);
    setProductId(e);
  };
  //console.log(brandId);
  const hideModal = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetState());
    dispatch(getProducts());
  }, [dispatch]);

  const productState = useSelector((state) => state.product.products);
  const data1 = [];
  for (let i = 0; i < productState.length; i++) {
    data1.push({
      key: i + 1,
      title: productState[i].title,
      price: `$${productState[i].price}`,
      quantity: productState[i].quantity,
      category: productState[i].category,
      brand: productState[i].brand,
      color: productState[i].color,
      action: (
        <>
          <Link className="text-danger fs-5" to={`/admin/product/${productState[i]._id}`}>
            <BiEdit />
          </Link>
          {/* <Link className="text-danger ms-3 fs-5" to="/">
            <BiTrash />
          </Link> */}
          <button
            className="text-danger ms-3 fs-5 bg-transparent border-0"
            onClick={() => showModal(productState[i]._id)}
          >
            <BiTrash />
          </button>
        </>
      ),
    });
  }

  const deleteProduct = (e) => {
    dispatch(deleteAProduct(e));
    setOpen(false);
    dispatch(resetState());
    setTimeout(() => {
      dispatch(getProducts());
    }, 300);
  };

  return (
    <div>
      <h3 className="mb-4 title">Products</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        open={open}
        hideModal={hideModal}
        title="Are you sure you want to delete this color?"
        performAction={() => deleteProduct(productId)}
      />
    </div>
  );
};

export default ProductList;
