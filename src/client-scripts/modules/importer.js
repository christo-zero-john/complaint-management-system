import config from "./config.js";
import { getUserById } from "./get-user-by-id.js";
import { newNotification } from "./new-notification.js";
import { startLoading } from "./start-loading.js";
import { stopLoading } from "./stop-loading.js";
import { fetchCategory } from "./get-category-by-id.js";
import { fetchDepartment } from "./get-department-by-id.js";
import { viewComplaints } from "../users/complaints/view-complaints.js";
import { viewComplaintDetails } from "../users/complaints/view-complaint-details.js";
import { editComplaint } from "../users/complaints/edit-complaint.js";
import { deleteComplaint } from "../users/complaints/delete-complaint.js";
import { closeComplaint } from "../users/complaints/close-complaint.js";
import { reOpenComplaint } from "../users/complaints/reopen-complaint.js";
import { myComplaints } from "../users/complaints/my-complaints.js";
import {
  createComplaint,
  fetchCategories,
  fetchDepartments,
  fetchRoles,
} from "../users/complaints/create-complaint.js";
import { createCategory } from "../admin/manage-categories/create-category.js";
import {
  editCategory,
  saveCategory,
} from "../admin/manage-categories/edit-category.js";
import { viewCategories } from "../admin/manage-categories/view-categories.js";
import { deleteCategory } from "../admin/manage-categories/delete-category.js";
import { createDepartment } from "../admin/manage-departments/create-department.js";
import {
  editDepartment,
  saveDepartment,
} from "../admin/manage-departments/edit-department.js";
import { deleteDepartment } from "../admin/manage-departments/delete-department.js";
import { viewDepartments } from "../admin/manage-departments/view-departments.js";
import { setFieldValues } from "./set-field-values.js";
import { createRole } from "../admin/manage-roles/create-role.js";
import { viewRoles } from "../admin/manage-roles/view-roles.js";
import { editRole, saveRole } from "../admin/manage-roles/edit-role.js";
import { deleteRole } from "../admin/manage-roles/delete-role.js";
import { User } from "../entities/Users.js";
import { Department } from "../entities/Department.js";
import { Role } from "../entities/Role.js";
import { Category } from "../entities/Category.js";
import { Complaint } from "../entities/Complaint.js";
import { initializer } from "./initialise.js";
import { viewUserRoles } from "../admin/manage-user-roles/view-all-users.js";
import { PopUp, Modal, OffCanvas } from "../entities/WindowElements.js";
import { Reviewer } from "../entities/Reviewer.js";
import { Dashboard } from "../entities/Dashboard.js";

console.clear();

window.config = config;
window.server = config.server;
window.newNotification = newNotification;
window.getUserById = getUserById;
window.startLoading = startLoading;
window.stopLoading = stopLoading;
window.fetchCategory = fetchCategory;
window.fetchDepartment = fetchDepartment;
window.viewComplaints = viewComplaints;
window.viewComplaintDetails = viewComplaintDetails;
window.editComplaint = editComplaint;
window.deleteComplaint = deleteComplaint;
window.closeComplaint = closeComplaint;
window.reOpenComplaint = reOpenComplaint;
window.myComplaints = myComplaints;
window.createComplaint = createComplaint;
window.fetchCategories = fetchCategories;
window.fetchDepartments = fetchDepartments;
window.fetchRoles = fetchRoles;
window.createCategory = createCategory;
window.editCategory = editCategory;
window.saveCategory = saveCategory;
window.viewCategories = viewCategories;
window.deleteCategory = deleteCategory;
window.createDepartment = createDepartment;
window.editDepartment = editDepartment;
window.deleteDepartment = deleteDepartment;
window.viewDepartments = viewDepartments;
window.setFieldValues = setFieldValues;
window.saveDepartment = saveDepartment;
window.createRole = createRole;
window.viewRoles = viewRoles;
window.editRole = editRole;
window.saveRole = saveRole;
window.deleteRole = deleteRole;

window.User = User;
window.Department = Department;
window.Role = Role;
window.Category = Category;
window.Complaint = Complaint;
window.PopUp = PopUp;
window.Modal = Modal;
window.OffCanvas = OffCanvas;
window.Reviewer = Reviewer;
window.Dashboard = Dashboard;

window.viewUserRoles = viewUserRoles;

initializer();
