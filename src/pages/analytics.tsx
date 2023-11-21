// @ts-nocheck
import { LineChart } from "@/components/chart/line-chart";
import Header from "@/components/Typography/Header";
import axios from "axios";
import { useEffect, useState } from "react";

const Analytics = () => {
  const [jobCount, setCompanies] = useState<any[]>([]);
  const [loading, setLoading] = useState<Boolean>(true);

  const getCompanies = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `https://api.joblab.ai/job/job-count-by-categories`
      );
      const jobCount = res.data;
      setCompanies(jobCount);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  useEffect(() => {
    getCompanies();
  }, []);
  return (
    <div className=" w-full bg-[#f4f7fc] dark:bg-[#0000]">
      <div className="pt-[50px] pb-[100px] pbox mt-14">
        <Header title="Total Jobs Count" />
        <div className="flex flex-col gap-y-10 mt-5">
          <div className="flex items-center justify-center p-5 bg-white dark:bg-transparent dark:border dark:border-brand-dark-100 h-[300px] shadow-container rounded-lg">
            <LineChart data={jobCount} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
