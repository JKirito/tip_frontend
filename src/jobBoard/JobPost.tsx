import React, { useState, useEffect } from 'react';
import { JobPostData, JobType } from '../interface';
import authorizedInstance from '../axiosInstances/authInstance';

const JobPost = () => {
  const [post, setPost] = useState<JobPostData>({
    description: '',
    location: '',
    subject: '',
    title: '',
    jobType: JobType.FULL_TIME,
  });

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setPost((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPost((prev) => {
      return {
        ...prev,
        jobType: e.target.value as JobType,
      };
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(post);
    authorizedInstance
      .post('/jobpost', { ...post })
      .then((res) => {
        console.log(`Successful Job Creation`);
      })
      .catch((err) => console.error);
  };

  return (
    <div>
      <form className='flex flex-col' onSubmit={handleSubmit}>
        <p className='self-start text-xl bold'>Job Posting</p>
        <div className='flex flex-col mt-4'>
          <label className='self-start text-xl capitalize'>Title</label>
          <input
            type='text'
            name='title'
            className='input_text w-1/2'
            onChange={handleChange}
          />
        </div>
        <div className='flex justify-between mt-4'>
          <div className='flex flex-col basis-1/2'>
            <label className='self-start text-xl capitalize'>Subject</label>
            <input
              type='text'
              name='subject'
              className='input_text mr-2'
              onChange={handleChange}
            />
          </div>
          <div className='flex flex-col basis-1/2'>
            <label className='self-start ml-2 text-xl capitalize'>
              Location
            </label>
            <input
              type='text'
              name='location'
              className='input_text ml-2'
              onChange={handleChange}
            />
          </div>
        </div>

        <div className='mt-4'>
          <label className='text-xl capitalize'>Job Type</label>
          <select
            name=''
            id=''
            className='text-md'
            onChange={handleOptionChange}
          >
            <option value={JobType.FULL_TIME}>{JobType.FULL_TIME}</option>
            <option value={JobType.INTERNSHIP}>{JobType.INTERNSHIP}</option>
            <option value={JobType.PART_TIME}>{JobType.PART_TIME}</option>
            <option value={JobType.CONTRACT}>{JobType.CONTRACT}</option>
            <option value={JobType.VOLUNTEER}>{JobType.VOLUNTEER}</option>
            <option value={JobType.OTHER}>{JobType.OTHER}</option>
          </select>
        </div>

        <div className='flex flex-col mt-4'>
          <label className='self-start text-xl capitalize'>Description</label>
          <textarea
            name='description'
            cols={50}
            rows={20}
            className='input_text basis-full'
            onChange={handleChange}
          ></textarea>
        </div>
        <div className='w-full mt-4'>
          <button
            className='input_text w-full bg-[#68edc6]  font-bold'
            type='submit'
          >
            Post a Job
          </button>
        </div>
      </form>
    </div>
  );
};

export default JobPost;
