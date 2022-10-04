import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import axios from "axios";
import Loading from "../components/Loading";
import { useDispatch } from "react-redux";

const EditCategory = (props) => {
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const [category, setCategory] = useState(null);
   const [allCategories, setAllCategories] = useState("");
   const [newCategoryName, setNewCategoryName] = useState("");
   const params = useParams();
   console.log(params);

   useEffect(() => {
      axios
         .get(`http://localhost:3004/categories`)
         .then((res) => {
            console.log(res.data);
            setAllCategories(res.data);
            const myCategory = res.data.find(
               (item) => item.id == params.categoryId
            );
            setCategory(myCategory);
            setNewCategoryName(myCategory.name);
         })
         .catch((err) => console.log("editcategoryerr", err));
   }, []);

   const handleEdit = (event) => {
      event.preventDefault();
      if (newCategoryName === "") {
         alert("kategori ismi boş bırakılamaz");
         return;
      }
      const hasCategory = allCategories.find(
         (item) => item.name.toLowerCase() === newCategoryName.toLowerCase()
      );
      console.log("has catogry", hasCategory);
      if (hasCategory !== undefined) {
         alert("Bu kategori ismi zaten mevcut");
         return;
      }
      const newCategory = {
         ...category,
         name: newCategoryName,
      };
      axios
         .put(`http://localhost:3004/categories/${category.id}`, newCategory)
         .then((res) => {
            console.log(res.data);
            dispatch({ type: "EDIT_CATEGORY", payload: newCategory });
            navigate("/categories");
         })
         .catch((err) => console.log("editcategoryputErr", err));
   };

   if (allCategories === null) {
      return <Loading />;
   }
   return (
      <div>
         <Header />
         <div className="container my-5">
            <form onSubmit={handleEdit}>
               <div className="mb-3">
                  <label for="exampleInputEmail1" className="form-label">
                     Kategori İsmi
                  </label>
                  <input
                     type="text"
                     className="form-control"
                     id="exampleInputEmail1"
                     value={newCategoryName}
                     onChange={(event) =>
                        setNewCategoryName(event.target.value)
                     }
                  />
               </div>
               <div className="d-flex justify-content-center ">
                  <button type="submit" className="btn btn-primary w-25">
                     Kaydet
                  </button>
               </div>
            </form>
         </div>
      </div>
   );
};
export default EditCategory;
