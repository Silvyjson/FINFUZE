import HeaderButton from "../Other-component/form";
import Button from "../Button";
function Hero() {
  return (
    <>
      <div className="header_content">
        <div className="header-section_intro">
          <h1>
            FinFuze: Your All-in-One Financial Hub for{" "}
            <b>Secure Banking, Digital Wallet, and Smart Savings</b>!
          </h1>
          <p>
            Unlock Financial Freedom with FinFuze: Seamlessly Manage, Learn, and
            Save!
          </p>

          <div className="header_button-container">
            <Button type="primary header_button" width="20rem">
              Get started
            </Button>
            <Button type="secondary header_button" width="20rem">
              Learn More
            </Button>
          </div>
        </div>

        <div className="cube-img">
          <img src="./image/cube 3.png" alt="cube" />
        </div>
      </div>
    </>
  );
}

export default Hero;
