import React, { useEffect } from 'react';
import authorizedInstance from '../axiosInstances/authInstance';
import { AxiosResponse } from 'axios';
import { JobsFetchData } from '../interface';
import { useDispatch, useSelector } from 'react-redux';
import { setJobs } from '../states/slices/jobBoardSlice';
import { RootState } from '../states/store';

const JobBoard = () => {
  const dispatch = useDispatch();
  const jobs = useSelector((state: RootState) => state.jobBoard.jobs);

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
  }, []);
  return (
    <div>
      <h1 className='text-4xl text-center mt-3 mb-3 capitalize'>Job Board</h1>
      {jobs.map((job, index) => {
        return (
          <div key={index} className='border-2 rounded-md p-5 m-1 shadow-md'>
            <div className='text-2xl capitalize'>{job.title}</div>
            <div className='text-lg  text-gray-500'>
              Posted By <span className='font-bold'>{job.username}</span>
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
              <h3 className='text-2xl'>Description</h3>
              <p className='text-lg'>{job.description}</p>
            </div>
            <div className='flex w-full mt-5'>
              <button className='self-end border-2 rounded-md ml-auto bg-blue-900 text-white text-xl px-4 py-2 hover:bg-blue-700'>
                Apply
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default JobBoard;
