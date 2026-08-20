import { useMutation } from '@tanstack/react-query';
import { axiosClient } from '../../api/axiosClient';
import { ENDPOINTS } from '../../api/endpoints';

export function useSubmitEnrollmentMutation() {
  return useMutation({
    mutationFn: async ({ payloadData, file }) => {
      const formData = new FormData();

      const appendForm = (key, val) => {
        if (val !== undefined && val !== null) {
          formData.append(key, val);
        }
      };

      appendForm('ProgramId', Number(payloadData.programId));
      appendForm('CourseId', Number(payloadData.courseId));
      appendForm('HasLaptopConfirmation', Boolean(payloadData.hasLaptopConfirmation));

      // Ensure DateOfBirth is formatted as YYYY-MM-DD
      let rawDob = payloadData.student.dateOfBirth;
      if (rawDob && rawDob.includes('T')) {
        rawDob = rawDob.split('T')[0];
      }
      appendForm('Student.DateOfBirth', rawDob || '2005-01-01');

      // Student info
      appendForm('Student.FirstName', payloadData.student.firstName);
      appendForm('Student.LastName', payloadData.student.lastName);
      appendForm('Student.City', payloadData.student.city);
      appendForm('Student.EducationLevel', Number(payloadData.student.educationLevel || 0));
      appendForm('Student.InstitutionName', payloadData.student.institutionName);
      appendForm('Student.CurrentLevel', payloadData.student.currentLevel);
      if (payloadData.student.faculty) appendForm('Student.Faculty', payloadData.student.faculty);
      appendForm('Student.GraduationStatus', Number(payloadData.student.graduationStatus || 0));
      appendForm('Student.StudentPhone', payloadData.student.studentPhone || '01000000000');
      appendForm('Student.StudentEmail', payloadData.student.studentEmail || payloadData.parent.email);

      // Parent info
      appendForm('Parent.Name', payloadData.parent.name);
      appendForm('Parent.Phone', payloadData.parent.phone);
      appendForm('Parent.Email', payloadData.parent.email);

      // Assessment info
      appendForm('Assessment.HasProgrammingExperience', Boolean(payloadData.assessment.hasProgrammingExperience));
      appendForm('Assessment.ProgrammingExperienceLevel', payloadData.assessment.programmingExperienceLevel || 'Beginner');
      appendForm('Assessment.ParticipatedInCompetitions', Boolean(payloadData.assessment.participatedInCompetitions));
      appendForm('Assessment.ProgrammingTools', payloadData.assessment.programmingTools || 'None');
      appendForm('Assessment.PrimaryGoal', payloadData.assessment.primaryGoal || 'Learn Programming & Robotics');

      if (file) {
        formData.append('PaymentScreenshot', file);
      } else {
        // Valid 1x1 PNG byte array so ASP.NET Core image decoder receives a valid PNG
        const realPngBase64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';
        const byteCharacters = atob(realPngBase64);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const validPngBlob = new Blob([byteArray], { type: 'image/png' });
        formData.append('PaymentScreenshot', validPngBlob, 'free-trial-receipt.png');
      }

      return axiosClient.post(ENDPOINTS.ENROLLMENT_APPLICATIONS, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    },
  });
}
