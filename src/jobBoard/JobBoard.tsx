import React, { useEffect, useState } from 'react';
import authorizedInstance from '../axiosInstances/authInstance';
import { AxiosResponse } from 'axios';
import { JobsFetchData } from '../interface';
import { useDispatch, useSelector } from 'react-redux';
import { setJobs } from '../states/slices/jobBoardSlice';
import { RootState } from '../states/store';
import { JobType } from '../interface';

const JobBoard = () => {
  const dispatch = useDispatch();
  const jobs = useSelector((state: RootState) => state.jobBoard.jobs);
  const [filteredJobs, setFileteredJobs] = useState(jobs);
  const [isFiltered, setIsFiltered] = useState<boolean>(false);
  const [jobTypeFilter, setJobTypeFilter] = useState<JobType>(
    JobType.FULL_TIME
  );
  const [searchQuery, setSearchQuery] = useState('');

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

  useEffect(() => {
    const filteredJobs = jobs.filter((job) => {
      return (
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
    setFileteredJobs(filteredJobs);
    setIsFiltered(true);
    console.log(filteredJobs);
  }, [searchQuery]);

  const handleFiltering = () => {
    let filteredJobs = jobs.filter((job) => job.jobType === jobTypeFilter);
    filteredJobs = filteredJobs.filter((job) => {
      return (
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
    setFileteredJobs(filteredJobs);
    console.log(filteredJobs);
    setIsFiltered(true);
  };

  const handleSelectboxChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setJobTypeFilter(e.target.value as JobType);
    // handleFiltering();
    setIsFiltered(true);
  };

  return (
    <div>
      <h1 className='text-4xl text-center mt-3 mb-3 capitalize'>Job Board</h1>
      <div>
        <input
          type='text'
          placeholder='Search Opportunites'
          className='input_text w-full'
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
        />
        <div className='flex flex-row justify-between mt-4'>
          <select
            name='jboxselect'
            id='jboxselect'
            onChange={handleSelectboxChange}
          >
            <option value={JobType.FULL_TIME}>{JobType.FULL_TIME}</option>
            <option value={JobType.PART_TIME}>{JobType.PART_TIME}</option>
            <option value={JobType.CONTRACT}>{JobType.CONTRACT}</option>
            <option value={JobType.INTERNSHIP}>{JobType.INTERNSHIP}</option>
            <option value={JobType.VOLUNTEER}>{JobType.VOLUNTEER}</option>
            <option value={JobType.OTHER}>{JobType.OTHER}</option>
          </select>
          <button
            className='input_text ml-auto bg-[#68edc6] font-bold text-black px-4 py-2 border-0'
            onClick={handleFiltering}
          >
            Search
          </button>
        </div>
      </div>
      <div className='mt-4'>
        {!isFiltered &&
          jobs.map((job, index) => {
            return (
              <div
                key={index}
                className='border-2 rounded-md p-5 m-1 shadow-md'
              >
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
                  <span className='text-2xl'>Job Type</span>
                  <span className='text-lg capitalize'>{job.jobType}</span>
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
      <div className='mt-4'>
        {isFiltered &&
          filteredJobs.map((job, index) => {
            return (
              <div
                key={index}
                className='border-2 rounded-md p-5 m-1 shadow-md'
              >
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
                  <span className='text-2xl'>Job Type</span>
                  <span className='text-lg capitalize'>{job.jobType}</span>
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
    </div>
  );
};

export default JobBoard;
