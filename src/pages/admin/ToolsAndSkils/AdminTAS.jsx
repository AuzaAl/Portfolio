import React, { useState } from "react";
import ColoredButton from "../../../components/common/Coloredbutton";
import { FiChevronDown, FiEdit2, FiTrash2, FiX } from "react-icons/fi";
import { Imageinput } from "../../../components/common/Imageinput";
import overlayVariants from "../../../../public/assets/animations/overlayVariants";
import sidebarVariants from "../../../../public/assets/animations/sidebarVariants";
import { Inputsidebar } from "../../../components/sections/Inputsidebar";
import { Datainput } from "../../../components/common/Datainput";
import { supabase } from "../../../createClient";
import { Modal } from "../../../components/common/Modal";
import { motion } from "framer-motion";
import fadeupVariants from "../../../../public/assets/animations/fadeupVariants";
import { Skeletonloader } from "../../../components/common/Skeletonloader";

export const AdminTAS = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [modeSidebar, setModeSidebar] = useState("insert");
  const [selectedId, setSelectedId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [Skills, setSkills] = useState([]);
  const [image, setImage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [name, setName] = useState("");
  const [showModal, setShowModal] = useState(false);

  const resetForm = () => {
    setImage("");
    setName("");
  };

    async function fetchSkills() {
      setIsLoading(true);
      const { data, error } = await supabase.from("tblSkillss").select("*");
      if (error) {
        console.error("Error fetching Skillss", error);
      } else {
        setSkills(data || []);
      }
      setIsLoading(false);
    }

  const handleSubmit = async () => {
    console.log("Checking values - image:", image, "name:", name);
    if (!image || !name) {
      alert("Harap isi nama dan unggah gambar.");
      return;
    }

    setIsSubmitting(true);
    try {
      // Data sudah disimpan oleh Imageinput, jadi kita hanya konfirmasi dan reset
      console.log("Submitted data:", { image, name });
      alert("Data successfully submitted!");
      setIsOpen(false);
      resetForm();
    } catch (error) {
      console.error("Submission error:", error);
      alert("Failed to submit. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  async function handleDelete(Skillsid) {
      setSelectedId(Skillsid);
      setShowModal(true);
    }
  
    const handleConfirmDelete = async () => {
      try {
        const { error } = await supabase
          .from("tblSkills")
          .delete()
          .eq("id", selectedId);
        if (error) {
          console.error("Error deleting skills", error);
        } else {
          fetchSkills();
          setShowModal(false);
        }
      } catch (error) {
        console.error("Error deleting skills", error);
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
          SKILLS DASHBOARD
        </h1>
      </div>
      <div className="border border-phantom-600 w-full bg-phantom-900 px-2 py-2">
        <ColoredButton
          Icon={FiChevronDown}
          variant="success"
          text="INSERT"
          onClick={() => {
            resetForm();
            setModeSidebar("insert");
            setIsOpen(true);
          }}
        />
      </div>
      <Inputsidebar
        Htext="Skills"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        overlayVariants={overlayVariants}
        sidebarVariants={sidebarVariants}
        handlesubmit={handleSubmit}
        Mode={modeSidebar}
      >
        <Datainput
          title="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Imageinput
          title="Image"
          value={image}
          onChange={setImage}
        />
        {isSubmitting && (
          <p className="text-xs text-phantom-400">Submitting...</p>
        )}
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
              ) : Skills.length === 0 ? (
                <tr>
                  <td
                    colSpan="7"
                    className="text-center py-4 text-white font-lex text-sm"
                  >
                    No data here.
                  </td>
                </tr>
              ) : (
                Skills.map((Skills) => (
                  <tr key={Skills.id}>
                    <td>{Skills.id}</td>
                    <td>{Skills.firstname}</td>
                    <td>{Skills.lastname}</td>
                    <td>{Skills.email}</td>
                    <td>{Skills.password}</td>
                    <td>{Skills.role}</td>
                    <td className="flex flex-row gap-2 items-center justify-center pb-1">
                      <ColoredButton
                        Icon={FiEdit2}
                        variant="edit"
                        text=""
                        onClick={() => handleEdit(Skills.id)}
                      />
                      <ColoredButton
                        Icon={FiTrash2}
                        variant="delete"
                        text=""
                        onClick={() => handleDelete(Skills.id)}
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