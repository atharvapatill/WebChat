import axios from "axios";
import { useEffect, useState } from "react";

function Sidebar({ user, setSelectedContact }) {

  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState("");

  async function getAllContacts() {
    try {

      const response = await axios.get(
        "http://localhost:8000/api/v1/user/getAllUsers",
        {
          withCredentials: true
        }
      );

      setContacts(response.data.users);

    } catch (error) {
      console.log(
        "error while fetching contacts",
        error.response?.data
      );
    }
  }

  useEffect(() => {
    getAllContacts();
  }, []);

  const filteredContacts = contacts.filter((contact) => {

    // remove logged in user
    if(contact._id === user._id) return false;

    return (
      contact.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||

      contact.username
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  });

  return (
    <div
      className="
        relative
        overflow-hidden
        w-full
        h-full
        bg-zinc-900
        border
        border-zinc-700
        rounded-2xl
        p-4
        flex
        flex-col
        gap-4
      "
    >
      {/* Background Glow */}
      <div
        className="
          absolute
          top-0
          left-0
          w-52
          h-52
          bg-blue-500/5
          blur-3xl
          rounded-full
        "
      ></div>

      {/* Search */}
      <div className="relative z-10">
        <input
          type="text"
          placeholder="Search chats..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
            w-full
            bg-zinc-800
            border
            border-zinc-700
            text-white
            px-4
            py-3
            rounded-xl
            outline-none
            focus:border-blue-500
            transition
          "
        />
      </div>

      {/* Contacts */}
      <div
        className="
          relative
          z-10
          flex-1
          min-h-0
          flex
          flex-col
          gap-3
          overflow-y-auto
          pr-1
        "
      >
        {filteredContacts.length > 0 ? (

          filteredContacts.map((contact) => {

            return (
              <div
                key={contact._id}
                onClick={() => setSelectedContact(contact)}
                className="
                  group
                  bg-zinc-800/80
                  hover:bg-zinc-800
                  border
                  border-zinc-700
                  hover:border-blue-500/40
                  p-4
                  rounded-2xl
                  cursor-pointer
                  transition-all
                  duration-200
                "
              >
                <div className="flex items-center gap-3">

                  {/* Avatar */}
                  <div
                    className="
                      w-12
                      h-12
                      rounded-2xl
                      bg-blue-500/20
                      flex
                      items-center
                      justify-center
                      text-lg
                      font-semibold
                      text-white
                      shrink-0
                    "
                  >
                    {contact.name.charAt(0).toUpperCase()}
                  </div>

                  {/* User Info */}
                  <div className="min-w-0">
                    <h2
                      className="
                        font-semibold
                        text-white
                        truncate
                      "
                    >
                      {contact.name}
                    </h2>

                    <p
                      className="
                        text-sm
                        text-zinc-400
                        truncate
                      "
                    >
                      @{contact.username}
                    </p>
                  </div>

                </div>
              </div>
            );
          })

        ) : (

          <div
            className="
              flex
              items-center
              justify-center
              h-full
              text-zinc-500
              text-sm
            "
          >
            No users found
          </div>

        )}
      </div>
    </div>
  );
}

export default Sidebar;