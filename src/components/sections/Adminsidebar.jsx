import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import {
  FiBarChart,
  FiChevronDown,
  FiChevronsRight,
  FiChevronRight,
  FiDollarSign,
  FiHome,
} from "react-icons/fi";
import { supabase } from "../../createClient";
import { useNavigate } from "react-router";

const Adminsidebar = () => {
  const [open] = useState(true);
  const [selected, setSelected] = useState("Dashboard");

  return (
    <motion.nav
      layout
      className="sticky top-0 h-screen shrink-0 border-r border-phantom-700 bg-phantom-900 p-2 rounded-br-xl rounded-tr-xl flex flex-col gap-[30dvh]"
      style={{
        width: open ? "225px" : "fit-content",
      }}
    >
      <TitleSection open={open} />

      <div className="space-y-1">
        <Option
          Icon={FiChevronRight}
          title="Users"
          selected={selected}
          setSelected={setSelected}
          open={open}
        />
        <Option
          Icon={FiChevronRight}
          title="Hero"
          selected={selected}
          setSelected={setSelected}
          open={open}
          notifs={3}
        />
        <Option
          Icon={FiChevronRight}
          title="Tools and Skills"
          selected={selected}
          setSelected={setSelected}
          open={open}
        />
        <Option
          Icon={FiChevronRight}
          title="Projects"
          selected={selected}
          setSelected={setSelected}
          open={open}
        />
        <Option
          Icon={FiChevronRight}
          title="Certificate"
          selected={selected}
          setSelected={setSelected}
          open={open}
        />
      </div>
    </motion.nav>
  );
};


const Option = ({Icon, title, selected, setSelected, open}) => {
  const navigate = useNavigate();

  const handleclick = () => {
    setSelected(title);
    navigate(`/admin/${title}`);
  }
  return (
    <motion.button
      layout
      onClick={handleclick}
      className={`relative flex h-10 w-full items-center rounded-md transition-colors ${selected === title ? "bg-white text-black" : "text-white hover:bg-phantom-500"}`}
    >
      <motion.div
        layout
        className="grid h-full w-10 place-content-center text-lg"
      >
        <Icon className/>
      </motion.div>
      {open && (
        <motion.span
          layout
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.125 }}
          className="text-xs font-medium"
        >
          {title}
        </motion.span>
      )}
    </motion.button>
  );
};

const TitleSection = ({ open }) => {
  const [Sidebarprofiles, setSidebarprofiles] = useState([]);
  const [Users, setUsers] = useState([]);
  
    useEffect(() => {
      fetchSidebarprofile();
      fetchUsers();
    }, []);
  
    async function fetchSidebarprofile() {
      let { data: sidebarprofile, error } = await supabase
        .from("tblSidebar")
        .select("*")
        .single();
  
      if (error) {
        console.error("eror ngefetch si Sidebarprofile", error);
      } else {
        setSidebarprofiles(sidebarprofile);
      }
    }
    async function fetchUsers() {
      let { data: Users, error } = await supabase
        .from("tblUsers")
        .select("*")
        .limit(1);
  
      if (error) {
        console.error("eror ngefetch si Users", error);
      } else {
        setUsers(Users);
      }
    }

  return (
    <div className="mb-3 border-b border-phantom-600 pb-3">
      <div className="group flex cursor-pointer items-center justify-between rounded-md transition-colors hover:bg-white">
        <div className="flex items-center gap-2">
          <Logo />
          {open && (
            <motion.div
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.125 }}
            >
              <span className="block text-xs text-white group-hover:text-black font-semibold">{`Welcome To ${Sidebarprofiles?.Title || "Admin"}`}</span>
              <span className="block text-xs text-phantom-300">{`How are u ${Users?.firstname || "Admin"}?`}</span>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

const Logo = () => {
  const [Sidebarprofiles, setSidebarprofiles] = useState([]);
  
    useEffect(() => {
      fetchSidebarprofile();
    }, []);
  
    async function fetchSidebarprofile() {
      let { data: sidebarprofile, error } = await supabase
        .from("tblSidebar")
        .select("*")
        .single();
  
      if (error) {
        console.error("eror ngefetch si Sidebarprofile", error);
      } else {
        setSidebarprofiles(sidebarprofile);
      }
    }
  
  return (
    <motion.div
      layout
      className="grid size-10 shrink-0 place-content-center rounded-md"
    >
      <img src={`/assets/images/${Sidebarprofiles.ProfileImageName}.jpg`} alt={Sidebarprofiles.ProfileImageName} className="size-10 rounded-lg"/>
    </motion.div>
  );
};

export default Adminsidebar;
