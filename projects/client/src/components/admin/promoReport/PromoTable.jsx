import React, { useEffect } from 'react'
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    TableContainer,
    Select,
  } from "@chakra-ui/react";
import { useDispatch } from 'react-redux';
import { fetchBonusItem, fetchProductDiscount, fetchTransactionDiscounts } from '../../../features/promo/promoReportsSlice';
import { useSelector } from 'react-redux';
import ReportPromoRow from './ReportPromoRow';

function PromoTable({ activeButton }) {
    const dispatch = useDispatch()
    const promos = useSelector(state=>state.promoReports.promos)
    useEffect(() => {
        if (activeButton === "Transaction Discount") {
            dispatch(fetchTransactionDiscounts())  
        } else if (activeButton === "Bonus Item") {
            dispatch(fetchBonusItem())
        } else {
            dispatch(fetchProductDiscount())
        }
        
    },[activeButton])
  return (
      <div>
    <TableContainer>
    <Table Table variant="simple">
      <Thead>
        <Tr>
          <Th>Product Name</Th>
          <Th>Promo Name</Th>
          <Th>Promo Description</Th>
          <Th>Date of Transaction</Th>
        </Tr>
      </Thead>
      <Tbody>
        {promos.map((promo)=>{
            return <ReportPromoRow promo={promo}/>
        })}
      </Tbody>
    </Table>
  </TableContainer>
</div>
  )
}

export default PromoTable