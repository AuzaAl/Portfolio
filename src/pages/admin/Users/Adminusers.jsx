import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ColoredButton from "../../../components/common/Coloredbutton";
import { FiChevronDown, FiEdit2, FiTrash2, FiX } from "react-icons/fi";
import { Datainput } from "../../../components/common/Datainput";
import { supabase } from "../../../createClient";
import { Skeletonloader } from "../../../components/common/Skeletonloader";
import { Inputsidebar } from "../../../components/sections/Inputsidebar";
import fadeupVariants from "../../../../public/assets/animations/fadeupVariants";
import sidebarVariants from "../../../../public/assets/animations/sidebarVariants";
import overlayVariants from "../../../../public/assets/animations/overlayVariants";
import { Modal } from "../../../components/common/Modal";

export const Adminusers = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [id, setId] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [user, setUser] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [modeSidebar, setModeSidebar] = useState('');

  useEffect(() => {
    fetchUser();
  }, []);

  async function fetchUser() {
    setIsLoading(true);
    const { data, error } = await supabase.from("tblUsers").select("*");
    if (error) {
      console.error("Error fetching users", error);
    } else {
      setUser(data || []);
    }
    setIsLoading(false);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (id) {
      console.log(id);
      // Jika sedang edit (id ada), maka update si data
      const { error } = await supabase
        .from("tblUsers")
        .update({
          firstname,
          lastname,
          email,
          password,
          role,
        })
        .eq("id", id);

      if (error) {
        console.error("Error updating user", error);
      } else {
        resetForm();
        fetchUser();
      }
    } else {
      console.log("no id");
      // Jika tidak ada id, maka insert baru si data
      const { error } = await supabase.from("tblUsers").insert({
        firstname,
        lastname,
        email,
        password,
        role,
      });

      if (error) {
        console.error("Error inserting user", error);
      } else {
        resetForm();
        fetchUser();
      }
    }
  };

  // ini fungsi reset form agar form tetap kosong
  const resetForm = () => {
    setId("");
    setFirstname("");
    setLastname("");
    setEmail("");
    setPassword("");
    setRole("user");
    setIsOpen(false);
  };

  const handleEdit = async (id) => {
    const { data, error } = await supabase
      .from("tblUsers")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Error fetching user for edit", error);
    } else {
      setModeSidebar('edit');
      setId(id);
      setFirstname(data.firstname);
      setLastname(data.lastname);
      setEmail(data.email);
      setPassword(data.password);
      setRole(data.role);
      setIsOpen(true);
    }
  };

  async function handleDelete(userid) {
    setSelectedId(userid);
    setShowModal(true);
  }

  const handleConfirmDelete = async () => {
    try {
      const { error } = await supabase
        .from("tblUsers")
        .delete()
        .eq("id", selectedId);
      if (error) {
        console.error("Error deleting user", error);
      } else {
        fetchUser();
        setShowModal(false);
      }
    } catch (error) {
      console.error("Error deleting user", error);
    }
  };
  

  return (
    <div>
      <Modal
        overlayVariants={overlayVariants}
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      >
        <div className=" flex flex-col">
          <div
            id="text"
            className="text-white p-4 flex flex-col justify-between text-center"
          >
            <h1 className="font-lex font-semibold text-2xl">
              Confirm Deletion
            </h1>
            <p className="font-inst text-[1.1rem] my-3">
              Deleting this data is irreversible. Please confirm your decision
            </p>
          </div>
          <div
            id="button"
            className="w-full flex flex-row justify-center gap-3"
          >
            <ColoredButton
              text="DELETE"
              variant="delete"
              Icon={FiTrash2}
              onClick={handleConfirmDelete}
            />

            <ColoredButton
              text="CLOSE"
              variant="default"
              Icon={FiX}
              onClick={() => setShowModal(false)}
            />
          </div>
        </div>
      </Modal>
      <div id="Title" className="mb-2">
        <h1 className="text-white font-lex font-bold text-3xl">
          USERS DASHBOARD
        </h1>
      </div>
      <div className="border border-phantom-600 w-full bg-phantom-900 px-2 py-2">
        <ColoredButton
          Icon={FiChevronDown}
          variant="success"
          text="INSERT"
          onClick={() => {
            resetForm();
            setModeSidebar('insert');
            setIsOpen(true);
          }}
        />
      </div>
      <Inputsidebar
        Htext="user"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        overlayVariants={overlayVariants}
        sidebarVariants={sidebarVariants}
        handlesubmit={handleSubmit}
        Mode={modeSidebar}
      >
        <Datainput
          title="Firstname"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
          required
        />
        <Datainput
          title="Lastname"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
          required
        />
        <Datainput
          title="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Datainput
          title="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Datainput
          title="Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
        />
      </Inputsidebar>

      <div
        style={{ maxWidth: "calc(100vw - 257px)" }}
        className="w-full h-[calc(100dvh-8rem)] overflow-y-auto border border-phantom-600"
      >
        <div className="overflow-x-auto h-full">
          <motion.table
            variants={fadeupVariants}
            initial="hidden"
            animate="show"
            className="border-collapse text-white font-lex text-[13px] text-left w-full"
          >
            <thead className="[&>tr>th]:border-phantom-600 [&>tr>th]:border-b [&>tr>th]:border-r [&>tr>th]:px-2 [&>tr>th]:min-w-45 [&>tr>th]:py-1.5 [&>tr>th]:bg-phantom-800">
              <tr>
                <th>ID</th>
                <th>Firstname</th>
                <th>Lastname</th>
                <th>Email</th>
                <th>Password</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody
              className="[&>tr>td]:border-phantom-600 [&>tr>td]:border-b [&>tr>td]:border-r [&>tr>td]:px-1 [&>tr>td]:py-1.5 [&>tr>td]:bg-phantom-900
  [&>tr>td]:max-w-70 [&>tr>td]:overflow-hidden [&>tr>td]:min-w-45  
  [&>tr>td]:whitespace-nowrap [&>tr>td]:text-ellipsis"
            >
              {isLoading ? (
                <tr>
                  <td colSpan="7" className="text-center py-4">
                    <Skeletonloader />
                  </td>
                </tr>
              ) : user.length === 0 ? (
                <tr>
                  <td
                    colSpan="7"
                    className="text-center py-4 text-white font-lex text-sm"
                  >
                    No data here.
                  </td>
                </tr>
              ) : (
                user.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.firstname}</td>
                    <td>{user.lastname}</td>
                    <td>{user.email}</td>
                    <td>{user.password}</td>
                    <td>{user.role}</td>
                    <td className="flex flex-row gap-2 items-center justify-center pb-1">
                      <ColoredButton
                        Icon={FiEdit2}
                        variant="edit"
                        text=""
                        onClick={() => handleEdit(user.id)}
                      />
                      <ColoredButton
                        Icon={FiTrash2}
                        variant="delete"
                        text=""
                        onClick={() => handleDelete(user.id)}
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </motion.table>
        </div>
      </div>
    </div>
  );
};
