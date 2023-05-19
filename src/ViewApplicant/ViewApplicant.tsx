import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import authorizedInstance from '../axiosInstances/authInstance';
import { RootState } from '../states/store';
import { useSelector } from 'react-redux';
import { ProfileData, Roles } from '../interface';

const ViewApplicant = () => {
  const { jobId } = useParams();
  const username = useSelector((state: RootState) => state.user.username);
  console.log(jobId);
  const [applicants, setApplicants] = useState<
    { username: string; _id: string; role: Roles; password: string }[]
  >([]);
  const [selectedProfile, setSelectedProfile] = useState<string>('');

  const [profile, setProfile] = useState<ProfileData & { username: string }>({
    firstName: '',
    city: '',
    lastName: '',
    email: '',
    phone: '',
    postcode: '',
    state: '',
    dob: '',
    resume: '',
    coverLetter: '',
    education: '',
    preferences: '',
    skills: '',
    username: '',
  });

  useEffect(() => {
    const fetchApplicants = (title: string) => {
      authorizedInstance
        .post('/applicants', { title: title, username: username })
        .then((res) => {
          console.log(res.data);
          //   setApplicants((prev) => {
          //     return prev.map((applicant, index) => {
          //       return {
          //         ...prev,
          //         username: res.data[index].username,
          //         _id: res.data[index]._id,
          //         role: res.data[index].role,
          //       };
          //     });
          //   });
          setApplicants(res.data);
        });
    };
    if (jobId) fetchApplicants(jobId);
  }, [jobId]);

  const fetchProfile = async (id: string) => {
    await authorizedInstance
      .post(`/getprofile`, { username: selectedProfile })
      .then((res) => {
        console.log(res.data);
        setProfile((prev) => {
          return {
            ...prev,
            city: res.data.city,
            coverLetter: res.data.coverLetter,
            dob: res.data.dob,
            education: res.data.education,
            email: res.data.email,
            firstName: res.data.firstName,
            lastName: res.data.lastName,
            phone: res.data.phone,
            postcode: res.data.postcode,
            preferences: res.data.preferences,
            resume: res.data.resume,
            skills: res.data.skills,
            state: res.data.state,
            username: res.data.username,
          };
        });
      });
  };

  useEffect(() => {
    if (selectedProfile === '') return;
    fetchProfile(selectedProfile);
    console.log('Fetched a new Profile');
  }, [selectedProfile]);

  return (
    <div>
      <div className='mt-4'>
        <h1 className='text-2xl'>Applicants List</h1>
        {applicants.length > 0 ? (
          applicants.map((applicant, index) => {
            return (
              <div className='w-full flex flex-row' key={index}>
                <div className='w-1/3 p-3'>
                  <div className='w-full border-2 border-[#68EDC6] p-8 rounded-md'>
                    <div className='flex flex-row justify-between'>
                      <div>
                        <p className='text-xl font-semibold'>Username</p>
                        <span className='capitalize text-lg'>
                          {applicant.username}
                        </span>
                      </div>
                      <div>
                        <p className='text-xl font-semibold'>Role</p>
                        <span className='capitalize text-lg'>
                          {applicant.role}
                        </span>
                      </div>
                    </div>
                    <div className='w-full flex mt-5'>
                      <button
                        className='text-right btn-green font-semibold text-[#161616]'
                        onClick={() => setSelectedProfile(applicant.username)}
                      >
                        Review Profile
                      </button>
                    </div>
                  </div>
                </div>
                <div className='w-2/3 text-xl p-3'>
                  {selectedProfile === '' ? (
                    <div className='flex'>
                      <div className='m-auto mt-10'>
                        No Profile Selected. Please select a profile to review
                      </div>
                    </div>
                  ) : (
                    <div>
                      <h2 className='text-3xl text-center'>Profile Review</h2>
                      <div className='flex flex-row mt-5'>
                        <div className='w-1/2'>
                          <p className='font-semibold'>First Name</p>
                          <span>{profile.firstName}</span>
                        </div>
                        <div className='w-1/2'>
                          <p className='font-semibold'>Last Name</p>
                          <span>{profile.lastName}</span>
                        </div>
                      </div>
                      <div className='mt-5'>
                        <p className='font-semibold'>Username</p>
                        <span>{profile.username}</span>
                      </div>
                      <div className='mt-5'>
                        <p className='font-semibold'>Email</p>
                        <span>{profile.email}</span>
                      </div>
                      <div className='mt-5'>
                        <p className='font-semibold'>Phone</p>
                        <span>{profile.phone}</span>
                      </div>
                      <div className='mt-5'>
                        <p className='font-semibold'>Education</p>
                        <span>{profile.education}</span>
                      </div>
                      <div className='mt-5'>
                        <p className='font-semibold'>Preference</p>
                        <span>{profile.preferences}</span>
                      </div>
                      <div className='mt-5'>
                        <p className='font-semibold'>Skills</p>
                        <span>{profile.skills}</span>
                      </div>
                      <div className='mt-5'>
                        <p className='font-semibold'>City</p>
                        <span>{profile.city}</span>
                      </div>
                      <div className='mt-5'>
                        <p className='font-semibold'>State</p>
                        <span>{profile.state}</span>
                      </div>
                      <div className='mt-5'>
                        <p className='font-semibold'>Postcode</p>
                        <span>{profile.postcode}</span>
                      </div>
                      <div className='mt-5'>
                        <p className='font-semibold'>Cover Letter</p>
                        <span>{profile.coverLetter}</span>
                      </div>
                      <div className='flex flex-row mt-5 items-center'>
                        <p className='font-semibold'>Resume</p>
                        <a
                          href={profile.resume}
                          className='ml-6 btn-green pl-6 pr-6 text-[#161616] font-bold'
                        >
                          Download Resume
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div>No Applicants to Review Yet.</div>
        )}
      </div>
    </div>
  );
};

export default ViewApplicant;
