import React from 'react';

const Profile = () => {
  return (
    <div>
      <h1>Profile</h1>
      <div className='flex flex-row'>
        <div className='flex flex-col w-1/2'>
          <label htmlFor='firstname' className='text-lg'>
            FirstName
          </label>
          <input type='text' className='w-full mt-2  input_text' />
        </div>
        <div className='flex flex-col w-1/2'>
          <label htmlFor='lastname' className='text-lg'>
            LastName
          </label>
          <input type='text' className='w-full mt-2 input_text' />
        </div>
      </div>
      <div className='mt-2'>
        <label htmlFor='email' className='text-lg'>
          Email
        </label>
        <input type='text' className='input_text mt-2 w-full' />
      </div>
      <div className='mt-2'>
        <label htmlFor='dob' className='text-lg'>
          Date of Birth
        </label>
        <input type='date' name='' id='' className='ml-4 input_text' />
      </div>
      <div className='mt-2 flex flex-col'>
        <label htmlFor='phone' className='text-lg'>
          Phone
        </label>
        <input type='text' className='input_text' />
      </div>
      <div className='mt-2 flex flex-col'>
        <label htmlFor='city' className='text-lg'>
          City
        </label>
        <input type='text' className='input_text' />
      </div>
      <div className='mt-2 flex flex-col'>
        <label htmlFor='state' className='text-lg'>
          State
        </label>
        <input type='text' className='input_text' />
      </div>
      <div className='mt-2 flex flex-col'>
        <label htmlFor='postcode' className='text-lg'>
          Postcode
        </label>
        <input type='text' className='input_text' />
      </div>
      <div className='mt-2'>
        <label htmlFor='education' className='text-lg'>
          Education
        </label>
        <textarea
          name=''
          id=''
          cols={30}
          rows={10}
          className='w-full input_text'
        ></textarea>
      </div>
      <div className='mt-2'>
        <label htmlFor='preferences' className='text-lg'>
          Preferences
        </label>
        <textarea
          name=''
          id=''
          cols={30}
          rows={10}
          className='input_text w-full'
        ></textarea>
      </div>
      <div className='mt-2'>
        <label htmlFor='skills' className='text-lg'>
          Skills
        </label>
        <textarea
          name=''
          id=''
          cols={30}
          rows={10}
          className='input_text w-full'
        ></textarea>
      </div>
      <div className='mt-2'>
        <label htmlFor='coverletter' className='text-lg'>
          Cover Letter
        </label>
        <textarea
          name=''
          id=''
          cols={30}
          rows={10}
          className='input_text w-full'
        ></textarea>
      </div>
      <div className='mt-2'>
        <label htmlFor='resume' className='text-lg'>
          Resume
        </label>
        <input type='file' name='' id='' className='ml-2' />
      </div>
      <div className='mt-2 flex justify-center'>
        <button className='input_text border-0 bg-blue-800 text-white font-medium text-xl p-3 px-10'>
          Save Profile
        </button>
      </div>
    </div>
  );
};

export default Profile;
