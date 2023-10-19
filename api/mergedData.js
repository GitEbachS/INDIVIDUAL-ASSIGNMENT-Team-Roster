import { deleteMember, getMembersByTeamId, getSingleMember } from './memberData';
import { deleteSingleTeam, getSingleTeam } from './teamData';

const deleteTeamMembers = (teamId) => new Promise((resolve, reject) => {
  getMembersByTeamId(teamId).then((membersArray) => {
    console.warn(membersArray, 'Team Members');
    const deleteMemberPromises = membersArray.map((member) => deleteMember(member.firebaseKey));

    Promise.all(deleteMemberPromises).then(() => {
      deleteSingleTeam(teamId).then(resolve);
    });
  }).catch((error) => reject(error));
});

const viewTeamDetails = (teamFirebaseKey) => new Promise((resolve, reject) => {
  Promise.all([getSingleTeam(teamFirebaseKey), getMembersByTeamId(teamFirebaseKey)])
    .then(([teamObject, teamMembersArray]) => {
      resolve({ ...teamObject, members: teamMembersArray });
    }).catch((error) => reject(error));
  console.warn(teamFirebaseKey);
});
const viewMemberDetails = (memberFirebaseKey) => new Promise((resolve, reject) => {
  getSingleMember(memberFirebaseKey)
    .then((memberObject) => {
      getSingleTeam(memberObject.teamId)
        .then((teamObject) => {
          resolve({ teamObject, ...memberObject });
        });
    }).catch((error) => reject(error));
});

const getTeamDetails = async (firebaseKey) => {
  const team = await getSingleTeam(firebaseKey);
  const members = await getMembersByTeamId(firebaseKey);

  return { ...team, members };
};

export {
  deleteTeamMembers, viewMemberDetails, viewTeamDetails, getTeamDetails,
};
