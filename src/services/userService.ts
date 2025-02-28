import toast from 'react-hot-toast';
import { ApiConfig } from '../config/apiConfig';
import { apiService } from './apiService';

// const signIn = async ({
//   user_name,
//   password,
// }: {
//   user_name: string;
//   password: string;
// }) => {
//   try {
//     const { data } = await apiService.post(
//       `${ApiConfig.baseUrl}/${ApiConfig.login}`,
//       {
//         user_name,
//         password,
//       }
//     );
//     return data.data;
//   } catch (error: any) {
//     console.error(error);
//     toast.error(error.response.data.message);
//   }
// };

const signIn = async ({
  user_name,
  password,
}: {
  user_name: string;
  password: string;
}) => {
  try {
    const { data } = await apiService.post(
      `${ApiConfig.baseUrl}/${ApiConfig.login}`,
      {
        user_name,
        password,
      }
    );

    if (data.data.token) {
      localStorage.setItem('token', data.data.token); // Save token
    }

    return data.data;
  } catch (error: any) {
    console.error(error);
    toast.error(error.response.data.message);
  }
};

// const getMe = async () =>{
//   try {
//     const { data } = await apiService.get(`${ApiConfig.baseUrl}/${ApiConfig.user}`);
//     return data.data;
//   } catch (error: any) {
//     console.error(error);
//    }
// }

const getMe = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) return null;

    const { data } = await apiService.get(
      `${ApiConfig.baseUrl}/${ApiConfig.user}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return data.data;
  } catch (error: any) {
    console.error(error);
  }
};

export { signIn, getMe };
