import React, { useContext, useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import Define from "./../../../utils/helpers/Define";
import SkillDelete from "./SkillDelete";
import SkillUpdate from "./SkillUpdate";
import AppAction from "./../../../utils/context/actions/AppAction";
import ListAction from "./../../../utils/context/actions/ListAction";
import { DispatchContext, StateContext } from "./../../../utils/context/MainContext";
import Response from "./../../../utils/helpers/Response";
import Helper from "../../../utils/helpers/Helper";
import CUser from "../../../utils/helpers/CUser";
import { useHistory } from 'react-router-dom';
import URL from './../../../utils/helpers/URL';

export default function SkillTable({ page }) {
  const [show, setShow] = useState({ view: false, edit: false, delete: false });
  const [viewItem, setViewItem] = useState(null);
  const history = useHistory();

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
  const handleViewSubSkill = (item_id) => {
    // console.log("one: ", item)
    // history.push('/subSkill', { sub_items: item })
    history.push(`${URL.SKILL_MANAGEMENT}/${item_id}`)
  };

  const { appDispatch, skill_listDispatch } = useContext(DispatchContext);

  const onSubmit = async () => {
    //hide the modal
    setShow({ view: false, edit: false, delete: false });
    //validation
    const appAction = new AppAction(appDispatch);
    if (!Helper.validateField(viewItem.title, viewItem.intro_url)) {
      appAction.SET_RESPONSE(
        Response(false, "Enter all filed", "", Define.BT_DANGER, {})
      );
      return;
    }
    //call api
    const listAction = new ListAction(skill_listDispatch);
    const res = await listAction.updateData(`career/update/skill/id/${viewItem.id}`, viewItem, "id");
    appAction.SET_RESPONSE(res);
  };

  //global state
  const { skill_list } = useContext(StateContext);

  // Getting list
  useEffect(() => {
    const listAction = new ListAction(skill_listDispatch)
    const token = listAction.getSource()
    try {
      const uid = CUser.getCurrentuser() && CUser.getCurrentuser().id
      const load = async () => {
        try {
          if (uid) {
            const res = await listAction.getAll(`career/get-paginate/skill/${page}`)
            console.log("m-list: ", res)
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

  }, [page, skill_list.length])

  return (
    <div>
      {viewItem ? (
        <SkillUpdate show={show.edit} setShow={setShow} setViewItem={setViewItem} onSubmit={onSubmit} viewItem={viewItem} />
      ) : (
        <></>
      )}
      {viewItem ? (
        <SkillDelete
          show={show.delete}
          setShow={setShow}
          viewItem={viewItem}
        />
      ) : (
        <></>
      )}
      {skill_list.length > 0 ? (
        <>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>ID#</th>
                <th>Skill</th>
                <th>Intro Link</th>
                <th>Subskills</th>
              </tr>
            </thead>
            <tbody>
              {skill_list.map((item) => {
                return (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.title}</td>
                    <td><a href={item.intro_url} target="blank">{item.intro_url}</a></td>
                    <td>
                      <button
                        className="btn text-info bg-transparent"
                        onClick={() => handleViewSubSkill(item.id)}
                      >
                        View
                      </button>
                      <button
                        className="btn text-info  bg-transparent"
                        onClick={() => handleClickEdit(item)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn text-info  bg-transparent"
                        onClick={() => handleClickDelete(item)}
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
          <h3 className="text-center">No Skill Added Yet</h3>
        </div>
      )}
    </div>
  );
}
