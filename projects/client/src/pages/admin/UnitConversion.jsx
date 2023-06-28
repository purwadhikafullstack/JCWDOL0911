import React from 'react'
import Sidebar from '../../components/admin/Sidebar'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { fetchConverted, fetchProducts } from '../../features/cart/productsSlice'
import { useSelector } from 'react-redux'
import ProductsCard from '../../components/admin/products/ProductsCard'
import ConvertedUnitCard from '../../components/admin/products/ConvertedUnitCard'
import { useState } from 'react'
import ConvertUnitModal from '../../components/admin/products/ConvertUnitModal'
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  TableContainer,
  Select
} from '@chakra-ui/react'
import ProductsConversionRow from '../../components/admin/products/ProductsConversionRow'

function UnitConversion() {
  const [order, setOrder] = useState('DESC')
  const [filter,setFilter]=useState('')
    const products = useSelector(state=>state.product.products)
    const dispatch = useDispatch()
    const [open,setOpen] = useState(false)
    useEffect(() => {
        dispatch(fetchProducts(order,filter))
        },[order,filter])
  return (
    <div className="w-screen h-full flex justify-between bg-slate-50">
    <div className="w-80">
      <Sidebar />
    </div>
      <div className=" h-screen bg-dashboard-admin p-11 "
        style={{ width: "calc(100vw - 320px)" }}> 
        <div className='flex flex-col gap-2 lg:gap-6'>
          <h1 className='text-3xl font-bold lg:text-5xl'>Unit's Conversion</h1>
          <ConvertUnitModal product={products} />
          <div className="flex gap-4">
          <Select onChange={(e)=>setFilter(e.target.value)} >
  <option value=''>Filter : -</option>
  <option value='converted'>Filter : Converted Only</option>
  <option value='not converted'>Filter : Not Converted Only</option>
</Select>
          <Select  onChange={(e)=>setOrder(e.target.value)}>
  <option value='DESC'>Sort By : Name (A-Z)</option>
  <option value='ASC'>Sort By : Name (Z-A)</option>
</Select>
            </div>
    <TableContainer>
  <Table Table variant='simple'>
    <Thead>
      <Tr>
        <Th>Name</Th>
        <Th>Default Unit</Th>
        <Th >Stock</Th>
        <Th >Convert Into</Th>
        <Th >Converted Stock</Th>
                  <Th > <p>
                  Unconverted 
                  </p>
          Stock</Th>
        <Th >Action</Th>
      </Tr>
    </Thead>
     <Tbody>
                {products.map((product) => {
                  return <ProductsConversionRow product={product} order={order} filter={filter } />
        })}    
    </Tbody>
    </Table>
    </TableContainer>

     
        </div>
        </div>
      </div>
  )
}

export default UnitConversion