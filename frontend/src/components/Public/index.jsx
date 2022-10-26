import LoopItem from "../LoopList/LoopItem";
import LoadingSpinner from "../../assets/nobg.gif";
import Logo from "../Logo";
import AuthButtons from "../LandingPage/AuthButtons";
import Footer from "../Footer";

import { useEffect, useState } from "react";
import loopit from "../../api/loopit";

const Public = () => {
  const [loops, setLoops] = useState([]);

  useEffect(() => {
    const fetchLoops = async () => {
      const res = await loopit.get("/loops/public");
      setLoops(res.data.loops);
    };
    fetchLoops();
  }, []);

  if (!loops) {
    return (
      <>
        <img src={LoadingSpinner} alt="Spinner" />
      </>
    );
  }

  return (
    <>
      <Logo link="/" />
      <AuthButtons />
      <h1 className="heading-primary">Public loops</h1>
      {loops.map((loop) => (
        <LoopItem collection={"all"} key={loop.id} loop={loop} />
      ))}
      <Footer />
    </>
  );
};

export default Public;
