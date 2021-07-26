import React, { useContext, useState } from "react";
import Helper from "../../../utils/helpers/Helper";
import MyModal from "../../layouts/modal/MyModal";
import AppAction from "../../../utils/context/actions/AppAction";
import ListAction from "../../../utils/context/actions/ListAction";
import { DispatchContext } from "../../../utils/context/MainContext";
import Define from "../../../utils/helpers/Define";
import Response from "../../../utils/helpers/Response";
import '../../../assets/css/modalColor.css';
import InputSelectValue from "../../layouts/form/InputSelectValue";
import InputText from './../../layouts/form/InputText';
import { useParams } from 'react-router-dom';

export default function QuestionsModal({ show, setShow }) {
  const { appDispatch, question_listDispatch } = useContext(DispatchContext);

  const { sub_skill_id } = useParams()

  const initQuestion = {
    sub_skill_id: sub_skill_id,
    title: "",
    op_1: "",
    op_2: "",
    op_3: "",
    op_4: "",
    ans: "",
  };
  const [Questions, setQuestions] = useState(initQuestion);

  const onSubmit = async () => {
    //hide the modal
    setShow(false);
    //validation
    const appAction = new AppAction(appDispatch);
    if (!Helper.validateField(Questions.title, Questions.op_1, Questions.op_2, Questions.op_3, Questions.op_4, Questions.ans)) {
      appAction.SET_RESPONSE(
        Response(false, "Enter all filed", "", Define.BT_DANGER, {})
      );
      return;
    }

    let obj = { ...Questions }
    obj.sub_skill_id = sub_skill_id

    //call api
    const listAction = new ListAction(question_listDispatch);
    const res = await listAction.addData("career/create/question", obj);
    appAction.SET_RESPONSE(res);
    setQuestions((pState) => ({ ...pState, sub_skill_id: "", title: "", op_1: "", op_2: "", op_3: "", op_4: "", ans: "" }))
  };

  const onChange = (e) => {
    setQuestions({ ...Questions, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <MyModal
        title="Add New Question"
        show={show}
        setShow={setShow}
        onSubmit={onSubmit}
      >
        <InputText
          name="title"
          title="Title"
          type="text"
          value={Questions.title}
          onChange={onChange}
        />

        <div className="row pb-2">
          <div className="col-sm-6 col-md-6 col-xl-6 col-lg-6">
            <InputText
              name="op_1"
              title="option # 1"
              type="text"
              value={Questions.op_1}
              onChange={onChange}
            />
          </div>

          <div className="col-sm-6 col-md-6 col-xl-6 col-lg-6">
            <InputText
              name="op_2"
              title="option # 2"
              type="text"
              value={Questions.op_2}
              onChange={onChange}
            />
          </div>
        </div>

        <div className="row pb-2">
          <div className="col-sm-6 col-md-6 col-xl-6 col-lg-6">
            <InputText
              name="op_3"
              title="option # 3"
              type="text"
              value={Questions.op_3}
              onChange={onChange}
            />
          </div>

          <div className="col-sm-6 col-md-6 col-xl-6 col-lg-6">
            <InputText
              name="op_4"
              title="option # 4"
              type="text"
              value={Questions.op_4}
              onChange={onChange}
            />
          </div>
        </div>

        <InputSelectValue
          name="ans"
          title="option # 4"
          question={Questions}
          value={Questions.ans}
          onChange={onChange}
        />

      </MyModal>
    </div>
  );
}
