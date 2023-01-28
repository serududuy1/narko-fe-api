import { Link } from 'react-router-dom'
import NARCY404 from '../Assets/img/Narcy404.png'

const NotFound = () => {

  const Back = () => {
    window.history.back();
  }

  return (
    <>
      <div className="nfContainer">
        <div className="nfImage">
          <img src={NARCY404} alt="Narcy-chan" />
          <h1>Uh Oh, Narcy-chan can't access this page</h1>
        </div>
          <button onClick={Back} className="nfHomepage">Go Back</button>
      </div>
    </>
  );
};
export default NotFound;
