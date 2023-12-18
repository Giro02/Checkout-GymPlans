import React, { useState, useEffect } from "react";
import "./App.css";
import PlanLayout from "./components/PlanLayout";
import PlanComplement from "./components/PlanComplement";
import { PiTicketBold } from "react-icons/pi";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

<link
  href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap"
  rel="stylesheet"
></link>;

function App() {
  type BoxProp = {
    [key: string]: boolean;
  };
  type ClickProps = {
    [key: string]: boolean;
  };
  type Props = {
    Key: string;
    Amount: number;
  };
  type ItemProps = {
    Name: string;
    Price: number;
  };

  const AvCupons = ["blackfriday"];
  const [CheckBoxes, setCheckBoxes] = useState<BoxProp>({
    standart: false,
    plus: true,
    fit: false,
  });
  const [AddCupon, setAddCupon] = useState(false);
  const [DiscApply, setDiscApply] = useState(false);
  const [Total, setTotal] = useState(200);
  const [Cupon, setCupon] = useState<string>("");
  const [Click, setClick] = useState<ClickProps>({
    Coach: false,
    Nutri: false,
    Energy: false,
  });
  const [ExtraAmount, setExtraAmount] = useState(0);
  const [PlanAmount, setPlanAmount] = useState(199);

  //Function for the Inputs
  function ChangeState({ Name, Price }: ItemProps) {
    setCheckBoxes((PrevState) => {
      const copy = { ...PrevState };

      Object.keys(copy).forEach((key) => {
        copy[key] = false;
      });

      copy[Name] = true;
      return copy;
    });
    setPlanAmount(Price);
  }
  function ApplyTotal() {
    setTotal(() => {
      const pay = PlanAmount + ExtraAmount;
      return DiscApply ? pay - (pay * 15) / 100 : PlanAmount + ExtraAmount;
    });
  }

  function ChangeInput({ Key, Amount }: Props) {
    setClick((prev) => {
      const copy = { ...prev };
      copy[Key] = !copy[Key];
      return copy;
    });
    setExtraAmount((prevExtraAmount) => {
      const total = Click[Key]
        ? prevExtraAmount - Amount
        : prevExtraAmount + Amount;

      return total;
    });
  }
  useEffect(() => {
    ApplyTotal();
  }, [PlanAmount, ExtraAmount]);
  function Discount() {
    Cupon.toLowerCase();
    const DiscountAmount = (Total * 15) / 100;
    if (AvCupons.includes(Cupon) && !DiscApply) {
      alert("Discount Applyed");
      setTotal(Total - DiscountAmount);
      setDiscApply(true);
    }
    if (AvCupons.includes(Cupon) && DiscApply) {
      alert("Cupon already applyed");
    }
  }
  function ChangeCupon() {
    setAddCupon(() => {
      return !AddCupon;
    });
  }

  return (
    <div className="layout">
      <div className="mainbar">
        <p className="texto">CHOOSE THE MOST ADVANTAGEOUS PLAN FOR YOU:</p>
        <PlanLayout
          Name="plus"
          PlanName="PLUS PLAN"
          Accession="Zero"
          Fidelity="12 months"
          ExtraInfo="Train at over 1,500 Fit gyms! Get a private personal training coach whenever you want."
          Price={199.0}
          checked={CheckBoxes.plus}
          onCheck={() => ChangeState({ Name: "plus", Price: 199.9 })}
        ></PlanLayout>
        <PlanLayout
          Name="fit"
          PlanName="FIT PLAN"
          Accession="Zero"
          Fidelity="12 months"
          ExtraInfo="
          Train as much as you want in your unit and pay less for it."
          Price={149.0}
          checked={CheckBoxes.fit}
          onCheck={() => ChangeState({ Name: "fit", Price: 149.9 })}
        ></PlanLayout>
        <PlanLayout
          Name="standart"
          PlanName="STANDART PLAN"
          Accession="Zero"
          Fidelity="No fidelity"
          ExtraInfo="
          
Train whenever you want at the gym of your choice."
          Price={99.0}
          checked={CheckBoxes.standart}
          onCheck={() => ChangeState({ Name: "standart", Price: 99.9 })}
        ></PlanLayout>

        <p className="AddToPlan">WOULD YOU LIKE TO ADD TO YOUR PLAN?</p>
        <div>
          <PlanComplement
            InputTitle="FIT COACH"
            InputPrice={39.9}
            InputText="
Choose your teacher, define your goal and get more results! Ask your questions and personalize your training through periodic video calls with a specialized teacher. the package includes: 12 consultations + chat *minimum stay of twelve months"
            checked={Click.Coach}
            onCheck={() => {
              ChangeInput({ Key: "Coach", Amount: 39.9 });
            }}
          ></PlanComplement>
        </div>
        <div>
          <PlanComplement
            InputTitle="FIT NUTRI + FIT BODY"
            InputPrice={39.9}
            InputText="Boost your training results with an annual bioimpedance package and online consultations with a nutritionist specialized in your goal! With Smart Fit Nutri + Smart Fit Body, you have access to 4 consultations with nutri + personalized meal plan + exclusive chat with the nutritionist + 12 bioimpedance exams in Smart Fit units."
            checked={Click.Nutri}
            onCheck={() => {
              ChangeInput({ Key: "Nutri", Amount: 39.9 });
            }}
          ></PlanComplement>
        </div>
        <div>
          <PlanComplement
            InputTitle="FIT ENERGY"
            InputPrice={19.9}
            InputText="Recover your energy with the Smart Energy plan! Economy, flavor and hydration in the right amount. Try it!"
            checked={Click.Energy}
            onCheck={() => {
              ChangeInput({ Key: "Energy", Amount: 19.9 });
            }}
          ></PlanComplement>
        </div>
      </div>
      <div className="sidebar">
        <p className="PurchaseDet">PURCHASE DETAILS</p>
        <p className="CHOA">Choosed Gym: ******</p>
        <div className="AddCuponLayout">
          <div className="AddCupon" onClick={ChangeCupon}>
            <div className="TicketCupom">
              <PiTicketBold className="cupom" size={35}></PiTicketBold>
              <p className="cupoumText">Add Coupon</p>
            </div>

            <div>
              {AddCupon ? (
                <IoIosArrowUp size={25}></IoIosArrowUp>
              ) : (
                <IoIosArrowDown size={25}></IoIosArrowDown>
              )}
            </div>
          </div>

          {AddCupon && (
            <div>
              <p className="blackfridayCupom">
                Coupom "blackfriday" for 15% off
              </p>
              <div className="InputButton">
                <input
                  className="CupomBlack"
                  type="text"
                  onChange={(e) => {
                    setCupon(e.target.value);
                  }}
                ></input>
                <button
                  className="btnAdd"
                  type="submit"
                  onClick={() => {
                    Discount();
                  }}
                >
                  Add
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="TP">
          <p className="TotalPrice">Total:</p>
          <p className="dolsign"> $ </p>
          <p className="Price">{Total.toFixed(2)}</p>
          <p>/month</p>
        </div>
        <button className="checkout">Checkout</button>
      </div>
    </div>
  );
}

export default App;
