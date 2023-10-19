import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { deleteSingleTeam } from '../api/teamData';

function TeamCard({ teamObj, onUpdate }) {
  // FOR DELETE, WE NEED TO REMOVE THE MEMBER AND HAVE THE VIEW RERENDER,
  // SO WE PASS THE FUNCTION FROM THE PARENT THAT GETS THE MEMBERS
  const deleteThisTeam = () => {
    if (window.confirm(`Delete ${teamObj.name}?`)) {
      deleteSingleTeam(teamObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Img variant="top" src={teamObj.image} alt={teamObj.name} style={{ height: '350px' }} />
      <Card.Body>
        <Card.Title>{teamObj.name}</Card.Title>
        <div className="wrapper">
          <Link href={`/team/${teamObj.firebaseKey}`} passHref>
            <Button variant="primary" className="viewBtn m-2">VIEW</Button>
          </Link>
          {/* DYNAMIC LINK TO EDIT THE MEMBER DETAILS  */}
          <Link href={`/team/edit/${teamObj.firebaseKey}`} passHref>
            <Button className="editBtn m-2" variant="info">EDIT</Button>
          </Link>
          <Button variant="warning" onClick={deleteThisTeam} className="deleteBtn m-2">
            DELETE
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

TeamCard.propTypes = {
  teamObj: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default TeamCard;
