import React, { useState } from 'react';
import { currency } from '../../../helpers/currency';
import { Tr, Td, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteDiscount, disableDiscount, enableDiscount } from '../../../features/promo/promoSlice';
import EditRow from './EditRow';

function DiscountTableRow({ discount, count }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(false);

  const handleDisable = () => {
    dispatch(disableDiscount(discount.idpromo));
  };
  const handleEnable = () => {
    dispatch(enableDiscount(discount.idpromo));
  };

  const handleEdit = () => {
    setEdit(true);
  };

  return (
    <>
      {edit ? (
        <EditRow discount={discount} count={count} setEdit={setEdit} />
      ) : (
        <Tr className={`${discount.isDisable?'bg-slate-400':''}`}>
          <Td>{count}</Td>
          <Td>{discount.name}</Td>
          <Td>{discount.description}</Td>
          <Td>
            {discount.type === 'Bonus Item'
              ? `${discount.condition} item`
              : currency(discount.condition)}
          </Td>
          <Td>
            {discount.type === 'Bonus Item'
              ? `${discount.discount} item`
              : `${discount.discount}%`}
          </Td>
          <Td>{discount.type}</Td>
            <Td>
              {!discount.isDisable ? (
              
                discount.type === 'Transaction Discount'  ? (
                  <div className="flex gap-3">
                <Button colorScheme="red" size="sm" onClick={handleDisable}>
                  Disable
                </Button>
                <Button colorScheme="teal" size="sm" onClick={handleEdit}>
                  Edit
                </Button>
              </div>
            ) : (
              <div className="flex gap-3">
                <Button colorScheme="red" size="sm" onClick={handleDisable}>
                  Disable
                </Button>
                <Button
                  colorScheme="teal"
                  size="sm"
                  onClick={() =>
                    navigate(`/admin/discounts/manage-products/${discount.idpromo}`)
                  }
                  >
                  Manage
                </Button>
              </div>
            )
            )
                : (<Button colorScheme="teal" size="sm" onClick={handleEnable}>
                Enable
                </Button>)}
          </Td>
        </Tr>
      )}
    </>
  );
}

export default DiscountTableRow;
