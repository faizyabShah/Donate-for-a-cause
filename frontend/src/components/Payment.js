import { PaymentInputsWrapper, usePaymentInputs } from "react-payment-inputs";
import { useState } from "react";

import images from "react-payment-inputs/images";

export default function PaymentInputs() {
  const {
    wrapperProps,
    getCardImageProps,
    meta,
    getCardNumberProps,
    getExpiryDateProps,
    getCVCProps,
  } = usePaymentInputs();

  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvc, setCVC] = useState("");

  const handleChangeCardNumber = (e) => {
    setCardNumber(e.target.value);
  };

  const handleChangeExpiryDate = (e) => {
    setExpiryDate(e.target.value);
  };

  const handleChangeCVC = (e) => {
    setCVC(e.target.value);
  };

  return (
    <PaymentInputsWrapper {...wrapperProps}>
      <svg {...getCardImageProps({ images })} />
      <input
        {...getCardNumberProps({ onChange: handleChangeCardNumber })}
        value={cardNumber}
      />
      <input
        {...getExpiryDateProps({ onChange: handleChangeExpiryDate })}
        value={expiryDate}
      />
      <input {...getCVCProps({ onChange: handleChangeCVC })} value={cvc} />
      {meta.isTouched && meta.error && <span>Error: {meta.error}</span>}
    </PaymentInputsWrapper>
  );
}
