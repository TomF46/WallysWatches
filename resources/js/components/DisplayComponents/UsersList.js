import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const UsersList = ({ users }) => {
    return (
        <table class="table-fixed w-full overflow-hidden shadow page">
            <thead>
                <tr className="border-b border-gray-200">
                    <th className="w-1/3">First name</th>
                    <th className="w-1/3">Last name</th>
                    <th className="w-1/3">Actions</th>
                </tr>
            </thead>
            <tbody>
                {users && (
                    users.map((user) => {
                        return (
                            <tr className="text-center border-b border-gray-200 ">
                                <td>{user.firstName}</td>
                                <td>{user.lastName}</td>
                                <td>View</td>
                            </tr>
                        )
                    })
                )}
            </tbody>
        </table>
    );
};

UsersList.propTypes = {
    users: PropTypes.array.isRequired,
};

export default UsersList;
