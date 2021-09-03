import React from "react";
import { Link } from "react-router-dom";

const AdminHomePage = () => {
    return (
        <div className="Admin-Home-page">
            <div className="bg-secondary mb-8">
                <h1 className="font-bold text-3xl text-center items-center py-4">Admin</h1>
            </div>
            <div className="container mx-auto p-4 lg:p-0">
                <div className="rounded overflow-hidden shadow-lg pointer flex flex-col">
                    <Link
                        to={`/admin/products`}
                        className="bg-primary text-secondary hover:opacity-75  text-lg md:px-4 md:py-2 md:leading-none rounded inline-flex items-center mx-auto my-8"
                    >
                        <svg className="text-grey-800 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        <span className="ml-1">Product Management</span>
                    </Link>
                    <Link
                        to={`admin/users`}
                        className="bg-primary text-secondary hover:opacity-75  text-lg md:px-4 md:py-2 md:leading-none rounded inline-flex items-center mx-auto my-8"
                    >
                        <svg className="text-grey-800 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        <span className="ml-1">User Management</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AdminHomePage;
