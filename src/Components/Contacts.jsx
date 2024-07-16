import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { FaPencil, FaTrashCan } from "react-icons/fa6";
import CircleLoader from "react-spinners/CircleLoader";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const customStyles = {
      headCells: {
            style: {
                  fontSize: 1 + "rem",
                  fontWeight: "bolder",
                  whiteSpace: "normal"
            }
      },
      cells: {
            style: {
                  fontSize: 0.9 + "rem",
                  fontWeight: 400,
                  whiteSpace: "normal"
            }
      }
};

const MySwal = withReactContent(Swal);

const Contacts = () => {
      const [contacts, setContacts] = useState([]);
      const [loading, setLoading] = useState(false);

      const deleteContact = (id) => {
            MySwal.fire({
                  title: "Are you sure?",
                  text: "You won't be able to revert this!",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "Yes, delete it!"
            }).then((result) => {
                  if (result.isConfirmed) {
                        axios.delete(`https://contact-nest-server.vercel.app/contact-nest/contact/${id}`, {
                              headers: {
                                    Authorization: `Bearer ${localStorage.getItem("token")}`
                              }
                        })
                        .then((res) => {
                              setContacts(res.data.contacts);
                              MySwal.fire({
                                    title: "Deleted!",
                                    text: "Your file has been deleted.",
                                    icon: "success"
                              });
                        })
                        .catch((err) => {
                              MySwal.fire({
                                    title: "Error!",
                                    text: "Error Occurred..!",
                                    icon: "error"
                              });
                        })
                  }
            });
      };
      const columns = [
            {
                  name: "Name",
                  selector: (row) => row.name
            },
            {
                  name: "Email ID",
                  selector: (row) => row.email
            },
            {
                  name: "Phone Number",
                  selector: (row) => row.phone
            },
            {
                  name: "City Name",
                  selector: (row) => row.address
            },
            {
                  name: "Action",
                  selector: (row) => <>
                        <Link><FaTrashCan className="table-icon-2" onClick={() => deleteContact(row._id)} /></Link>
                  </>
            }
      ]
      useEffect(() => {
            setLoading(true);
            axios.get("https://contact-nest-server.vercel.app/contact-nest/contacts", {
                  headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                  }
            }).then((res) => {
                  if (res.data.success) {
                        setContacts(res.data.contacts);
                        setLoading(false);
                  }
            }).catch(err => {
                  console.log(err);
                  setLoading(false);
            });
      }, []);
      return (
            <>
            {
                  loading ? 
                  <div className="loader">
                        <CircleLoader loading={loading} size={50} aria-label="Loading Spinner" data-testide="loader"></CircleLoader>
                  </div> :
                  <div className="contact-list">
                        <DataTable columns={columns} data={contacts} customStyles={customStyles} pagination></DataTable>
                        {
                              contacts.length === 0 ? <h1>Add contacts to view here...</h1> : <></>
                        }
                  </div>
            }         
            </>
      );
};

export default Contacts;
