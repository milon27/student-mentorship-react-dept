import React from "react";
import ModalUpdate from "../../layouts/modal/ModalUpdate";
import InputSelectValue from './../../layouts/form/InputSelectValue';
import InputText from './../../layouts/form/InputText';

export default function QuestionUpdate({ show, setShow, viewItem, setViewItem, onSubmit }) {

  const onChange = (e) => {
    setViewItem({ ...viewItem, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <ModalUpdate
        title="Edit Question"
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
          <div className="col-sm-6 col-md-6 col-xl-6 col-lg-6">
            <InputText
              name="op_1"
              title="option # 1"
              type="text"
              value={viewItem.op_1}
              onChange={onChange}
            />
          </div>

          <div className="col-sm-6 col-md-6 col-xl-6 col-lg-6">
            <InputText
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
              name="op_3"
              title="option # 3"
              type="text"
              value={viewItem.op_3}
              onChange={onChange}
            />
          </div>

          <div className="col-sm-6 col-md-6 col-xl-6 col-lg-6">
            <InputText
              name="op_4"
              title="option # 4"
              type="text"
              value={viewItem.op_4}
              onChange={onChange}
            />
          </div>
        </div>

        <InputSelectValue
          question={viewItem}
          name="ans"
          title="option # 4"
          value={viewItem.ans}
          onChange={onChange}
        />

      </ModalUpdate>
    </div>
  );
}
