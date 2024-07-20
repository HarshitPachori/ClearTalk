import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { animationDeffaultOptions } from "@/lib/utils";
import { Plus } from "lucide-react";
import React, { useState } from "react";
import Lottie from "react-lottie";

const NewDM = () => {
  const [openNewContactModal, setOpenNewContactModal] = useState(false);
  const [searchContacts, setSearchContacts] = useState([]);
  // const [searchContacts, setSearchContacts] = useState("");
  const searchContactsHandler = async (searchTerm) => {};
  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Plus
              className="text-neutral-400 text-opacity-90 font-light text-start hover:text-neutral-100 cursor-pointer transition-all duration-300"
              onClick={() => setOpenNewContactModal(true)}
            />
          </TooltipTrigger>
          <TooltipContent className="bg-[#1c1b1e] border-none mb-2 p-3 text-neutral-100">
            Select new Contact
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <Dialog open={openNewContactModal} onOpenChange={setOpenNewContactModal}>
        <DialogContent className="bg-[#181920] border-none rounded-lg text-white w-[400px] h-[400px] flex flex-col ">
          <DialogHeader>
            <DialogTitle className="text-neutral-200">
              Please select a contact
            </DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div className="">
            <Input
              placeholder="Search Contacts"
              className="rounded-lg p-6 bg-[#2c2e3b] border-none text-neutral-100"
              // value={searchContacts}
              onChange={(e) => searchContactsHandler(e.target.value)}
            />
          </div>
          {searchContacts.length <= 0 && (
            <div className="flex-1 md:bg-[#1c1d25] mt-5 md:flex  flex-col justify-center items-center transition-all duration-1000">
              <Lottie
                isClickToPauseDisabled={true}
                height={100}
                width={100}
                options={animationDeffaultOptions}
              />
              <div className="text-opacity-80 text-white flex flex-col gap-5 items-center mt-6 text-xl lg:text-2xl transition-all duration-300 text-center ">
                <h3 className="poppins-medium">
                  Hi<span className="text-purple-500">!</span> Search new
                  <span className="text-purple-500"> Contact.</span>
                </h3>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default NewDM;
