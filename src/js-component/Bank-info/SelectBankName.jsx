import React from "react";

const SelectBankName = (props) => {
  const { className, htmlFor, label, id, name, value, onChange } = props;

  return (
    <span className="inputFormStyle">
      <label htmlFor={htmlFor} >{label}</label>
      <select
        className={`selectStle ${className}`}
        name={name}
        id={id}
        value={value}
        onChange={onChange}
        required
      >
        <option>Select Bank</option>
        <optgroup label="Banks">
          <option value="Access Bank">Access Bank</option>
          <option value="Asset Management Corporation of Nigeria">Asset Management Corporation of Nigeria</option>
          <option value="Citibank Nigeria">Citibank Nigeria</option>
          <option value="Coronation Merchant Bank">Coronation Merchant Bank</option>
          <option value="Ecobank Nigeria">Ecobank Nigeria</option>
          <option value="First City Monument Bank">First City Monument Bank</option>
          <option value="Fidelity Bank">Fidelity Bank</option>
          <option value="First Bank of Nigeria">First Bank of Nigeria</option>
          <option value="Globus Bank">Globus Bank</option>
          <option value="Guaranty Trust Bank">Guaranty Trust Bank</option>
          <option value="Heritage Bank">Heritage Bank</option>
          <option value="Keystone Bank">Keystone Bank</option>
          <option value="Nova Merchant Bank">Nova Merchant Bank</option>
          <option value="Polaris Bank">Polaris Bank</option>
          <option value="Providus Bank">Providus Bank</option>
          <option value="Stanbic IBTC Bank">Stanbic IBTC Bank</option>
          <option value="Standard Chartered Bank Nigeria">Standard Chartered Bank Nigeria</option>
          <option value="Sterling Bank">Sterling Bank</option>
          <option value="SunTrust Bank">SunTrust Bank</option>
          <option value="Union Bank of Nigeria">Union Bank of Nigeria</option>
          <option value="United Bank for Africa">United Bank for Africa</option>
          <option value="Unity Bank">Unity Bank</option>
          <option value="Wema Bank">Wema Bank</option>
          <option value="Zenith Bank">Zenith Bank</option>
        </optgroup>
        <optgroup label="Microfinance Banks">
          <option value="AB Microfinance Bank">AB Microfinance Bank</option>
          <option value="Accion Microfinance Bank">Accion Microfinance Bank</option>
          <option value="Addosser Microfinance Bank">Addosser Microfinance Bank</option>
          <option value="Baobab Microfinance Bank">Baobab Microfinance Bank</option>
          <option value="Bosak Microfinance Bank">Bosak Microfinance Bank</option>
          <option value="Fortis Microfinance Bank">Fortis Microfinance Bank</option>
          <option value="Fullrange Microfinance Bank">Fullrange Microfinance Bank</option>
          <option value="Grooming Microfinance Bank">Grooming Microfinance Bank</option>
          <option value="HASAL Microfinance Bank">HASAL Microfinance Bank</option>
          <option value="Infinity Microfinance Bank">Infinity Microfinance Bank</option>
          <option value="LAPO Microfinance Bank">LAPO Microfinance Bank</option>
          <option value="Lift Above Poverty Organization (LAPO) Microfinance Bank">Lift Above Poverty Organization (LAPO) Microfinance Bank</option>
          <option value="Mainstreet Microfinance Bank">Mainstreet Microfinance Bank</option>
          <option value="Microcred Microfinance Bank">Microcred Microfinance Bank</option>
          <option value="Mutual Trust Microfinance Bank">Mutual Trust Microfinance Bank</option>
          <option value="NPF Microfinance Bank">NPF Microfinance Bank</option>
          <option value="Parallex Microfinance Bank">Parallex Microfinance Bank</option>
          <option value="Regent Microfinance Bank">Regent Microfinance Bank</option>
          <option value="Seedvest Microfinance Bank">Seedvest Microfinance Bank</option>
          <option value="Trustfund Microfinance Bank">Trustfund Microfinance Bank</option>
        </optgroup>
        <optgroup label="Fintechs">
          <option value="AppZone">AppZone</option>
          <option value="Carbon (formerly Paylater)">Carbon (formerly Paylater)</option>
          <option value="Cowrywise">Cowrywise</option>
          <option value="Eyowo">Eyowo</option>
          <option value="FairMoney">FairMoney</option>
          <option value="FINT">FINT</option>
          <option value="Flutterwave">Flutterwave</option>
          <option value="Interswitch">Interswitch</option>
          <option value="Kuda Bank">Kuda Bank</option>
          <option value="Lidya">Lidya</option>
          <option value="Mines.io">Mines.io</option>
          <option value="Mono">Mono</option>
          <option value="One Finance (OneFi)">One Finance (OneFi)</option>
          <option value="Opay">Opay</option>
          <option value="Paga">Paga</option>
          <option value="PayAttitude">PayAttitude</option>
          <option value="Paystack">Paystack</option>
          <option value="PiggyVest (formerly Piggybank)">PiggyVest (formerly Piggybank)</option>
          <option value="Quickteller">Quickteller</option>
          <option value="Remita">Remita</option>
          <option value="Renmoney">Renmoney</option>
          <option value="Risevest">Risevest</option>
          <option value="Riby">Riby</option>
          <option value="Switch">Switch</option>
          <option value="SystemSpecs">SystemSpecs</option>
          <option value="TeamApt">TeamApt</option>
          <option value="TradeDepot">TradeDepot</option>
          <option value="VoguePay">VoguePay</option>
          <option value="Wallets Africa">Wallets Africa</option>
          <option value="Xend Finance">Xend Finance</option>
        </optgroup>
      </select>
    </span>
  );
}

export default SelectBankName;