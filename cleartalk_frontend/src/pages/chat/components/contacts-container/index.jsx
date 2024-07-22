import React, { useEffect } from "react";
import Title from "./components/Title";
import Logo from "./components/Logo";
import ProfileInfo from "./components/profile-info";
import NewDM from "./components/new-dm";
import axios from "axios";
import { toast } from "sonner";
import { apiClient } from "@/lib/api-client";
import { GET_ALL_CONTACTS_FOR_DM_ROUTE } from "@/utils/constants";
import { useAppStore } from "@/store";
import ContactList from "@/components/ContactList";

const ContactsContainer = () => {
  const { directMessagesContacts, setDirectMessagesContacts } = useAppStore();

  useEffect(() => {
    const getAllContactsForDM = async () => {
      try {
        const response = await apiClient.get(GET_ALL_CONTACTS_FOR_DM_ROUTE, {
          withCredentials: true,
        });
        if (response.data.contacts) {
          setDirectMessagesContacts(response.data.contacts);
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          toast.error(error.response.data);
        }
      }
    };
    getAllContactsForDM();
  }, []);
  return (
    <div className="relative md:w-[35vw] lg:w-[30vw] xl:w-[20vw] bg-[#1b1c24] border-r-2 border-[#2f303b] w-full">
      <div className="pt-3">
        <Logo />
      </div>
      <div className="my-5">
        <div className="flex items-center justify-between pr-10">
          <Title text="Direct Messages" />
          <NewDM />
        </div>
        <div className="max-h-[30vh] overflow-y-auto scrollbar-hidden">
          <ContactList contacts={directMessagesContacts} />
        </div>
      </div>
      <div className="my-5">
        <div className="flex items-center justify-between pr-10">
          <Title text="Channels" />
        </div>
      </div>
      <ProfileInfo />
    </div>
  );
};

export default ContactsContainer;
