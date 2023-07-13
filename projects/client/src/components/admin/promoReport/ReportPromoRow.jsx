import React from 'react'
import { Tr, Td, Button } from '@chakra-ui/react';


function ReportPromoRow({promo}) {
  return (
      <Tr>
          <Td>{promo.product_name }</Td>
          <Td>{promo.promo_name }</Td>
          <Td>{promo.description }</Td>
          <Td>{promo.waiting_date }</Td>
    </Tr>
  )
}

export default ReportPromoRow