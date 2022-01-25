import { FormEvent, useEffect, useState } from 'react'
import { IPayment } from '../../../../types'
import { DropDown } from '../DropDown/DropDown';
import { v4 as uuidv4 } from 'uuid';

const mdb = require('mdb-ui-kit');

export interface PaymentFormProps {
  onSubmitPayment: (payment: IPayment) => void
}

export const PaymentForm = (props: PaymentFormProps) => {

  const paymentMethods = ['Credit Card', 'Debit Card', 'Pix'];
  const networks = ['Visa', 'MasterCard', 'American Express', 'Dinners'];

  const [paymentMethod, setPaymentMethod] = useState('');
  const [network, setNetwork] = useState('');
  const [cardNumber, setCardNumber] = useState(undefined);
  const [cardSecurityCode, setCardSecurityCode] = useState(undefined);
  const [pixCode, setPixCode] = useState('');

  useEffect(()=>{
    if(paymentMethod == 'Pix'){
      setPixCode(uuidv4())
    }
  },[paymentMethod])


  return <div className="container container-fluid p-8">
    <form className="form-inline d-flex align-items-end flex-wrap" onSubmit={handleFormSubmit}>
      <div className="col-sm-6 col-xs-12 flex-fill">
        <DropDown
          placeholder="Select a payment method"
          value={paymentMethod}
          valueList={paymentMethods}
          onSelect={setPaymentMethod}
        />
      </div>
      {
        paymentMethod != 'Pix' && <>
          <div className="col-sm-6 col-xs-12 flex-fill">
            <DropDown
              placeholder="Select a card network"
              value={network}
              valueList={networks}
              onSelect={setNetwork}
            />
          </div>
          <div className="col-sm-6 col-xs-12 flex-fill">
            <div className="form-group">
              <label htmlFor="cardNumber">Card Number</label>
              <input
                value={cardNumber}
                onChange={(event) => setCardNumber(event.target.value as any)}
                type="number"
                className="form-control"
                id="cardNumber"
              />
            </div>
          </div>
          <div className="col-sm-6 col-xs-12 flex-fill">
            <div className="form-group">
              <label htmlFor="cardSecurityCode">Security Code</label>
              <input
                value={cardSecurityCode}
                onChange={(event) => setCardSecurityCode(event.target.value as any)}
                type="number"
                className="form-control"
                id="cardSecurityCode"
              />
            </div>
          </div>
        </>
      }
      {
        paymentMethod == 'Pix' && <>
          <div className="col-sm-6 col-xs-12 flex-fill">
            <div className="form-group">
              <label htmlFor="pixCode">Please, use the following PIX code:</label>
              <input
                 value={pixCode}
                type="text"
                className="form-control"
                id="pixCode"
                disabled
              />
            </div>
          </div>
        </>
      }

      <div className="col-6 flex-fill">

      </div>
      <div className="col-6 flex-fill pt-4  d-flex justify-content-end">
        <button className="btn btn-lg btn-primary">Finish Order</button>
      </div>
    </form>
  </div>


  function handleFormSubmit(event: FormEvent) {
    event.preventDefault();

    const payment: IPayment = {
      paymentMethod,
      network,
    }

    props.onSubmitPayment(payment);
  }
}