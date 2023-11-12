import { Router } from "express";
import {
  addTaskToProject,
  addTaskToSection,
  addToProject,
  createProject,
  deleteProjectOne,
  viewProject,
  viewProjectOne,
} from "./controller";

const router: Router = Router();

router.route("/create-project").post(createProject);

router.route("/view-project").get(viewProject);
router.route("/view-one-project/:projectID").get(viewProjectOne);

router.route("/delete-one-project/:projectID").delete(deleteProjectOne);

router.route("/add-to-project/:projectID").patch(addToProject);
router.route("/add-task-to-section/:projectID").patch(addTaskToSection);

router.route("/add-task-to-project/:projectID").patch(addTaskToProject);

export default router;
