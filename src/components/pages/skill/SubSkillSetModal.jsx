import React, { useContext, useState } from "react";
import Helper from "../../../utils/helpers/Helper";
import InputText from "../../layouts/form/InputText";
import MyModal from "../../layouts/modal/MyModal";
import AppAction from "../../../utils/context/actions/AppAction";
import ListAction from "../../../utils/context/actions/ListAction";
import { DispatchContext } from "../../../utils/context/MainContext";
import Define from "../../../utils/helpers/Define";
import Response from "../../../utils/helpers/Response";
import '../../../assets/css/modalColor.css';
import InputRadio from "../../layouts/form/InputRadio";
import InputTextArea from './../../layouts/form/InputTextArea';

export default function SubSkillSetModal({ show, setShow,sub_item }) {
  const { appDispatch, subSkill_listDispatch } = useContext(DispatchContext);

  const initSubSkill = {
    skill_id:sub_item.id,
    title: "",
    type:"",
    task:"",
    pass_mark:"",
  };
  const [SubSkill, setSubSkill] = useState(initSubSkill);

  const onSubmit = async () => {
    //hide the modal
    setShow(false);
    //validation
    const appAction = new AppAction(appDispatch);
    if (!Helper.validateField(SubSkill.title,SubSkill.type,SubSkill.task,SubSkill.pass_mark)) {
      appAction.SET_RESPONSE(
        Response(false, "Enter all filed", "", Define.BT_DANGER, {})
      );
      return;
    }
    //call api
    const listAction = new ListAction(subSkill_listDispatch);
    const res = await listAction.addData("career/create/sub_skill", SubSkill);
    appAction.SET_RESPONSE(res);
    setSubSkill((pState)=>({...pState,skill_id:"",title:"",type:"",task:"",pass_mark:""}))
  };

  const onChange = (e) => {
    setSubSkill({ ...SubSkill, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <MyModal
        title="Add New Sub Skill"
        show={show}
        setShow={setShow}
        onSubmit={onSubmit}
      >
        <InputText
          name="title"
          title="Title"
          type="text"
          value={SubSkill.title}
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
            checked = {SubSkill.type==='begineer'}
            />
            </div>

            <div className="col-sm-4 col-md-4 col-xl-4 col-lg-4">
            <InputRadio
            name="type"
            title="Intermediate"
            type="radio"
            value="intermediate"
            onChange={onChange}
            checked = {SubSkill.type==='intermediate'}
            />
            </div>
            
            <div className="col-sm-4 col-md-4 col-xl-4 col-lg-4">
            <InputRadio
            name="type"
            title="Advanced"
            type="radio"
            value="advanced"
            onChange={onChange}
            checked = {SubSkill.type==='advanced'}
            />
            </div>

        </div>

        <InputTextArea
          name="task"
          title="Description (Guidelines,Resources links):"
          value={SubSkill.task}
          onChange={onChange}
        />

        <InputText
          name="pass_mark"
          type="number"
          title="Pass Mark"
          value={SubSkill.pass_mark}
          onChange={onChange}
        />

      </MyModal>
    </div>
  );
}
