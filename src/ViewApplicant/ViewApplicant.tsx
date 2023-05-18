import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import authorizedInstance from '../axiosInstances/authInstance';
import { RootState } from '../states/store';
import { useSelector } from 'react-redux';
import { Roles } from '../interface';

const ViewApplicant = () => {
  const { jobId } = useParams();
  const username = useSelector((state: RootState) => state.user.username);
  console.log(jobId);
  const [applicants, setApplicants] = useState<
    { username: string; _id: string; role: Roles; password: string }[]
  >([]);

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

  return (
    <div>
      <div>
        {applicants.length > 0 ? (
          applicants.map((applicant, index) => {
            return (
              <div className='w-1/3'>
                <div className='w-full border-2 border-gray-600 p-8 rounded-md'>
                  <p>
                    User <span>{applicant.username}</span>
                  </p>
                  <p>
                    Role <span>{applicant.role}</span>
                  </p>
                  <p className='text-right'>View Profile</p>
                </div>
                <div>
                  <h2>Profile Review</h2>
                  <p>Skills</p>
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
