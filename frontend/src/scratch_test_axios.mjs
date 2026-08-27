import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'http://sane3-temp.runasp.net/api',
  headers: {
    'Accept': 'application/json',
  },
});

axiosClient.interceptors.response.use(
  (res) => res.data,
  (err) => Promise.reject(err)
);

async function testAxiosPost() {
  const ts = Date.now();
  const formData = new FormData();
  formData.append('ProgramSemsterId', '10');
  formData.append('Student.FirstName', 'عمر');
  formData.append('Student.LastName', 'يوسف');
  formData.append('Student.DateOfBirth', '2008-05-15');
  formData.append('Student.Grade', 'الصف الثالث الثانوي');
  formData.append('Student.Governorate', 'أسيوط');
  formData.append('Student.StudentPhone', '01097380193');
  formData.append('Student.StudentEmail', `student_${ts}@gmail.com`);
  formData.append('Parent.Name', 'يوسف علي');
  formData.append('Parent.Phone', '01097380193');
  formData.append('Parent.Email', `parent_${ts}@gmail.com`);

  try {
    const res = await axiosClient.post('/enrollmentapplications', formData);
    console.log('Axios Result:', res);
  } catch (err) {
    console.error('Axios Error Status:', err.response?.status);
    console.error('Axios Error Data:', err.response?.data);
  }
}

testAxiosPost();
