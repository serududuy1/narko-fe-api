import BBig from '../Assets/img/BannerBig.png'
import BSLeft from '../Assets/img/BannerSmallLeft.png'
import BSRight from '../Assets/img/BannerSmallRight.png'

const Slider = () => {
  return (
    <div className="slider-container">
        <img className='s1' src={BBig} alt="Slider1"/>
        <div className="slider-right">
          <img className='s2' src={BSLeft} alt="Slider2" />
          <img className='s2' src={BSRight} alt="Slider3" />
        </div>
    </div>
  );
};

export default Slider;
