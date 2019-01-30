import React from 'React';
import DisplayNicknameRow from '../containers/DisplayNicknameRow';

const NicknameList = ({ list, children }) => {
  console.log('NicknameList created with list:', list);
  let nicknames = [];
  for (let i=0; i < list.length; i++) {
    const nicknamelabel = 'Node ID: ' + list[i].nodeID;
    color='#C5E8ED';
    if(i%2==0) {
      color='#9ED9E0';
    }
    nicknames.push(
      <DisplayNicknameRow
        key={i}
        nodeIndex={i}
        label={nicknamelabel}
        viewcolor={color}
//        titlecolor={list[i].color}
      >
      </DisplayNicknameRow>
    )
  }

  //console.log('ControlsButtonList returning nodeButtons',nodeButtons);
  return (
    nicknames
  )
}

export default NicknameList
