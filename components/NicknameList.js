import React from 'react';
import DisplayNicknameRow from '../containers/DisplayNicknameRow';
import DisplayGWNicknameRow from '../containers/DisplayGWNicknameRow';

const NicknameList = ({ list, children }) => {
  console.log('NicknameList created with list: ', list);
  let nicknames = [];
  for (let i in list) {
    const gwNicknameLabel = 'Gateway ID: ' + list[i].gateway_id;
    let color = "#A5D8FD";
    nicknames.push(
      <DisplayGWNicknameRow
        key={i}
        gateway_id={list[i].gateway_id}
        label={gwNicknameLabel}
        viewcolor={color}
      ></DisplayGWNicknameRow>
    );
    for (let j in list[i].nodes) {
      const nicknameLabel = "Node ID: " + list[i].nodes[j].nodeID;
      color = "#C5E8ED";
      if (i % 2 == 0) {
        color = "#9ED9E0";
      }
      nicknames.push(
        <DisplayNicknameRow
          key={i * list.length + j}
          gateway_id = {list[i].gateway_id}
          nodeID = {list[i].nodes[j].nodeID}
          label={nicknameLabel}
          viewcolor={color}
          //        titlecolor={list[i].color}
        ></DisplayNicknameRow>
      );
    }
  }

  return nicknames;
};

export default NicknameList;
