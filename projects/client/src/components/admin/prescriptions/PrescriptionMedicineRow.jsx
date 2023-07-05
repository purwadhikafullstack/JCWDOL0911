import React from 'react'
import { currency } from '../../../helpers/currency'
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
} from '@chakra-ui/react'

function PrescriptionMedicineRow({medicine}) {
  return (
      <Tr>
          <Td>{medicine.name}</Td>
          <Td>{medicine.quantity}</Td>
          <Td>{medicine.unit}</Td>
          <Td>{currency(medicine.price)}</Td>
    </Tr>
  )
}

export default PrescriptionMedicineRow