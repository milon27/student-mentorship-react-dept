import React, { useContext, useState } from "react";
import Helper from "../../../utils/helpers/Helper";
import AppAction from "./../../../utils/context/actions/AppAction";
import ListAction from "./../../../utils/context/actions/ListAction";
import { DispatchContext } from "./../../../utils/context/MainContext";
import Define from "./../../../utils/helpers/Define";
import Response from "./../../../utils/helpers/Response";
import ModalDelete from "../../layouts/modal/ModalDelete";
import InputText from './../../layouts/form/InputText';

export default function SkillDelete({ show, setShow, viewItem }) {
  const { appDispatch, skill_listDispatch } = useContext(DispatchContext);

  const [Skill, setSkill] = useState(viewItem);

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
    const res = await listAction.deleteData(`career/delete/skill/id/${viewItem.id}`, Skill, "id");
    appAction.SET_RESPONSE(res);
  };

  const onChange = (e) => {
    setSkill({ ...Skill, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <ModalDelete
        title="Delete Skill"
        show={show}
        setShow={setShow}
        onSubmit={onSubmit}
      >
        <InputText
          name="title"
          title=""
          type="textarea"
          value={Skill.title}
          onChange={onChange}
        />
        <InputText
          name="intro_url"
          type="text"
          title=""
          value={Skill.intro_url}
          onChange={onChange}
        />
      </ModalDelete>
    </div>
  );
}
