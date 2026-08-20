import { fetchJson } from './apiClient';
import { ENDPOINTS } from '../api/endpoints';

export async function submitEnrollmentApplication(formDataObject) {
  const formData = new FormData();

  // Helper to append properties with form prefixing e.g. Student.FirstName
  const appendForm = (key, value) => {
    if (value !== undefined && value !== null) {
      formData.append(key, value);
    }
  };

  appendForm('ProgramId', formDataObject.programId);
  appendForm('CourseId', formDataObject.courseId);
  appendForm('HasLaptopConfirmation', formDataObject.hasLaptopConfirmation ?? true);

  // Student info
  appendForm('Student.FirstName', formDataObject.student?.firstName);
  appendForm('Student.LastName', formDataObject.student?.lastName);
  appendForm('Student.DateOfBirth', formDataObject.student?.dateOfBirth || '2012-01-01');
  appendForm('Student.City', formDataObject.student?.city || 'القاهرة');
  appendForm('Student.EducationLevel', formDataObject.student?.educationLevel ?? 0);
  appendForm('Student.InstitutionName', formDataObject.student?.institutionName || 'مدرسةصانع');
  appendForm('Student.CurrentLevel', formDataObject.student?.currentLevel || 'الصف السادس');
  appendForm('Student.Faculty', formDataObject.student?.faculty || 'عام');
  appendForm('Student.GraduationStatus', formDataObject.student?.graduationStatus ?? 0);
  appendForm('Student.StudentPhone', formDataObject.student?.studentPhone);
  appendForm('Student.StudentEmail', formDataObject.student?.studentEmail);

  // Parent info
  appendForm('Parent.Name', formDataObject.parent?.name);
  appendForm('Parent.Phone', formDataObject.parent?.phone);
  appendForm('Parent.Email', formDataObject.parent?.email);

  // Assessment info
  appendForm('Assessment.HasProgrammingExperience', formDataObject.assessment?.hasProgrammingExperience ?? false);
  appendForm('Assessment.ProgrammingExperienceLevel', formDataObject.assessment?.programmingExperienceLevel || 'مبتدئ');
  appendForm('Assessment.ParticipatedInCompetitions', formDataObject.assessment?.participatedInCompetitions ?? false);
  appendForm('Assessment.ProgrammingTools', formDataObject.assessment?.programmingTools || 'Scratch');
  appendForm('Assessment.PrimaryGoal', formDataObject.assessment?.primaryGoal || 'تعلم صناعة المشاريع والبرمجة');

  // File
  if (formDataObject.paymentScreenshot) {
    formData.append('PaymentScreenshot', formDataObject.paymentScreenshot);
  } else {
    // Dummy image blob fallback if user submits a free trial without custom screenshot
    const dummyBlob = new Blob(["Free Trial Registration"], { type: "image/png" });
    formData.append('PaymentScreenshot', dummyBlob, 'free-trial.png');
  }

  return fetchJson(ENDPOINTS.ENROLLMENT_APPLICATIONS, {
    method: 'POST',
    body: formData,
  });
}
