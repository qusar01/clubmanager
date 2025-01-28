import React from "react";
import { useUserContext } from "../context/UserContext";
import ClubPayments from "../components/payments/ClubPayments";
import UserPayments from "../components/payments/UserPayments";
import { useSelector } from "react-redux";
import ErrorCard from "../components/ErrorCard";

const PaymentsPage = () => {
  const { role } = useUserContext();
  const userId = useSelector((state) => state.user.userId);
  const clubId = useSelector((state) => state.user.clubId);
  const isPaymentEnabled = useSelector((state) => state.user.isPaymentEnabled);

  return (
    <section className="bg-base-200 flex items-center justify-center min-h-screen min-w-screen">
      {role === "OWNER" && isPaymentEnabled && <ClubPayments clubId={clubId} />}
      {role === "COMPETITOR" && isPaymentEnabled && (
        <UserPayments userId={userId} />
      )}
      {!isPaymentEnabled && role === "OWNER" && (
        <ErrorCard
          error="Płatności wyłączone"
          message="Aby korzystać z płatności musisz je włączyć w ustawieniach"
        />
      )}
      {!isPaymentEnabled && role === "COMPETITOR" && (
        <ErrorCard
          error="Płatności wyłączone"
          message="Aby korzystać z płatności właściciel klubu musi je najpierw włączyć"
        />
      )}
      {!isPaymentEnabled && role === "COACH" && (
        <ErrorCard
          error="401 Brak Dostępu"
          message="Przepraszamy, nie masz uprawnień do dostępu do tej strony. Zaloguj się
        przy użyciu odpowiednich danych uwierzytelniających."
        />
      )}
    </section>
  );
};

export default PaymentsPage;
