import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LoadingMessage from "../../DisplayComponents/LoadingMessage";
import { toast } from "react-toastify";
import _, { debounce } from 'lodash';
import { searchUsers, searchUsersWithPage } from "../../../api/usersApi";
import UserSearchForm from "./UserSearchForm";
import UsersListWithPagination from "../../DisplayComponents/UsersListWithPagination";


const UsersManagementPage = () => {
    const [usersPaginator, setUsersPaginator] = useState(null);
    const [filters, setFilters] = useState({ firstName: "", lastName: "" });


    useEffect(() => {
        if (!usersPaginator) {
            search();
        }
    }, [usersPaginator])

    useEffect(() => {
        let debounced = debounce(
            () => { search(); }, 50
        );

        debounced();
    }, [filters])

    function search() {
        searchUsers(filters).then(usersData => {
            setUsersPaginator(usersData);
        }).catch(error => {
            toast.error("Error getting users " + error.message, {
                autoClose: false,
            });
        });
    }

    function getUserPage(pageUrl) {
        searchUsersWithPage(pageUrl, filters).then(usersData => {
            setUsersPaginator(usersData);
        }).catch(error => {
            toast.error("Error getting users " + error.message, {
                autoClose: false,
            });
        });
    }

    function handleFilterChange(event) {
        const { name, value } = event.target;

        setFilters(prevFilters => ({
            ...prevFilters,
            [name]: value
        }));
    }

    return (
        <div className="user-management-page">
            <div className="bg-secondary mb-8">
                <h1 className="font-bold text-3xl text-center items-center py-4">User Management</h1>
            </div>
            <div className="container mx-auto p-4 lg:p-0">
                {!usersPaginator ? (
                    <LoadingMessage message={'Loading users to explore'} />
                ) : (
                    <>
                        <UserSearchForm filters={filters} onFilterChange={handleFilterChange} />
                        <div>
                            {usersPaginator.total > 0 ? (
                                <UsersListWithPagination paginationData={usersPaginator} onPageChange={getUserPage} />
                            ) : (
                                <p className="text-center">No users match your search</p>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default UsersManagementPage;
