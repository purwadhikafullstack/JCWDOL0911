import React from 'react'
import Sidebar from '../../components/admin/Sidebar'
import DiscountModal from '../../components/admin/discounts/DiscountModal'
import { useEffect,useState } from 'react'
import { fetchDiscounts } from '../../features/promo/promoSlice'
import { useDispatch } from 'react-redux'
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  TableContainer,
  Select,
} from "@chakra-ui/react";
import { useSelector } from 'react-redux'
import DiscountTableRow from '../../components/admin/discounts/DiscountTableRow'

function Discount() {
  const dispatch = useDispatch()
  const discounts = useSelector(state => state.promo.discounts)

  
  const renderDiscount = () => {
    let count =0
    return discounts.map((discount) => {
      count += 1
      return <DiscountTableRow discount={discount} count={count} />
    })
  }
  useEffect(() => {
    dispatch(fetchDiscounts())
  },[])
  return (
    <div className="w-screen h-full flex justify-between bg-slate-50">
      <div className="sidebar-width">
        <Sidebar />
      </div>
      <div className="min-h-screen h-full bg-dashboard-admin p-8 lg:p-28 flex flex-col gap-11 content-width">
        <h1 className="text-3xl font-bold">Discount's</h1>
        <DiscountModal/>
        <div className="bg-white px-6 pb-11 rounded-lg shadow-card-tagline">
        <TableContainer>
                <Table Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th>N0</Th>
                      <Th>Title</Th>
                      <Th>Description</Th>
                      <Th>Minimum Transaction</Th>
                      <Th>Discount/Bonus</Th>
                      <Th>Type</Th>
                      <Th>Action</Th>
                    </Tr>
                  </Thead>
              <Tbody>
                {renderDiscount()}
                  </Tbody>
                </Table>
              </TableContainer>

</div>
    </div>
    </div>
  )
}

export default Discount