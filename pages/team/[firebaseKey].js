/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { viewTeamDetails } from '../../api/mergedData';
import MemberCard from '../../components/MemberCard';

export default function ViewTeam() {
  const [teamDetails, setTeamDetails] = useState({});
  const router = useRouter();

  // grab firebaseKey from url
  const { firebaseKey } = router.query;

  const getTDetails = () => {
    viewTeamDetails(firebaseKey).then(setTeamDetails);
  };
  // make call to API layer to get the data
  useEffect(() => {
    getTDetails();
  }, [firebaseKey]);
  console.warn(teamDetails);
  return (
    <div>{teamDetails.members?.map((member) => (
      <MemberCard key={member.firebaseKey} memberObj={member} onUpdate={getTDetails} />
    ))}
    </div>
  );
}
