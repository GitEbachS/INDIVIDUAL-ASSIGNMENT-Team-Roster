/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Card } from 'react-bootstrap';
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
  return (
    <div>
      <div className="teamView">
        <Card style={{ width: '350px', margin: '10px' }}>
          <Card.Body>
            <Card.Title className="titleBack">{teamDetails.name}</Card.Title>
          </Card.Body>
          <Card.Img variant="top" src={teamDetails.image} alt={teamDetails.name} style={{ width: '350px' }} />
        </Card>
      </div>
      <div className="viewMembers">{teamDetails.members?.map((member) => (
        <MemberCard key={member.firebaseKey} memberObj={member} onUpdate={getTDetails} />
      ))}
      </div>
    </div>
  );
}
