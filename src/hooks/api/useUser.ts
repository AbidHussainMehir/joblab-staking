import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "universal-cookie";

export interface ProfileDataType {
  fullName: string;
  about: string;
  createdAt: string;
  updatedAt: string;
  email: string;
  id: string;
  jobTitle: string;
  skills: string;
  job_categories: number[];
  username: string;
  profilePicture: string;
  status: string;
  roles: string[];
}

export default function useUser() {
  const [data, setData] = useState<ProfileDataType>();
  const [error, setError] = useState<boolean>(false);
  const cookies = new Cookies();
  const fetcher = async () => {
    // try {
    //   const { data } = await axios.get(`https://api.joblab.ai/user/profile`, {
    //     headers: {
    //       Authorization: `Bearer ${cookies.get("accessToken")}`,
    //     },
    //   });

    //   setData(data[0]);
    // } catch (error) {
    //   setError(true);
    // }
  };

  useEffect(() => {
    setData(undefined);
    setError(false);
    fetcher();
  }, []);

  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
    reFetch: fetcher,
  };
}
