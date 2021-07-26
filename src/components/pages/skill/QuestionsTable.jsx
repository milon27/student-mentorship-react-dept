import React, { useContext, useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import Define from "./../../../utils/helpers/Define";
import QuestionDelete from "./QuestionDelete";
import QuestionUpdate from "./QuestionUpdate";
import AppAction from "./../../../utils/context/actions/AppAction";
import ListAction from "./../../../utils/context/actions/ListAction";
import { DispatchContext, StateContext } from "./../../../utils/context/MainContext";
import Response from "./../../../utils/helpers/Response";
import Helper from "../../../utils/helpers/Helper";
import CUser from "../../../utils/helpers/CUser";
import { useParams } from 'react-router-dom';

export default function QuestionsTable({ page }) {
  const [show, setShow] = useState({ view: false, edit: false, delete: false });
  const [viewItem, setViewItem] = useState(null);

  const { sub_skill_id } = useParams()

  // Handle Edit
  const handleClickEdit = (event) => {
    setShow((pState) => ({ ...pState, edit: true }));
    setViewItem(event);
  };
  // Handle DeleteTodo
  const handleClickDelete = (event) => {
    setShow((pState) => ({ ...pState, delete: true }));
    setViewItem(event);
  };


  const { appDispatch, question_listDispatch } = useContext(DispatchContext);

  const onSubmit = async () => {
    //hide the modal
    setShow({ view: false, edit: false, delete: false });
    //validation
    const appAction = new AppAction(appDispatch);
    if (!Helper.validateField(viewItem.title, viewItem.op_1, viewItem.op_2, viewItem.op_3, viewItem.op_4, viewItem.ans)) {
      appAction.SET_RESPONSE(
        Response(false, "Enter all filed", "", Define.BT_DANGER, {})
      );
      return;
    }
    //call api
    const listAction = new ListAction(question_listDispatch);
    const res = await listAction.updateData(`career/update/question/id/${viewItem.id}`, viewItem, "id");
    appAction.SET_RESPONSE(res);
  };

  //global state
  const { question_list } = useContext(StateContext);

  // Getting Notice_list
  useEffect(() => {

    const listAction = new ListAction(question_listDispatch)
    const token = listAction.getSource()
    try {
      const uid = CUser.getCurrentuser() && CUser.getCurrentuser().id
      const load = async () => {
        try {
          if (uid) {
            const res = await listAction.getAll(`career/get-all/question/sub_skill_id/${sub_skill_id}`)
            console.log("sub skill question list: ", res)
          }
        } catch (e) {
          console.log(e);
        }
      }
      load()
    } catch (e) {
      console.log(e)
    }

    //clean up
    return () => {
      token.cancel()
    }

  }, [page, question_list.length])

  return (
    <div>
      {viewItem ? (
        <QuestionUpdate show={show.edit} setShow={setShow} setViewItem={setViewItem} onSubmit={onSubmit} viewItem={viewItem} />
      ) : (
        <></>
      )}
      {viewItem ? (
        <QuestionDelete
          show={show.delete}
          setShow={setShow}
          viewItem={viewItem}
        />
      ) : (
        <></>
      )}
      {question_list.length > 0 ? (
        <>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>ID#</th>
                <th>Question</th>
                <th>Option 1</th>
                <th>Option 2</th>
                <th>Option 3</th>
                <th>Option 4</th>
                <th>Correct Ans.</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {question_list.map((Question_item) => {
                return (
                  <tr key={Question_item.id}>
                    <td>{Question_item.id}</td>
                    <td>{Question_item.title}</td>
                    <td>{Question_item.op_1}</td>
                    <td>{Question_item.op_2} </td>
                    <td>{Question_item.op_3} </td>
                    <td>{Question_item.op_4}</td>
                    <td>{Question_item.ans}</td>
                    <td>
                      <button
                        className="btn text-info  bg-transparent"
                        onClick={() => handleClickEdit(Question_item)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn text-info  bg-transparent"
                        onClick={() => handleClickDelete(Question_item)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </>
      ) : (
        <div>
          <h3 className="text-center">No Questions Added Yet!</h3>
        </div>
      )}
    </div>
  );
}
