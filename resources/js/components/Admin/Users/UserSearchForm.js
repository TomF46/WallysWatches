import React from "react";
import PropTypes from "prop-types";
import TextInput from "../../FormComponents/TextInput";

const UserSearchForm = ({ filters, onFilterChange }) => {
    return (
        <div className="grid grid-cols-12 overflow-hidden shadow page mx-4 my-8">
            <div className="col-span-6 px-8 py-4">
                <TextInput
                    name="firstName"
                    label="First Name"
                    value={filters.firstName}
                    onChange={onFilterChange}
                />
            </div>
            <div className="col-span-6 px-8 py-4">
                <TextInput
                    name="lastName"
                    label="Last Name"
                    value={filters.lastName}
                    onChange={onFilterChange}
                />
            </div>
        </div>
    );
};

UserSearchForm.propTypes = {
    filters: PropTypes.object.isRequired,
    onFilterChange: PropTypes.func.isRequired
};

export default UserSearchForm;
