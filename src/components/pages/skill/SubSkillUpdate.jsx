import React from "react";
import InputText from "../../layouts/form/InputText";
import ModalUpdate from "../../layouts/modal/ModalUpdate";
import InputRadio from './../../layouts/form/InputRadio';
import InputTextArea from './../../layouts/form/InputTextArea';

export default function SubSkillUpdate({ show, setShow,viewItem,setViewItem,onSubmit }) {

  const onChange = (e) => {
    setViewItem({ ...viewItem, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <ModalUpdate
        title="Edit Sub Skills"
        show={show}
        setShow={setShow}
        onSubmit={()=>onSubmit()}
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
            title="Begineer"
            type="radio"
            value="begineer"
            onChange={onChange}
            checked={viewItem.type==='begineer'}
            />
            </div>

            <div className="col-sm-4 col-md-4 col-xl-4 col-lg-4">
            <InputRadio
            name="type"
            title="Intermediate"
            type="radio"
            value="intermediate"
            onChange={onChange}
            checked={viewItem.type==='intermediate'}
            />
            </div>
            
            <div className="col-sm-4 col-md-4 col-xl-4 col-lg-4">
            <InputRadio
            name="type"
            title="Advanced"
            type="radio"
            value="advanced"
            onChange={onChange}
            checked={viewItem.type==='advanced'}
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
