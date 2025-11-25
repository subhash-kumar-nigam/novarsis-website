import React, { useEffect, useState } from 'react';
import { getRequest } from '../../apis/ApiInstence'; // correct method

const MyJob = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await getRequest("applynow");// your backend endpoint
        setJobs(res.data || []);
      } catch (err) {
        console.error("Failed to fetch applied jobs", err);
        setError("Failed to load applied jobs.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) return <p className="text-center py-10">Loading...</p>;
  if (error) return <p className="text-center py-10 text-red-500">{error}</p>;
  if (jobs.length === 0) return <p className="text-center py-10">No applied jobs found.</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-[#fc3c04]">My Applied Jobs</h2>
      <div className="space-y-4">
        {jobs.map((job, index) => (
          <div
            key={index}
            className="p-4 bg-white shadow rounded border flex justify-between items-center"
          >
            <div>
              <h3 className="font-semibold text-lg text-[#345bf3]">{job.job_title}</h3>
              <p className="text-sm text-gray-600">
                Applied on: {new Date(job.createdAt).toLocaleDateString()}
              </p>
              <p className="text-sm text-[#fc3c04]">Name: {job.name}</p>
              <p className="text-sm text-gray-600">Email: {job.email}</p>
              <p className="text-sm text-gray-600">Mobile: {job.mobile}</p>
            </div>
            {job.resume && (
              <a
                href={`${process.env.REACT_APP_BACKEND}uploads/resumes/${job.resume}`}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 hover:underline"
              >
                View Resume
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyJob;
