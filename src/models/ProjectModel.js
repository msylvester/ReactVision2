// ProjectModel.js
class ProjectModel {
  constructor(id, name, images = []) {
    this.id = id;
    this.name = name;
    this.images = images;
  }

  addImage(imageUrl) {
    this.images.push(imageUrl);
  }

  removeImage(imageUrl) {
    const index = this.images.indexOf(imageUrl);
    if (index !== -1) {
      this.images.splice(index, 1);
    }
  }

  // You can add more methods as needed
}

export default ProjectModel;
