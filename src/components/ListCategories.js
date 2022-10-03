import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Loading from "./Loading";
import { Link } from "react-router-dom";
import Modal from "./Modal";
import axios from "axios";

const ListCategories = () => {
   const dispatch = useDispatch();
   const { categoriesState } = useSelector((state) => state);
   console.log("catState", categoriesState);

   const [showDeleteModal, setShowDeleteModal] = useState(false);
   const [silinecekCategory, setSilinecekCategory] = useState(null);
   const [silinecekCategoryName, setSilinecekCategoryName] = useState("");
   useEffect(() => {
      document.title = "Kitaplık - Kategoriler";
   }, []);

   const categorysil = (id) => {
      axios
         .delete(`http://localhost:3004/categories/${id}`)
         .then((res) => {
            console.log(res.data);
            dispatch({ type: "DELETE_CATEGORY", payload: id });
         })
         .catch((err) => {
            console.log("delete category err", err);
         });
   };

   if (categoriesState.success !== true) {
      return <Loading />;
   }

   return (
      <div className="container my-5">
         <div className="my-3 d-flex justify-content-end">
            <Link to="/add-category" className="btn btn-primary">
               Kategori ekle
            </Link>
         </div>
         <table className="table">
            <thead>
               <tr>
                  <th scope="col">Kategori Adı</th>
                  <th className="text-center" scope="col">
                     İşlem
                  </th>
               </tr>
            </thead>
            <tbody>
               {categoriesState.categories.map((category) => {
                  return (
                     <tr key={category.id}>
                        <td>{category.name}</td>

                        <td>
                           <div
                              className="btn-group d-flex justify-content-center"
                              role="group"
                           >
                              <button
                                 type="button"
                                 className="btn btn-outline-danger btn-sm mx-3"
                                 onClick={() => {
                                    setShowDeleteModal(true);
                                    // kitapSil(book.id)
                                    setSilinecekCategory(category.id);
                                    setSilinecekCategoryName(category.name);
                                 }}
                              >
                                 Delete
                              </button>
                              <Link
                                 to={`edit-category/${category.id}`}
                                 className="btn btn-sm btn-outline-secondary"
                              >
                                 Edit
                              </Link>
                           </div>
                        </td>
                     </tr>
                  );
               })}
            </tbody>
         </table>
         {showDeleteModal === true && (
            <Modal
               aciklama={`Silmek istediğinize emin misiniz?`}
               title={silinecekCategoryName}
               onConfirm={() => categorysil(silinecekCategory)}
               onCancel={() => setShowDeleteModal(false)}
            />
         )}
      </div>
   );
};

export default ListCategories;