import React from "react";
import "../components/PlanComplement.css";

type ItemProps = {
  InputTitle: string;
  InputPrice: number;
  InputText: string;
  checked: boolean;
  onCheck: () => void;
};

export default function PlanComplement({
  InputTitle,
  InputPrice,
  InputText,
  checked,
  onCheck,
}: ItemProps) {
  return (
    <div className="bg-set" onClick={onCheck}>
      <div className="InputAdjust">
        <div className="CheckPlan">
          <input type="checkbox" checked={checked} onChange={onCheck}></input>
          <p className="inputtitel">{InputTitle}</p>
        </div>
        <p className="priceinou">+ $ {InputPrice} /month</p>
      </div>
      <div className="InputText">{InputText}</div>
    </div>
  );
}
