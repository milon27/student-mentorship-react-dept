import React from "react";
import InputText from "../../layouts/form/InputText";
import ModalUpdate from "../../layouts/modal/ModalUpdate";
import InputRadio from './../../layouts/form/InputRadio';
import InputTextArea from './../../layouts/form/InputTextArea';
import Define from './../../../utils/helpers/Define';

export default function SubSkillUpdate({ show, setShow, viewItem, setViewItem, onSubmit }) {

  const onChange = (e) => {
    setViewItem({ ...viewItem, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <ModalUpdate
        title="Edit Sub Skills"
        show={show}
        setShow={setShow}
        onSubmit={() => onSubmit()}
      >
        <InputText
          name="title"
          title="Title"
          type="text"
          value={viewItem.title}
          onChange={onChange}
        />

        <div className="row pb-2">

          <div className="col-sm-4 col-md-4 col-xl-4 col-lg-4">
            <InputRadio
              name="type"
              title={Define.TYPE_SKILL_BEGINNER}
              type="radio"
              value={Define.TYPE_SKILL_BEGINNER}
              onChange={onChange}
              checked={viewItem.type === Define.TYPE_SKILL_BEGINNER}
            />
          </div>

          <div className="col-sm-4 col-md-4 col-xl-4 col-lg-4">
            <InputRadio
              name="type"
              title={Define.TYPE_SKILL_INTERMIDIATE}
              type="radio"
              value={Define.TYPE_SKILL_INTERMIDIATE}
              onChange={onChange}
              checked={viewItem.type === Define.TYPE_SKILL_INTERMIDIATE}
            />
          </div>

          <div className="col-sm-4 col-md-4 col-xl-4 col-lg-4">
            <InputRadio
              name="type"
              title={Define.TYPE_SKILL_ADVANCED}
              type="radio"
              value={Define.TYPE_SKILL_ADVANCED}
              onChange={onChange}
              checked={viewItem.type === Define.TYPE_SKILL_ADVANCED}
            />
          </div>

        </div>

        <InputTextArea
          name="task"
          title="Description (Guidelines,Resources links):"
          value={viewItem.task}
          onChange={onChange}
        />

        <InputText
          name="pass_mark"
          type="number"
          title="Pass Mark"
          value={viewItem.pass_mark}
          onChange={onChange}
        />

      </ModalUpdate>
    </div>
  );
}
