import N from "../Assets/img/Narcy404.png";
import T1 from "../Assets/img/Cate/T1.png"
import T2 from "../Assets/img/Cate/T2.png"
import T3 from "../Assets/img/Cate/T3.png"
import T4 from "../Assets/img/Cate/T4.png"
import T5 from "../Assets/img/Cate/T5.png"
import T6 from "../Assets/img/Cate/T6.png"
import T7 from "../Assets/img/Cate/T7.png"
import T8 from "../Assets/img/Cate/T8.png"
import T9 from "../Assets/img/Cate/T9.png"
import T10 from "../Assets/img/Cate/T10.png"
import T11 from "../Assets/img/Cate/T11.png"
import T12 from "../Assets/img/Cate/T12.png"
import T13 from "../Assets/img/Cate/T13.png"
import T14 from "../Assets/img/Cate/T14.png"
import T15 from "../Assets/img/Cate/T15.png"
import T16 from "../Assets/img/Cate/T16.png"
import T17 from "../Assets/img/Cate/T17.png"
import T18 from "../Assets/img/Cate/T18.png"
import T19 from "../Assets/img/Cate/T19.png"
import T20 from "../Assets/img/Cate/T20.png"

const Cate = [
  [T1,"Men Cloth"],
  [T2,"Men Shoes"],
  [T3,"Men Bag"],
  [T4,"Baby Clothes"],
  [T5,"Hobby"],
  [T6,"Home Equipment"],
  [T7,"Handphone"],
  [T8,"Health"],
  [T9,"Skincare"],
  [T10,"Accessories"],
  [T11,"Watch"],
  [T12,"Electronic"],
  [T13,"Automotive"],
  [T14,"Sport"],
  [T15,"Women Cloth"],
  [T16,"Women Shoes"],
  [T17,"Women Bag"],
  [T18,"Computer"],
  [T19,"Books"],
  [T20,"Photograph"],
];

const Category = () => {
  return (
    <>
      <div className="categoryContainer">
        <div className="catTitle">
          <h2>Category</h2>
        </div>
        <div className="catContent">
          {Cate.map((CatName) => (
            <div className="catCard">
              <div className="ccImg">
                <span></span>
                <img src={CatName[0]} alt="Cat" />
              </div>
              <div className="ccName">
                <p>{CatName[1]}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Category;
