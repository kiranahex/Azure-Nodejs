import express from "express";

const router = express.Router();
import taskCOntroller from "../controllers/taskController";

// router.get("/allTasks", taskController.getAllTasks);
router
  .route("/tasks")
  .get(taskCOntroller.getAllTasks)
  .post(taskCOntroller.createTasks);
router
  .route("/tasks/:id")
  .get(taskCOntroller.getTaskById)
  .delete(taskCOntroller.deleteTaskById)
  .patch(taskCOntroller.updateTaskById);
export = router;
