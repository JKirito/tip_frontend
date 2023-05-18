import React, { useEffect, useState } from 'react';
import authorizedInstance from '../axiosInstances/authInstance';
import { AxiosError } from 'axios';
import { ProfileData } from '../interface';
import AWS from 'aws-sdk';

AWS.config.update({
  accessKeyId: import.meta.env.VITE_S3_ACCESSKEY,
  secretAccessKey: import.meta.env.VITE_S3_SECRETKEY,
  region: import.meta.env.VITE_S3_REGION,
  signatureVersion: 'v4',
});

const Profile = () => {
  const [profile, setProfile] = useState<Partial<ProfileData>>({
    firstName: '',
    city: '',
    lastName: '',
    email: '',
    phone: '',
    postcode: '',
    state: '',
    dob: '',
    resume: '',
  });

  const [resume, setResume] = useState<File>();
  const [textareaData, setTextAreaData] = useState<Partial<ProfileData>>();

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextAreaData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const uploadFile = async () => {
    const s3 = new AWS.S3();
    if (!resume) return;
    const params = {
      Bucket: import.meta.env.VITE_S3_BUCKET,
      Key: `${Date.now()}.${resume.name}`,
      Body: resume,
    };
    const { Location } = await s3.upload(params).promise();
    console.log('uploading to s3', Location);
    return Location;
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await authorizedInstance.get('/profile');
        const data: ProfileData = res.data;
        setProfile((prev) => {
          return {
            ...prev,
            city: data.city,
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
            phone: data.phone,
            postcode: data.postcode,
            state: data.state,
            dob: data.dob,
            resume: data.resume,
          };
        });
        setTextAreaData((prev) => {
          return {
            ...prev,
            preferences: data.preferences,
            coverLetter: data.coverLetter,
            education: data.education,
            skills: data.skills,
          };
        });
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setProfile((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSaveProfile = async () => {
    try {
      // upload file to s3
      const fileDownloadURL = await uploadFile();

      const res = await authorizedInstance.post('/profile', {
        ...profile,
        ...textareaData,
        resume: fileDownloadURL,
      });
      const data: Partial<ProfileData> = res.data;
      setProfile((prev) => {
        return {
          ...prev,
          city: data.city,
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          phone: data.phone,
          postcode: data.postcode,
          state: data.state,
          dob: data.dob,
          resume: data.resume,
        };
      });
      setTextAreaData((prev) => {
        return {
          ...prev,
          preferences: data.preferences,
          coverLetter: data.coverLetter,
          education: data.education,
          skills: data.skills,
        };
      });
      alert('Profile Updated Successfully')
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>Profile</h1>
      <div className='flex flex-row'>
        <div className='flex flex-col w-1/2'>
          <label htmlFor='firstname' className='text-lg'>
            FirstName
          </label>
          <input
            type='text'
            name='firstName'
            value={profile.firstName}
            onChange={handleChange}
            className='w-full mt-2  input_text'
          />
        </div>
        <div className='flex flex-col w-1/2'>
          <label htmlFor='lastname' className='text-lg'>
            LastName
          </label>
          <input
            type='text'
            name='lastName'
            value={profile.lastName}
            onChange={handleChange}
            className='w-full mt-2 input_text'
          />
        </div>
      </div>
      <div className='mt-2'>
        <label htmlFor='email' className='text-lg'>
          Email
        </label>
        <input
          type='text'
          name='email'
          value={profile.email}
          onChange={handleChange}
          className='input_text mt-2 w-full'
        />
      </div>
      <div className='mt-2'>
        <label htmlFor='dob' className='text-lg'>
          Date of Birth
        </label>
        <input
          type='date'
          name='dob'
          value={profile.dob}
          onChange={handleChange}
          className='ml-4 input_text'
        />
      </div>
      <div className='mt-2 flex flex-col'>
        <label htmlFor='phone' className='text-lg'>
          Phone
        </label>
        <input
          type='text'
          name='phone'
          value={profile.phone}
          onChange={handleChange}
          className='input_text'
        />
      </div>
      <div className='mt-2 flex flex-col'>
        <label htmlFor='city' className='text-lg'>
          City
        </label>
        <input
          type='text'
          name='city'
          value={profile.city}
          onChange={handleChange}
          className='input_text'
        />
      </div>
      <div className='mt-2 flex flex-col'>
        <label htmlFor='state' className='text-lg'>
          State
        </label>
        <input
          type='text'
          name='state'
          value={profile.state}
          onChange={handleChange}
          className='input_text'
        />
      </div>
      <div className='mt-2 flex flex-col'>
        <label htmlFor='postcode' className='text-lg'>
          Postcode
        </label>
        <input
          type='text'
          name='postcode'
          value={profile.postcode}
          onChange={handleChange}
          className='input_text'
        />
      </div>
      <div className='mt-2'>
        <label htmlFor='education' className='text-lg'>
          Education
        </label>
        <textarea
          name='education'
          cols={30}
          rows={10}
          value={textareaData?.education}
          onChange={handleTextAreaChange}
          className='w-full input_text'
        ></textarea>
      </div>
      <div className='mt-2'>
        <label htmlFor='preferences' className='text-lg'>
          Preferences
        </label>
        <textarea
          name='preferences'
          value={textareaData?.preferences}
          onChange={handleTextAreaChange}
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
          name='skills'
          value={textareaData?.skills}
          onChange={handleTextAreaChange}
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
          name='coverLetter'
          value={textareaData?.coverLetter}
          onChange={handleTextAreaChange}
          cols={30}
          rows={10}
          className='input_text w-full'
        ></textarea>
      </div>
      <div className='mt-2'>
        <label htmlFor='resume' className='text-lg'>
          Resume
        </label>
        <input
          type='file'
          name='resume'
          // value={profile.resume}
          onChange={(e) => {
            setResume(e.target.files![0]);
          }}
          className='ml-2'
        />
        {profile.resume && <a href={profile.resume}>Download Resume</a>}
      </div>
      <div className='mt-2 flex justify-center'>
        <button
          className='input_text border-0 bg-blue-800 text-white font-medium text-xl p-3 px-10'
          onClick={handleSaveProfile}
        >
          Update Profile
        </button>
      </div>
    </div>
  );
};

export default Profile;
