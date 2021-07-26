import React, { useContext, useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import Define from "./../../../utils/helpers/Define";
import SubSkillDelete from "./SubSkillDelete";
import SubSkillUpdate from "./SubSkillUpdate";
import AppAction from "./../../../utils/context/actions/AppAction";
import ListAction from "./../../../utils/context/actions/ListAction";
import { DispatchContext, StateContext } from "./../../../utils/context/MainContext";
import Response from "./../../../utils/helpers/Response";
import Helper from "../../../utils/helpers/Helper";
import CUser from "../../../utils/helpers/CUser";
import { useHistory, useParams } from 'react-router-dom';
import URL from './../../../utils/helpers/URL';

export default function SubSkillTable({ page }) {
  const [show, setShow] = useState({ view: false, edit: false, delete: false });
  const [viewItem, setViewItem] = useState(null);
  const history = useHistory();
  const { skill_id } = useParams()

  //global state
  const { subSkill_list } = useContext(StateContext);
  const { appDispatch, subSkill_listDispatch } = useContext(DispatchContext);

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

  // Handle View 
  const handleViewQuestions = (item) => {
    // history.push('/questions', { question_item: item })
    history.push(`${URL.SKILL_MANAGEMENT}/${skill_id}/${item.id}`)
  };

  //on update
  const onSubmit = async () => {
    //hide the modal
    setShow({ view: false, edit: false, delete: false });
    //validation
    const appAction = new AppAction(appDispatch);
    if (!Helper.validateField(viewItem.title, viewItem.type, viewItem.task, viewItem.pass_mark)) {
      appAction.SET_RESPONSE(
        Response(false, "Enter all filed", "", Define.BT_DANGER, {})
      );
      return;
    }
    //call api
    const listAction = new ListAction(subSkill_listDispatch);
    const res = await listAction.updateData(`career/update/sub_skill/id/${viewItem.id}`, viewItem, "id");
    appAction.SET_RESPONSE(res);
  };



  // Getting Notice_list
  useEffect(() => {

    const listAction = new ListAction(subSkill_listDispatch)
    const token = listAction.getSource()
    try {
      const uid = CUser.getCurrentuser() && CUser.getCurrentuser().id
      const load = async () => {
        try {
          if (uid && skill_id) {
            console.log("skill_id::::", skill_id)
            const res = await listAction.getAll(`career/get-all/sub_skill/skill_id/${skill_id}`)
            console.log("all subskill list: ", res)
          } else {

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

  }, [page, skill_id, subSkill_list.length])

  // console.log(subSkill_list);

  return (
    <div>
      {viewItem ? (
        <SubSkillUpdate show={show.edit} setShow={setShow} setViewItem={setViewItem} onSubmit={onSubmit} viewItem={viewItem} />
      ) : (
        <></>
      )}
      {viewItem ? (
        <SubSkillDelete
          show={show.delete}
          setShow={setShow}
          viewItem={viewItem}
        />
      ) : (
        <></>
      )}
      {subSkill_list.length > 0 ? (
        <>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>ID#</th>
                <th>Sub-Skill title</th>
                <th>Type</th>
                <th>Task,Resources</th>
                <th>Pass marks</th>
                <th>Subskills</th>
              </tr>
            </thead>
            <tbody>
              {subSkill_list.map((Sub_item) => {
                return (
                  <tr key={Sub_item.id}>
                    <td>{Sub_item.id}</td>
                    <td>{Sub_item.title}</td>
                    <td>{Sub_item.type} </td>
                    <td>{Sub_item.task} </td>
                    <td>{Sub_item.pass_mark}%</td>
                    <td>
                      <button
                        className="btn text-info bg-transparent"
                        onClick={() => handleViewQuestions(Sub_item)}
                      >
                        Questions
                      </button>
                      <button
                        className="btn text-info  bg-transparent"
                        onClick={() => handleClickEdit(Sub_item)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn text-info  bg-transparent"
                        onClick={() => handleClickDelete(Sub_item)}
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
          <h3 className="text-center">No Sub Skill Added Yet</h3>
        </div>
      )}
    </div>
  );
}
