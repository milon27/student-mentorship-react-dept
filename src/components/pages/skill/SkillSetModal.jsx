import React, { useContext, useState } from "react";
import Helper from "../../../utils/helpers/Helper";
import MyModal from "../../layouts/modal/MyModal";
import AppAction from "../../../utils/context/actions/AppAction";
import ListAction from "../../../utils/context/actions/ListAction";
import { DispatchContext } from "../../../utils/context/MainContext";
import Define from "../../../utils/helpers/Define";
import Response from "../../../utils/helpers/Response";
import '../../../assets/css/modalColor.css';
import InputText from "../../layouts/form/InputText";

export default function SkillSetModal({ show, setShow }) {
  const { appDispatch, skill_listDispatch } = useContext(DispatchContext);

  const initSkill = {
    title: "",
    intro_url: "https://www.youtube.com/embed/youtube_ID"
  };
  const [Skill, setSkill] = useState(initSkill);

  const onSubmit = async () => {
    //hide the modal
    setShow(false);
    //validation
    const appAction = new AppAction(appDispatch);
    if (!Helper.validateField(Skill.title, Skill.intro_url)) {
      appAction.SET_RESPONSE(
        Response(false, "Enter all filed", "", Define.BT_DANGER, {})
      );
      return;
    }
    //call api
    const listAction = new ListAction(skill_listDispatch);
    const res = await listAction.addData("career/create/skill", Skill);
    appAction.SET_RESPONSE(res);
    setSkill((pState) => ({ ...pState, title: "", intro_url: "" }))
  };

  const onChange = (e) => {
    setSkill({ ...Skill, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <MyModal
        title="Add New Skill"
        show={show}
        setShow={setShow}
        onSubmit={onSubmit}
      >
        <InputText
          name="title"
          title="Title"
          type="text"
          value={Skill.title}
          onChange={onChange}
        />
        <InputText
          name="intro_url"
          type="textArea"
          title="Intro URL:"
          value={Skill.intro_url}
          onChange={onChange}
        />
      </MyModal>
    </div>
  );
}
