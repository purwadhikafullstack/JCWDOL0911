import CardProduct from "../../components/CardProduct";
import {
  fetchProduct,
  fetchProducts,
  setProducts,
} from "../../features/cart/productsSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import ProductsCard from "../../components/admin/products/ProductsCard";
import React, { useEffect, useState } from "react";
import Sidebar from "../../components/admin/Sidebar";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
  Tooltip,
} from "@chakra-ui/react";
import axios from "axios";
import Swal from "sweetalert2";
import { AUTH_TOKEN } from "../../helpers/constant";
import { useNavigate } from "react-router-dom";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { currency } from "../../helpers/currency";

function Products() {
  const LIMIT = 5;
  const token = localStorage.getItem(AUTH_TOKEN);
  const navigate = useNavigate();
  const [selectedFilter, setSelectedFilter] = useState({
    idcategory: undefined,
  });
  const [selectedSortBy, setSelectedSortBy] = useState({
    sort: undefined,
    key: undefined,
  });
  const [countData, setCountData] = useState(0);
  const [page, setPage] = useState(1);
  const products = useSelector((state) => state.product.products);
  const dispatch = useDispatch();

  const fetchAllProduct = async () => {
    try {
      let response = await axios.get(
        `${process.env.REACT_APP_API_BE}/admin/products/all`,
        {
          params: {
            idcategory: selectedFilter.idcategory,
            sort: selectedSortBy.sort,
            key: selectedSortBy.key,
            limit: LIMIT,
            page,
          },
          headers: { authorization: `Bearer ${token}` },
        }
      );
      console.log(response.data);
      dispatch(setProducts(response.data.products || []));
      setCountData(response.data.count);
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response?.data?.message,
      });
    }
  };

  const handleDetailProductPage = (idproduct) => {
    try {
      navigate(`/admin/products/${idproduct}`);
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response?.data?.message,
      });
    }
  };

  const getName = (name) => {
    if (name.length > 20) {
      return name.slice(0, 20) + "...";
    }
    return name;
  };

  const renderPagination = () => {
    // const pages = [...Array(Math.ceil(countData / LIMIT))];
    const pages = Array(Math.ceil(countData / LIMIT)).fill(undefined);
    return pages.map((el, i) => (
      <div
        key={i}
        onClick={() => setPage(i + 1)}
        className={`cursor-pointer py-1 px-2 rounded-md text-center ${
          page === i + 1 ? "bg-slate-900 text-white" : "text-black bg-slate-200"
        }`}
      >
        <p>{i + 1}</p>
      </div>
    ));
  };

  useEffect(() => {
    fetchAllProduct();
  }, [selectedFilter.idcategory, selectedSortBy.sort, page]);

  return (
    <>
      <div className="w-screen h-full flex justify-between bg-slate-50">
        <div className="sidebar-width">
          <Sidebar />
        </div>
        <div className="min-h-screen h-full bg-dashboard-admin p-8 lg:p-28 flex flex-col gap-11 content-width">
          <p className="text-3xl font-bold">Product List</p>
          <button
            className=" bg-green-600 text-white  font-bold h-10 px-2 rounded-md hover:bg-emerald-500 hover:text-white "
            onClick={() => navigate("/admin/products/unit-conversion")}
          >
            Unit's Conversion
          </button>
          <div className="bg-white px-6 pb-11 rounded-lg shadow-card-tagline">
            <div className="flex flex-wrap items-center my-11 gap-4 justify-between">
              <div className="flex flex-wrap gap-4">
                <div>
                  <Menu>
                    <MenuButton>
                      <div className="flex gap-2 bg-slate-800 text-white py-1 rounded-md font-bold px-3">
                        <div className="w-6">
                          <svg
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
                            ></path>
                          </svg>
                        </div>
                        <p>Filter</p>
                      </div>
                    </MenuButton>
                    <MenuList label={selectedFilter.idcategory}>
                      <MenuItem
                        onClick={() =>
                          setSelectedFilter({ idcategory: undefined })
                        }
                      >
                        <p className="text-black">All</p>
                      </MenuItem>
                      <MenuItem
                        onClick={() => setSelectedFilter({ idcategory: 1 })}
                      >
                        <p className="text-black">obat</p>
                      </MenuItem>
                      <MenuItem
                        onClick={() => setSelectedFilter({ idcategory: 2 })}
                      >
                        <p className="text-black">vitamin</p>
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </div>
                <div>
                  <Menu>
                    <MenuButton>
                      <div className="flex gap-1 bg-slate-800 text-white py-1 rounded-md font-bold pl-2 pr-3">
                        <div className="w-6">
                          <svg
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                            ></path>
                          </svg>
                        </div>
                        <p>Sort</p>
                      </div>
                    </MenuButton>
                    <MenuList label={selectedSortBy.sort}>
                      <MenuItem
                        onClick={() =>
                          setSelectedSortBy({ sort: "DESC", key: "name" })
                        }
                      >
                        <p className="text-black">Name: Z - A</p>
                      </MenuItem>
                      <MenuItem
                        onClick={() =>
                          setSelectedSortBy({ sort: "ASC", key: "name" })
                        }
                      >
                        <p className="text-black">Name: A - Z</p>
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </div>
              </div>
              <div>
                <div>
                  <Button className="button-primary">Add product</Button>
                </div>
              </div>
            </div>
            <TableContainer className="rounded-lg bg-table-list-color">
              <Table variant="striped" colorScheme="teal">
                <Thead className="table-list-head">
                  <Tr>
                    <Th color="white" fontSize="base">
                      No
                    </Th>
                    <Th color="white" fontSize="base">
                      Image
                    </Th>
                    <Th color="white" fontSize="base">
                      Name
                    </Th>
                    <Th color="white" fontSize="base">
                      Stock
                    </Th>
                    <Th color="white" fontSize="base">
                      Unit
                    </Th>
                    <Th color="white" fontSize="base">
                      Category
                    </Th>
                    <Th color="white" fontSize="base">
                      Price
                    </Th>
                    <Th color="white" fontSize="base">
                      Action
                    </Th>
                  </Tr>
                </Thead>
                <Tbody className="">
                  {products.map((product, index) => (
                    <Tr
                      key={product.idproduct}
                      // onClick={() =>
                      //   handlePageDetailUserQuestion(question.idquestion)
                      // }
                    >
                      <Td>{LIMIT * (page - 1) + 1 + index}</Td>

                      <Td>
                        <img
                          src={
                            product.product_image
                              ? product.product_image
                              : "../../assets/icon-medicine.png"
                          }
                          alt=""
                          width="44px"
                        />
                      </Td>

                      <Td>{getName(product.name)}</Td>
                      <Td>
                        {product.stock === 0 ? (
                          <p className="text-red-600 font-bold">out of stock</p>
                        ) : (
                          product.stock
                        )}
                      </Td>
                      <Td>{product.unit ? product.unit : <p>-</p>}</Td>
                      <Td>
                        {product.category_name ? (
                          product.category_name
                        ) : (
                          <p>-</p>
                        )}
                      </Td>
                      <Td>{currency(product.price)}</Td>
                      <Td>
                        <Button
                          className="border-button"
                          onClick={() =>
                            handleDetailProductPage(product.idproduct)
                          }
                        >
                          See detail
                        </Button>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
            <div className="flex w-full gap-4 justify-center mt-11">
              {renderPagination()}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Products;
