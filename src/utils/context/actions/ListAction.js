import axios from "axios";
import Response from "../../helpers/Response";
import Define from "./../../helpers/Define";
import Types from "./Types";

class ListAction {
    constructor(dispatch) {
        this.dispatch = dispatch;
    }
    getSource = () => {
        this.source = axios.CancelToken.source();
        return this.source;
    }; //return token to cancel the request

    //get all data
    getAll = async (url) => {
        return new Promise((resolve, reject) => {
            axios
                .get(`${url}`, {
                    cancelToken: this.source.token,
                })
                .then((res) => {
                    const { error, message, response } = res.data;
                    if (error === false) {
                        //no error
                        //dispatch the global state
                        this.dispatch({
                            type: Types.GET_DATA,
                            payload: response, //an array
                        });
                        resolve(
                            Response(true, "success", message, Define.BT_SUCCESS, response)
                        );
                    } else {
                        this.dispatch({
                            type: Types.GET_DATA,
                            payload: []//an array
                        });
                        resolve(Response(false, "failed", message, Define.BT_DANGER, []));
                    }
                })
                .catch((e) => {
                    if (axios.isCancel(e)) {
                        this.dispatch({
                            type: Types.GET_DATA,
                            payload: []//an array
                        });
                        resolve(Response(false, "canceled the request", e.message, Define.BT_DANGER, []));
                    } else {
                        this.dispatch({
                            type: Types.GET_DATA,
                            payload: []//an array
                        });
                        resolve(Response(false, "failed", e.message, Define.BT_DANGER, []));
                    }
                });
        });
    }; //end get all(make sure you got a response (object type) )
    addData = (url, newdata) => {
        return new Promise((resolve, reject) => {
            axios
                .post(url, newdata)
                .then((res) => {
                    const { error, message, response } = res.data;
                    if (error === false) {
                        //no error
                        //dispatch the global state
                        this.dispatch({
                            type: Types.ADD_DATA,
                            payload: response, //a newly created object
                        });

                        resolve(
                            Response(true, "success", message, Define.BT_SUCCESS, response)
                        );
                    } else {
                        //error
                        resolve(Response(false, "failed", message, Define.BT_DANGER));
                    }
                })
                .catch((e) => {
                    resolve(Response(false, "failed", e.message, Define.BT_DANGER));
                });
        });
    }; //end add data
    //id_field=primary key (based on which field item will be identified)
    updateData = (url, updateData, id_field) => {
        return new Promise((resolve, reject) => {
            axios.put(url, updateData).then((res) => {
                const { error, message, response } = res.data
                // console.log("after update: ", res.data);
                if (error === false) {
                    //dispatch the global state
                    this.dispatch({
                        type: Types.UPDATE_DATA,
                        payload: {
                            id_field: id_field,
                            obj: updateData
                        }
                    });
                    resolve(Response(true, "update succes", message, Define.BT_SUCCESS, response));
                } else {
                    reject(new Error(message));
                }
            }).catch((e) => {
                console.error("erroe: ", e)
                reject(e);
            })
        });
    } //end update data
    // Delete Data
    deleteData = (url, deleteData, id_field) => {
        return new Promise((resolve, reject) => {
            axios
                .delete(url, deleteData)
                .then((res) => {
                    const { error, message, response } = res.data;
                    if (error === false) {
                        //dispatch the global state
                        this.dispatch({
                            type: Types.DELETE_DATA,
                            payload: { id_field: id_field, id: response.id },
                        });
                        resolve(
                            Response(
                                true,
                                "Deleted successfully",
                                message,
                                Define.BT_SUCCESS,
                                response
                            )
                        );
                    } else {
                        reject(new Error(message));
                    }
                })
                .catch((e) => {
                    console.error("erroe: ", e);
                    reject(e);
                });
        });
    }; //end Delete data
}

export default ListAction;