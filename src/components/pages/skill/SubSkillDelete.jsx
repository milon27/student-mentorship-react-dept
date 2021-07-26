import React, { useContext, useState } from "react";
import InputText from "../../layouts/form/InputText";
import AppAction from "./../../../utils/context/actions/AppAction";
import ListAction from "./../../../utils/context/actions/ListAction";
import { DispatchContext } from "./../../../utils/context/MainContext";
import ModalDelete from "../../layouts/modal/ModalDelete";
import InputRadio from './../../layouts/form/InputRadio';
import InputTextArea from './../../layouts/form/InputTextArea';
import Define from './../../../utils/helpers/Define';

export default function SubSkillDelete({ show, setShow, viewItem }) {
  const { appDispatch, subSkill_listDispatch } = useContext(DispatchContext);

  const [SubSkill, setSubSkill] = useState(viewItem);

  const onSubmit = async () => {
    //hide the modal
    setShow(false);
    //validation
    const appAction = new AppAction(appDispatch);
    //call api
    const listAction = new ListAction(subSkill_listDispatch);
    const res = await listAction.deleteData(`career/delete/sub_skill/id/${viewItem.id}`, SubSkill, "id");
    appAction.SET_RESPONSE(res);
  };

  const onChange = (e) => {
    setSubSkill({ ...SubSkill, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <ModalDelete
        title="Delete Sub Skill"
        show={show}
        setShow={setShow}
        onSubmit={onSubmit}
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
              value={viewItem.type}
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
              onChange={viewItem.type}
              checked={viewItem.type === Define.TYPE_SKILL_INTERMIDIATE}
            />
          </div>

          <div className="col-sm-4 col-md-4 col-xl-4 col-lg-4">
            <InputRadio
              name="type"
              title={Define.TYPE_SKILL_ADVANCED}
              type="radio"
              value={Define.TYPE_SKILL_ADVANCED}
              onChange={viewItem.type}
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
      </ModalDelete>
    </div>
  );
}
