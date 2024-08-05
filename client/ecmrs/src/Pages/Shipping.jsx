import { Country, State } from "country-state-city";
import TransferWithinAStationIcon from "@material-ui/icons/TransferWithinAStation";
import PinDropIcon from "@material-ui/icons/PinDrop";
import PublicIcon from "@material-ui/icons/Public";
import PhoneIcon from "@material-ui/icons/Phone";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import HomeIcon from "@material-ui/icons/Home";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { Fragment, useState } from "react";
import CheckoutSteps from "../components/CheckoutSteps";
import { safeshippinginfo } from "../action/cartAction";
import { useNavigate } from "react-router-dom";

function Shipping() {
  const dispatch = useDispatch();
  const alert = useAlert();
  // Provide a default value if shippinginfo is undefined
  const { shippinginfo = {} } = useSelector((state) => state.cart);

  const [address, setAddress] = useState(shippinginfo.address || "");
  const [city, setCity] = useState(shippinginfo.city || "");
  const [state, setState] = useState(shippinginfo.state || "");
  const [country, setCountry] = useState(shippinginfo.country || "");
  const [pincode, setPincode] = useState(shippinginfo.pincode || "");
  const [phoneno, setPhoneno] = useState(shippinginfo.phoneno || "");

  const navigate = useNavigate();
  const shippingSubmit = (e) => {
    e.preventDefault();
    if (phoneno.length < 10 || phoneno.length > 10) {
      alert.error("Phone number should be 10 digits");
      return;
    }
    dispatch(
      safeshippinginfo({ address, city, state, country, pincode, phoneno })
    );
    navigate("order/confirm");
  };

  return (
    <Fragment>
      <CheckoutSteps activeSteps={0} />
      <div>
        <div>
          <h2>Shipping Details</h2>
          <form encType="multipart/form-data" onSubmit={shippingSubmit}>
            <div>
              <HomeIcon />
              <input
                type="text"
                placeholder="Address"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div>
              <LocationCityIcon />
              <input
                type="text"
                placeholder="City"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <div>
              <PinDropIcon />
              <input
                type="text"
                placeholder="Pincode"
                required
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
              />
            </div>
            <div>
              <PhoneIcon />
              <input
                type="number"
                placeholder="Phone Number"
                required
                value={phoneno}
                onChange={(e) => setPhoneno(e.target.value)}
              />
            </div>
            <div>
              <PublicIcon />
              <select
                required
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              >
                <option value="">Country</option>
                {Country &&
                  Country.getAllCountries().map((item) => (
                    <option key={item.isoCode} value={item.isoCode}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>
            {country && (
              <div>
                <TransferWithinAStationIcon />
                <select
                  required
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                >
                  <option value="">State</option>
                  {State &&
                    State.getStatesOfCountry(country).map((item) => (
                      <option key={item.isoCode} value={item.isoCode}>
                        {item.name}
                      </option>
                    ))}
                </select>
              </div>
            )}
            <input
              type="submit"
              value="Continue"
              disabled={!state}
            />
          </form>
        </div>
      </div>
    </Fragment>
  );
}

export default Shipping;
