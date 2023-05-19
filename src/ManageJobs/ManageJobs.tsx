import React, { useEffect, useState } from 'react';
import { RootState } from '../states/store';
import { useDispatch, useSelector } from 'react-redux';
import authorizedInstance from '../axiosInstances/authInstance';
import { setJobs } from '../states/slices/jobBoardSlice';
import { AxiosResponse } from 'axios';
import { JobsFetchData } from '../interface';
import { useNavigate } from 'react-router-dom';

function ManageJobs() {
  const jobs = useSelector((state: RootState) => state.jobBoard.jobs);
  const username = useSelector((state: RootState) => state.user.username);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [jobCount, setJobCount] = useState(0);

  useEffect(() => {
    console.log(jobs);
  }, [jobs]);

  useEffect(() => {
    const fetchJobs = async () => {
      const res: AxiosResponse<JobsFetchData[]> = await authorizedInstance.get(
        '/jobpost'
      );
      console.log(res.data);
      dispatch(
        setJobs({
          jobs: res.data,
        })
      );
    };
    fetchJobs();
    updateJobCount();
  }, []);

  const refetchJobs = async () => {
    const res: AxiosResponse<JobsFetchData[]> = await authorizedInstance.get(
      '/jobpost'
    );
    console.log(res.data);
    dispatch(
      setJobs({
        jobs: res.data,
      })
    );
    updateJobCount();
  };

  const deleteJob = async (id: number) => {
    const res = confirm('Are you sure you want to delete this job?');
    if (!res) return;
    authorizedInstance
      .post('/deletejob', {
        username: username,
        job: jobs[id],
      })
      .then((res) => {
        console.log(res.data);
        refetchJobs();
      })
      .catch((err) => {
        console.error(err);
      });
    updateJobCount();
  };

  const updateJobCount = () => {
    const arr = jobs.filter((job) => {
      return job.username === username;
    });
    arr.length > 0 ? setJobCount(arr.length) : setJobCount(0);
  };

  return (
    <div>
      <h1 className='text-3xl mt-5 mb-5'>Manage Jobs</h1>
      <div>
        {jobs.map((job, index) => {
          if (job.username === username) {
            return (
              <div
                key={index}
                className='border-2 border-[#68edc6] rounded-md p-5 m-1 shadow-lg'
              >
                <div className='text-2xl capitalize'>{job.title}</div>
                <div className='text-lg  text-gray-500'>
                  Posted By{' '}
                  <span className='font-bold'>
                    {job.username === username ? 'You' : job.username}
                  </span>
                </div>
                <div className='flex flex-row justify-between mt-5'>
                  <div className='flex flex-col'>
                    <span className='text-2xl'>Subject</span>
                    <span className='text-lg uppercase'>{job.subject}</span>
                  </div>
                  <div className='flex flex-col text-right'>
                    <span className='text-2xl'>Location</span>
                    <span className='text-lg uppercase'>{job.location}</span>
                  </div>
                </div>
                <div className='flex flex-col mt-5'>
                  <span className='text-2xl'>Job Type</span>
                  <span className='text-lg capitalize'>{job.jobType}</span>
                </div>
                <div className='flex flex-col mt-5'>
                  <h3 className='text-2xl'>Description</h3>
                  <p className='text-lg'>{job.description}</p>
                </div>
                <div className='flex w-full mt-5'>
                  <button
                    className='self-end border-2 rounded-md bg-blue-900 text-white text-xl px-4 py-2 hover:bg-blue-700'
                    onClick={() => {
                      navigate(`/manage/applicants/${job.title}`);
                    }}
                  >
                    View Applicants
                  </button>
                  <button
                    className='self-end border-2 rounded-md bg-red-600 text-white text-xl px-4 py-2 hover:bg-red-700'
                    onClick={() => {
                      deleteJob(index);
                    }}
                  >
                    Delete Job
                  </button>
                </div>
              </div>
            );
          }
        })}
      </div>
      <div>
        {jobCount === 0 ? (
          <div className='w-full flex mt-12 mb-12'>
            <div className='m-auto'>You did not Post any jobs yet.</div>
          </div>
        ) : (
          <React.Fragment></React.Fragment>
        )}
      </div>
    </div>
  );
}

export default ManageJobs;
