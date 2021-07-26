import React from "react";
import ModalUpdate from "../../layouts/modal/ModalUpdate";
import InputText from './../../layouts/form/InputText';

export default function SkillUpdate({ show, setShow,viewItem,setViewItem,onSubmit }) {

  const onChange = (e) => {
    setViewItem({ ...viewItem, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <ModalUpdate
        title="Edit Skill"
        show={show}
        setShow={setShow}
        onSubmit={()=>onSubmit()}
      >
        <InputText
          name="title"
          type="text"
          title="Title"
          value={viewItem.title}
          onChange={onChange}
        />
        <InputText
          name="intro_url"
          type="textarea"
          title="Description(If Any):"
          value={viewItem.intro_url}
          onChange={onChange}
        />
      </ModalUpdate>
    </div>
  );
}
