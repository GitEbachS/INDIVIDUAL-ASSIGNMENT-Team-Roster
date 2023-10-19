import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import { signOut } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';
import MemberCard from '../components/MemberCard';
import { getMembers } from '../api/memberData';

function Members() {
  const [members, setMembers] = useState([]);
  const { user } = useAuth();

  const getAllTheMembers = () => {
    getMembers(user.uid).then(setMembers);
  };

  useEffect(() => {
    getAllTheMembers();
  }, []);

  return (
    <div className="text-center my-4">
      <h1>Members</h1>
      <Link href="/member/new" passHref>
        <Button className="createBtn">Add A Member</Button>
      </Link>
      <div className="d-flex flex-wrap">
        {members.map((member) => (
          <MemberCard key={member.firebaseKey} memberObj={member} onUpdate={getAllTheMembers} />
        ))}

      </div>
      <Button variant="danger" type="button" size="lg" className="copy-btn" onClick={signOut}>
        Sign Out
      </Button>
    </div>
  );
}

export default Members;
