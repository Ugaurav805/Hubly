import React, { useState, useContext, useEffect } from "react";
import Sidebar from "../Sidebar/Sidebar.jsx";
import { FaEdit, FaTrash } from "react-icons/fa";
import { TeamContext } from "../../Context/TeamContext.jsx";
import "./Team.css";
import axios from "axios";

const BASE_URL = "https://hubly-ktvo.onrender.com/api/team"; // Updated URL

const Team = () => {
  const { teamMembers, setTeamMembers } = useContext(TeamContext);

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "Member",
    phone: "",
  });
  const [editId, setEditId] = useState(null);

  // ✅ Load data from backend on page load
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await axios.get(BASE_URL);  // Fetching team members
        setTeamMembers(res.data);
      } catch (error) {
        console.error("Error fetching team members:", error);
      }
    };

    fetchMembers();
  }, [setTeamMembers]);

  const handleDelete = async (id) => {
    try {
      const updated = teamMembers.filter((member) => member._id !== id);
      setTeamMembers(updated);

      await axios.delete(`${BASE_URL}/${id}`);  // Deleting team member
    } catch (error) {
      console.error("Error deleting member:", error);
    }
  };

  const handleAddOrUpdate = async () => {
    try {
      if (editId) {
        // Editing
        const updated = teamMembers.map((member) =>
          member._id === editId ? { ...member, ...formData } : member
        );
        setTeamMembers(updated);

        await axios.put(`${BASE_URL}/${editId}`, formData);  // Updating member
      } else {
        // Adding
        const res = await axios.post(BASE_URL, formData);  // Adding new member
        setTeamMembers([...teamMembers, res.data]);
      }
      setFormData({ name: "", email: "", role: "Member", phone: "" });
      setShowModal(false);
      setEditId(null);
    } catch (error) {
      console.error("Error saving member:", error);
    }
  };

  const handleEdit = (member) => {
    setFormData(member);
    setEditId(member._id);
    setShowModal(true);
  };

  return (
    <div className="Team-layout">
      <Sidebar />
      <div className="main">
        <div className="team-header">
          <h2>Team</h2>
        </div>

        <table className="team-table">
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Role</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {teamMembers.map((member, index) => (
              <tr
                key={member._id}
                className={member.role === "Admin" ? "admin-row" : ""}
              >
                <td>
                  <div className="avatar-name">
                    <img
                      src={`https://i.pravatar.cc/150?img=${index + 10}`}
                      alt="avatar"
                    />
                    {member.name}
                  </div>
                </td>
                <td>{member.phone}</td>
                <td>{member.email}</td>
                <td>{member.role}</td>
                <td>
                  <div className="actions">
                    <button
                      onClick={() => handleEdit(member)}
                      className="edit-btn"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(member._id)}
                      className="delete-btn"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="add-team-button-container">
          <button
            onClick={() => {
              setShowModal(true);
              setFormData({ name: "", email: "", role: "Member", phone: "" });
              setEditId(null);
            }}
            className="add-button"
          >
            ➕+ Add Team members
          </button>
        </div>

        {showModal && (
          <div className="modal-overlay">
            <div className="modal">
              <h2 className="modal-title">
                {editId ? "Edit Team Member" : "Add Team Member"}
              </h2>
              <p className="modal-description">
                Talk with colleagues in a group chat. Messages in this group are
                only visible to its participants. New teammates may only be
                invited by the administrators.
              </p>

              <div className="modal-inputs">
                <label>User name</label>
                <input
                  type="text"
                  placeholder="User name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />

                <label>Email ID</label>
                <input
                  type="email"
                  placeholder="Email ID"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />

                <label>Phone Number</label>
                <input
                  type="text"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                />

                <label>Designation</label>
                <select
                  value={formData.role}
                  onChange={(e) =>
                    setFormData({ ...formData, role: e.target.value })
                  }
                >
                  <option value="Member">Member</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>

              <div className="modal-actions">
                <button
                  onClick={() => {
                    setShowModal(false);
                    setEditId(null);
                  }}
                  className="cancel"
                >
                  Cancel
                </button>
                <button onClick={handleAddOrUpdate} className="add">
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Team;