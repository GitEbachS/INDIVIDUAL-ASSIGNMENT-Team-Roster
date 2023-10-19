import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { deleteMember } from '../api/memberData';
import { getTeamDetails } from '../api/mergedData';

function MemberCard({ memberObj, onUpdate }) {
  const [teamDetails, setTeamDetails] = useState({});
  // FOR DELETE, WE NEED TO REMOVE THE MEMBER AND HAVE THE VIEW RERENDER,
  // SO WE PASS THE FUNCTION FROM THE PARENT THAT GETS THE MEMBERS
  const deleteThisMember = () => {
    if (window.confirm(`Delete ${memberObj.name}?`)) {
      deleteMember(memberObj.firebaseKey).then(() => onUpdate());
    }
  };
  useEffect(() => {
    getTeamDetails(memberObj.teamId).then(setTeamDetails);
  }, []);

  return (
    <Card className="memberCard" style={{ width: '18rem', margin: '10px' }}>
      <Card.Img className="memberImage" variant="top" src={memberObj.image} alt={memberObj.name} style={{ height: '350px' }} />
      <Card.Body>
        <Card.Title>{memberObj.name}</Card.Title>
        <p>{memberObj.role}</p>
        <Card.Text>{teamDetails.name}</Card.Text>
        {/* DYNAMIC LINK TO EDIT THE MEMBER DETAILS  */}
        <div className="wrapper">
          <Link href={`/member/${memberObj.firebaseKey}`} passHref>
            <Button variant="primary" className="viewBtn m-2">VIEW</Button>
          </Link>
          <Link href={`/member/edit/${memberObj.firebaseKey}`} passHref>
            <Button className="editBtn m-2" variant="info">EDIT</Button>
          </Link>
          <Button variant="warning" onClick={deleteThisMember} className=" deleteBtn m-2">
            DELETE
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

MemberCard.propTypes = {
  memberObj: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string,
    role: PropTypes.bool,
    firebaseKey: PropTypes.string,
    teamId: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default MemberCard;
