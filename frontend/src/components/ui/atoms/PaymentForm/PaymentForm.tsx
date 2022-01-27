import { FormEvent, useEffect, useState } from 'react'
import { IPayment } from '../../../../types'
import { DropDown } from '../DropDown/DropDown';
import { v4 as uuidv4 } from 'uuid';
import { Input } from '../Input/Input';

const mdb = require('mdb-ui-kit');

export interface PaymentFormProps {
  onSubmitPayment: (payment: IPayment) => void
}

export const PaymentForm = (props: PaymentFormProps) => {

  const paymentMethods = ['Credit Card', 'Debit Card', 'Pix'];
  const networks = ['Visa', 'MasterCard', 'American Express', 'Dinners'];


  const [network, setNetwork] = useState('' as string | undefined);
  const [pixCode, setPixCode] = useState(undefined as string | undefined);
  const [paymentMethod, setPaymentMethod] = useState('' as string | undefined);
  const [cardNumber, setCardNumber] = useState(undefined as string | number | undefined);
  const [cardSecurityCode, setCardSecurityCode] = useState(undefined as string | number | undefined);

  const formIsValid = (paymentMethod == 'Pix')  ?  true : (cardNumber && cardSecurityCode && network);


  useEffect(() => {
    setPixCode((paymentMethod == 'Pix') ? uuidv4() : undefined)
    setNetwork('');
    setCardNumber('');
    setCardSecurityCode('');
  }, [paymentMethod])


  return <div className="container container-fluid p-8">
    <form className="form-inline d-flex align-items-end flex-wrap" onSubmit={handleFormSubmit}>
      <div className="col-sm-6 col-xs-12 flex-fill">
        <DropDown
          placeholder="Select a payment method"
          value={paymentMethod || ''}
          valueList={paymentMethods}
          onSelect={setPaymentMethod}
        />
      </div>
      {
        paymentMethod != 'Pix' && <>
          <div className="col-sm-6 col-xs-12 flex-fill">
            <DropDown
              placeholder="Select a card network"
              value={network || ''}
              valueList={networks}
              onSelect={setNetwork}
            />
          </div>
          <div className="col-sm-6 col-xs-12 flex-fill">
            <Input
              inputId="cardNumber"
              label="Card Number"
              type="number"
              value={cardNumber}
              onChangeValue={setCardNumber} />
          </div>
          <div className="col-sm-6 col-xs-12 flex-fill">
            <Input
              inputId="cardSecurityCode"
              label="Security Code"
              type="number"
              value={cardSecurityCode}
              onChangeValue={setCardSecurityCode} />
          </div>
        </>
      }
      {
        paymentMethod == 'Pix' && <>
          <div className="col-sm-6 col-xs-12 flex-fill">
            <Input
              label="Please, use the following PIX code:"
              type="text"
              inputId="pixCode"
              disabled={true}
              value={pixCode} />
          </div>
        </>
      }

      <div className="col-6 flex-fill">

      </div>
      <div className="col-6 flex-fill pt-4  d-flex justify-content-end">
        <button className="btn btn-lg btn-primary" disabled={!formIsValid}>Finish Order</button>
      </div>
    </form>
  </div>


  function handleFormSubmit(event: FormEvent) {
    event.preventDefault();

    if (!paymentMethod) return;//@TODO do a better treatment

    const payment: IPayment = {
      network,
      pixCode,
      paymentMethod,
      cardNumber: cardNumber?.toString(),
      cardSecurityCode: cardSecurityCode?.toString(),
    }

    props.onSubmitPayment(payment);
  }
}