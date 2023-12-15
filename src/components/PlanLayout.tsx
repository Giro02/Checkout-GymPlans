import "../App.css";

type ItemProps = {
  PlanName: string;
  Accession: string;
  Fidelity: string;
  ExtraInfo: string;
  Price: number;
  Name: string;
  checked: boolean;
  onCheck: () => void;
};

export default function PlanLayout({
  PlanName,
  Accession,
  Fidelity,
  ExtraInfo,
  Name,
  Price,
  checked,
  onCheck,
}: ItemProps) {
  return (
    <div>
      <div className="Background" onClick={onCheck}>
        <div className="CardContent">
          <div className="box-gap">
            <input type="checkbox" checked={checked} onChange={onCheck}></input>

            <div className="Title-plan">{PlanName}</div>
          </div>

          <div className="AccessionLayout">
            <p>Accession</p>
            <p className="fidelity">{Accession}</p>
          </div>

          <div className="AccessionLayout">
            <p>Fidelity</p>
            <p className="fidelity">{Fidelity}</p>
          </div>

          <div className="PriceLayout">
            <p className="dolsign">$ </p>
            <p className="Price">{Price}</p>
            <p className="PriceDecimal">90 *</p>
          </div>
        </div>
        <div className="CardExtra">{ExtraInfo}</div>
      </div>
    </div>
  );
}
