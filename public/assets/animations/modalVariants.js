const modalVariants = {
    hidden: { y: "100vh", opacity: 0 },
    visible: {
      y: "-50%",
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 30,
      },
    },
    exit: {
      y: "100vh",
      opacity: 0,
      transition: { duration: 0.2 },
    },
  };

export default modalVariants