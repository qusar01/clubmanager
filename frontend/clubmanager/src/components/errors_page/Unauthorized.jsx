import React from "react";
import { Link } from "react-router-dom";

const Unauthorized = () => {
  return (
    <div className="py-16 animate-in fade-in zoom-in">
      <div className="p-8 bg-base-100 shadow-lg rounded-md max-w-md text-center space-y-6">
        <div className="flex justify-center">
          <span className="text-error">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-16"
            >
              <path
                fillRule="evenodd"
                d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </div>

        <h2 className="text-4xl font-bold text-error">401 Brak Dostępu</h2>
        <p className="">
          Przepraszamy, nie masz uprawnień do dostępu do tej strony. Zaloguj się
          przy użyciu odpowiednich danych uwierzytelniających.
        </p>

        <Link to="/" className="btn btn-primary w-full">
          Wróć na stronę główną
        </Link>
      </div>
    </div>
  );
};

export default Unauthorized;
