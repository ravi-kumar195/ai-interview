const pdfParse = require("pdf-parse");
const {
  generateInterviewReport,
  generateResumePdf,
} = require("../../services/ai.service");
const interViewReportModel = require("../models/interviewReport.model");

async function generateInterviewReportController(req, res) {
  const resumeFile = req.file;
  const pdfBytes = new Uint8Array(req.file.buffer);
  const resumeContent = await new pdfParse.PDFParse(pdfBytes).getText();
  const { selfDescription, jobDescription } = req.body;

  const interviewReportByAI = await generateInterviewReport({
    resume: resumeContent.text,
    selfDescription,
    jobDescription,
  });

  const interviewReport = await interViewReportModel.create({
    user: req.user._id,
    resume: resumeContent.text,
    selfDescription,
    jobDescription,
    ...interviewReportByAI,
  });
  res.status(201).json({
    message: "Interview report generated successfully",
    interviewReport,
  });
}

/**
 * @description Controller to get interview report by interviewId
 */
async function getInterviewReportByIdcontroller(req, res) {
  const { interviewId } = req.params;

  const interviewReport = await interViewReportModel.findById(interviewId);

  if (!interviewReport) {
    return res.status(404).json({
      message: "Interview report not found",
    });
  }

  res.status(200).json({
    message: "Interview report fetched successfully",
    interviewReport,
  });
}

/**
 *
 * @description controller to get all interview reports of logged in user
 */
async function getAllInterviewReportsController(req, res) {
  const interviewReports = await interViewReportModel
    .find({ user: req.user.id })
    .sort({ createdAt: -1 })
    .select(
      "-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan",
    );

  res.status(200).json({
    message: "Interview reports fetched successfully",
    interviewReports,
  });
}
/**
 * @description Controller to generate resume pdf based on user self description, resume and job description.
 */
async function generateResumePdfController(req, res) {
  const { interviewId } = req.params;
  const interviewReport = await interViewReportModel.findById(interviewId);

  if (!interviewReport) {
    return res.status(404).json({
      message: "Interview report not found",
    });
  }
  const { resume, selfDescription, jobDescription } = interviewReport;

  const pdfBuffer = await generateResumePdf({
    resume,
    selfDescription,
    jobDescription,
  });
  res.set({
    "Content-Type": "application/pdf",
    "Content-Disposition": `attachment; "filename=resume_${interviewId}.pdf"`,
  });
  res.send(pdfBuffer);
}
module.exports = {
  generateInterviewReportController,
  getInterviewReportByIdcontroller,
  getAllInterviewReportsController,
  generateResumePdfController,
};
