import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Form } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { useAuth } from '../../utils/context/authContext';
import { createMember, updateMember } from '../../api/teamData';

const intialState = {
  image: '',
  name: '',
  role: '',
};

export default function MemberForm({ memberObj }) {
  const { user } = useAuth();
  const [formInput, setFormInput] = useState({ ...intialState, uid: user.uid });
  const router = useRouter();

  useEffect(() => {
    if (memberObj.firebaseKey) setFormInput(memberObj);
  }, [memberObj, user]);
  console.warn(memberObj.firebaseKey);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (memberObj.firebaseKey) {
      updateMember(formInput).then(() => router.push(`/member/${memberObj.firebaseKey}`));
      // console.warn('Hi');
    } else {
      const payload = { ...formInput, uid: user.uid };
      createMember(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateMember(patchPayload).then(() => router.push('/'));
      });
    }
    // console.warn(memberObj);
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Image</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter an image url"
            name="image"
            value={formInput.image}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Team Member Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Member Name"
            name="name"
            value={formInput.name}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Role</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Role"
            name="role"
            value={formInput.role}
            onChange={handleChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
}

MemberForm.propTypes = {
  memberObj: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string,
    role: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

MemberForm.defaultProps = {
  memberObj: intialState,
};
