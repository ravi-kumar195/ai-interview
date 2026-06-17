const express = require("express");
const interviewRouter = express.Router();
const authMiddleWare = require("../middlewares/auth.middleware");
const interviewController = require("../controllers/interview.controller");
const upload = require("../middlewares/file.middleware");

/**
 * @route POST /api/interview
 * @description generate new interview report on the basis of user self description, resume pdf and jo description
 * @access Private
 */
interviewRouter.post(
  "/",
  authMiddleWare.authUser,
  upload.single("resume"),
  interviewController.generateInterviewReportController,
);

/**
 * @route GET /api/interview/report/:interviewID
 * @description get interview report by interviewID
 * @access Private
 */

interviewRouter.get(
  "/report/:interviewId",
  authMiddleWare.authUser,
  interviewController.getInterviewReportByIdcontroller,
);

/**
 * @route GET /api/interview/
 * @description get all interviews reports of logged in user
 * @access Private
 */
interviewRouter.get(
  "/",
  authMiddleWare.authUser,
  interviewController.getAllInterviewReportsController,
);

/**
 * @route POST /api/interview/resume/pdf
 * @description generate resume pdf on the basis of user self description, resume content and job decsription
 * @access Private
 */

interviewRouter.post(
  "/resume/pdf/:interviewId",
  authMiddleWare.authUser,
  interviewController.generateResumePdfController,
);
module.exports = interviewRouter;
