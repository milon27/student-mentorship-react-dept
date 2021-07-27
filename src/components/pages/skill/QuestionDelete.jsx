import React, { useContext, useState } from "react";
import AppAction from "./../../../utils/context/actions/AppAction";
import ListAction from "./../../../utils/context/actions/ListAction";
import { DispatchContext } from "./../../../utils/context/MainContext";
import ModalDelete from "../../layouts/modal/ModalDelete";
import InputSelectValue from './../../layouts/form/InputSelectValue';
import InputText from './../../layouts/form/InputText';

export default function QuestionDelete({ show, setShow, viewItem }) {
  const { appDispatch, question_listDispatch } = useContext(DispatchContext);

  const [Question, setQuestion] = useState(viewItem);

  const onSubmit = async () => {
    //hide the modal
    setShow(false);
    //validation
    const appAction = new AppAction(appDispatch);
    //call api
    const listAction = new ListAction(question_listDispatch);
    const res = await listAction.deleteData(`career/delete/question/id/${viewItem.id}`, Question, "id");
    appAction.SET_RESPONSE(res);
  };

  const onChange = (e) => {
    setQuestion({ ...Question, [e.target.name]: e.target.value });
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
          disable
          name="title"
          title="Title"
          type="text"
          value={viewItem.title}
          onChange={onChange}
        />

        <div className="row pb-2">
          <div className="col-sm-6 col-md-6 col-xl-6 col-lg-6">
            <InputText
              disable
              name="op_1"
              title="option # 1"
              type="text"
              value={viewItem.op_1}
              onChange={onChange}
            />
          </div>

          <div className="col-sm-6 col-md-6 col-xl-6 col-lg-6">
            <InputText
              disable
              name="op_2"
              title="option # 2"
              type="text"
              value={viewItem.op_2}
              onChange={onChange}
            />
          </div>
        </div>

        <div className="row pb-2">
          <div className="col-sm-6 col-md-6 col-xl-6 col-lg-6">
            <InputText
              disable
              name="op_3"
              title="option # 3"
              type="text"
              value={viewItem.op_3}
              onChange={onChange}
            />
          </div>

          <div className="col-sm-6 col-md-6 col-xl-6 col-lg-6">
            <InputText
              disable
              name="op_4"
              title="option # 4"
              type="text"
              value={viewItem.op_4}
              onChange={onChange}
            />
          </div>
        </div>

        <InputSelectValue
          disable
          name="ans"
          question={viewItem}
          title="option # 4"
          value={viewItem.ans}
          onChange={onChange}
        />
      </ModalDelete>
    </div>
  );
}
