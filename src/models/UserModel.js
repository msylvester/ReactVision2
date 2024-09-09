// UserModel.js
import ProjectModel from './ProjectModel';
// import AsyncStorage from 'react-native-async-storage/async-storage/';

// Example structure for user data model

class User {
  constructor(id, email, projects = []) {
    this.id = id;
    this.email = email;
    this.projects = projects;
    this.permissions = false;
  }
  getProjects = () => this.projects;
  getPermissions = () => this.permissions;
}

export default User;
