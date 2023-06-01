import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";

const ProfileDropdownMenu = () => {
  const { data: session, status } = useSession();
  console.log(session);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  if (status === "loading") {
    // Render a loading state or placeholder
    return (
      <div class="flex justify-center items-center">
        <div class="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (session) {
    return (
      <div className="relative">
        <div
          className="cursor-pointer flex items-center"
          onClick={toggleDropdown}
        >
          <Image
            src={session.user.image}
            height={50}
            width={50}
            className="rounded-full"
            alt="Profile Image"
          />
        </div>

        {isOpen && (
          <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 divide-y divide-gray-200 rounded-md shadow-lg">
            <div className="py-1">
              <ul>
                <li className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">
                  {session.user.name}
                </li>
                <li
                  className="cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-red-400 hover:text-gray-900"
                  onClick={() => signOut()}
                >
                  Log Out
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="login flex items-center text-xl">
      <button
        onClick={() => {
          signIn("google");
        }}
        className="primary-btn md:px-5 md:py-3 px-2 py-2 hover:bg-[var(--primary-color)] hover:text-white"
      >
        <i className="bi bi-google me-3"></i>
        Login
      </button>
    </div>
  );
};

export default ProfileDropdownMenu;
