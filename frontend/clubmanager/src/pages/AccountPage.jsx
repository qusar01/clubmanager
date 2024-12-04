import React from "react";
import { useUserContext } from "../context/UserContext";
import Account from "../components/account/Account";
import { useSelector } from "react-redux";

const AccountPage = () => {
  const { role, loading } = useUserContext();
  const userId = useSelector((state) => state.user.userId);
  const clubId = useSelector((state) => state.user.clubId);

  return (
    <section className="py-0">
      <section className="bg-base-200 flex justify-center items-center min-h-screen">
        {loading ? (
          <span className="loading loading-spinner"></span>
        ) : (
          <Account userId={userId} clubId={clubId} role={role} />
        )}
      </section>
    </section>
  );
};

export default AccountPage;
