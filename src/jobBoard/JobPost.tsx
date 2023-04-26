import React from 'react';

const JobPost = () => {
  return (
    <div>
      <form className='flex flex-col'>
        <p className='self-start text-xl bold'>Job Posting</p>
        <div className='flex flex-col'>
          <label className='self-start'>Title</label>
          <input type='text' name='title' className='input_text w-1/2' />
        </div>
        <div className='flex justify-between'>
          <div className='flex flex-col basis-1/2'>
            <label className='self-start'>Subject</label>
            <input type='text' name='subject' className='input_text mr-2' />
          </div>
          <div className='flex flex-col basis-1/2'>
            <label className='self-start ml-2'>Location</label>
            <input type='text' name='location' className='input_text ml-2' />
          </div>
        </div>

        <div className='flex flex-col'>
          <label className='self-start'>Description</label>
          <textarea
            name='description'
            cols={50}
            rows={20}
            className='input_text basis-full'
          ></textarea>
        </div>
        <div className='w-full mt-4'>
          <button className='input_text w-full bg-[#68edc6]' type='submit'>
            Post a Job
          </button>
        </div>
      </form>
    </div>
  );
};

export default JobPost;
