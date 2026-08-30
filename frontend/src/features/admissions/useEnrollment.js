import { useMutation } from '@tanstack/react-query';
import { axiosClient } from '../../api/axiosClient';
import { ENDPOINTS } from '../../api/endpoints';

export function useSubmitEnrollmentMutation() {
  return useMutation({
    mutationFn: async (payloadData) => {
      // Format DateOfBirth cleanly to YYYY-MM-DD (DateOnly in C#)
      let cleanDob = payloadData.student.dateOfBirth;
      if (cleanDob && cleanDob.includes('T')) {
        cleanDob = cleanDob.split('T')[0];
      }

      const parentPhone = payloadData.parent.phone.trim();
      const parentEmailInput = payloadData.parent.email?.trim();
      
      // If parent email was provided, use it. If left blank, generate unique contact email for backend DB requirements
      const parentEmail = parentEmailInput || `parent_${parentPhone}_${Date.now()}@sane3.me`;

      // Student phone and email fallback to parent's if not entered by student
      const studentPhone = payloadData.student.studentPhone?.trim() || parentPhone;
      const studentEmail = payloadData.student.studentEmail?.trim() || parentEmail;

      // Construct FormData for .NET FromForm Model Binding
      const formData = new FormData();
      formData.append('ProgramSemsterId', String(payloadData.programSemsterId));
      formData.append('Student.FirstName', payloadData.student.firstName.trim());
      formData.append('Student.LastName', payloadData.student.lastName.trim());
      formData.append('Student.DateOfBirth', cleanDob);
      formData.append('Student.Grade', payloadData.student.grade.trim());
      formData.append('Student.Governorate', payloadData.student.governorate.trim());
      
      // Optional school: only append if non-empty
      if (payloadData.student.school && payloadData.student.school.trim()) {
        formData.append('Student.School', payloadData.student.school.trim());
      }

      formData.append('Student.StudentPhone', studentPhone);
      formData.append('Student.StudentEmail', studentEmail);

      formData.append('Parent.Name', payloadData.parent.name.trim());
      formData.append('Parent.Phone', parentPhone);
      formData.append('Parent.Email', parentEmail);

      return axiosClient.post(ENDPOINTS.ENROLLMENT_APPLICATIONS, formData);
    },
  });
}
