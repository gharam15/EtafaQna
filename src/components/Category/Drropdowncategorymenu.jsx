import React, { useState } from 'react'
import { AnimatePresence, motion } from "framer-motion";
import { Link } from 'react-router-dom';
import { IoIosArrowDown } from "react-icons/io";

function Dropdowncategorymenu() {
  return (
    <Link to='/Allcategorypage'> 
    <div className="flex h-[0px] justify-center text-gray-800 px-3 py-2 -ml-5">
      <FlyoutLink  FlyoutContent={PricingContent}>
       More category < IoIosArrowDown size={20}className="flex -m-[20px] ml-[110px] " />
      </FlyoutLink>
    </div>
    </Link>
  );
};
const FlyoutLink = ({ children, href, FlyoutContent }) => {
  const [open, setOpen] = useState(false);
  const showFlyout = FlyoutContent && open;
  return (
    <div
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      className="relative w-fit h-fit"
    >
      <a href={href} className="relative text-gray-800">
        {children}
        <span
          style={{
            transform: showFlyout ? "scaleX(1)" : "scaleX(0)",
          }}
          className="absolute -bottom-2 -left-2 -right-4 h-1 origin-left scale-x-0 rounded-full bg-[#EF7215] transition-transform duration-300 ease-out"
        />
      </a>
      <AnimatePresence>
        {showFlyout && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            style={{ translateX: "-50%" }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="absolute left-1/2 top-9 bg-white text-black" >
            <div className="absolute -top-6 left-0 right-0 h-6 bg-transparent" />
            <FlyoutContent />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
const PricingContent = () => {
  return (
    <div className="w-64 bg-white p-6 shadow-xl">
      <div className="mb-3 space-y-3">
        <h3 className="font-semibold">For Individuals</h3>
        <Link to='' className="block text-sm hover:underline">
          Devices
        </Link>
        <Link  href="#" className="block text-sm hover:underline">
          PSs
        </Link>
      </div>
      <div className="mb-6 space-y-3">
        <h3 className="font-semibold">For Companies</h3>
        <Link  href="#" className="block text-sm hover:underline">
          Fruniture
        </Link>
        <Link  href="#" className="block text-sm hover:underline">
          Pets
        </Link>
        <Link  href="#" className="block text-sm hover:underline">
          Electronics
        </Link>
      </div>
    </div>
  );
};

export default Dropdowncategorymenu;